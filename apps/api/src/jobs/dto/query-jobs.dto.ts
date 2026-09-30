import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { Category } from '@prisma/client'

export class QueryJobsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20

  @IsOptional()
  @IsEnum(Category)
  category?: Category

  @IsOptional()
  @IsString()
  state?: string

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @Type(() => Boolean)
  featured?: boolean
}
