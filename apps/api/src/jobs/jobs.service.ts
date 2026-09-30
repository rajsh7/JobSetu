import { Injectable, NotFoundException } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { PrismaService } from '../prisma/prisma.service'
import { CreateJobDto } from './dto/create-job.dto'
import { QueryJobsDto } from './dto/query-jobs.dto'
import slugify from 'slugify'

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  // ─── Public: List Jobs ─────────────────────────────────────────────────────
  async findAll(query: QueryJobsDto) {
    const { page = 1, limit = 20, category, state, search, featured } = query
    const skip = (page - 1) * limit

    const cacheKey = `jobs:${JSON.stringify(query)}`
    const cached = await this.cache.get(cacheKey)
    if (cached) return cached

    const where = {
      isActive: true,
      ...(category && { category }),
      ...(state && { state }),
      ...(featured && { isFeatured: true }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { organization: { contains: search, mode: 'insensitive' as const } },
          { examName: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    }

    const [data, total] = await Promise.all([
      this.prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { tags: true },
      }),
      this.prisma.job.count({ where }),
    ])

    const result = {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }

    await this.cache.set(cacheKey, result, 300) // Cache for 5 minutes
    return result
  }

  // ─── Public: Get Single Job ────────────────────────────────────────────────
  async findOne(slug: string) {
    const cacheKey = `job:${slug}`
    const cached = await this.cache.get(cacheKey)
    if (cached) return cached

    const job = await this.prisma.job.findUnique({
      where: { slug },
      include: { tags: true },
    })

    if (!job || !job.isActive) {
      throw new NotFoundException(`Job "${slug}" not found`)
    }

    // Increment view count async (don't await — don't block response)
    this.prisma.job.update({
      where: { id: job.id },
      data: { views: { increment: 1 } },
    }).catch(() => {}) // Silent fail

    await this.cache.set(cacheKey, job, 600) // Cache for 10 minutes
    return job
  }

  // ─── Public: Get Latest Updates ────────────────────────────────────────────
  async getLatest(limit = 10) {
    const cacheKey = `jobs:latest:${limit}`
    const cached = await this.cache.get(cacheKey)
    if (cached) return cached

    const data = await this.prisma.job.findMany({
      where: { isActive: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        organization: true,
        createdAt: true,
      },
    })

    await this.cache.set(cacheKey, data, 120) // Cache for 2 minutes (homepage freshness)
    return data
  }

  // ─── Admin: Create Job ─────────────────────────────────────────────────────
  async create(dto: CreateJobDto) {
    const slug = this.generateSlug(dto.title)

    const job = await this.prisma.job.create({
      data: {
        ...dto,
        slug,
        lastDate: dto.lastDate ? new Date(dto.lastDate) : undefined,
      },
    })

    // Invalidate relevant caches
    await this.cache.del('jobs:latest:10')
    return job
  }

  // ─── Admin: Update Job ─────────────────────────────────────────────────────
  async update(id: string, dto: Partial<CreateJobDto>) {
    const job = await this.prisma.job.findUnique({ where: { id } })
    if (!job) throw new NotFoundException(`Job "${id}" not found`)

    const updated = await this.prisma.job.update({
      where: { id },
      data: {
        ...dto,
        lastDate: dto.lastDate ? new Date(dto.lastDate) : undefined,
      },
    })

    // Invalidate cache
    await this.cache.del(`job:${job.slug}`)
    await this.cache.del('jobs:latest:10')
    return updated
  }

  // ─── Admin: Soft Delete ────────────────────────────────────────────────────
  async remove(id: string) {
    const job = await this.prisma.job.findUnique({ where: { id } })
    if (!job) throw new NotFoundException(`Job "${id}" not found`)

    await this.prisma.job.update({
      where: { id },
      data: { isActive: false },
    })

    await this.cache.del(`job:${job.slug}`)
    await this.cache.del('jobs:latest:10')
    return { message: 'Job deactivated successfully' }
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────
  private generateSlug(title: string): string {
    const base = slugify(title, { lower: true, strict: true, locale: 'en' })
    const timestamp = Date.now().toString(36)
    return `${base}-${timestamp}`
  }
}
