import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'
import { JobsService } from './jobs.service'
import { QueryJobsDto } from './dto/query-jobs.dto'
import { CreateJobDto } from './dto/create-job.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('jobs')
@UseGuards(ThrottlerGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // ─── Public Routes ─────────────────────────────────────────────────────────

  @Get()
  findAll(@Query() query: QueryJobsDto) {
    return this.jobsService.findAll(query)
  }

  @Get('latest')
  getLatest(@Query('limit') limit?: number) {
    return this.jobsService.getLatest(limit)
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.jobsService.findOne(slug)
  }

  // ─── Admin Routes (JWT Protected) ─────────────────────────────────────────

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateJobDto) {
    return this.jobsService.create(dto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: Partial<CreateJobDto>) {
    return this.jobsService.update(id, dto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id)
  }
}
