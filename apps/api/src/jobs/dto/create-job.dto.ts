import {
  IsEnum, IsInt, IsOptional, IsString, IsUrl, IsDateString, IsBoolean, MaxLength
} from 'class-validator'
import { Category } from '@prisma/client'

export class CreateJobDto {
  @IsString()
  @MaxLength(300)
  title: string

  @IsEnum(Category)
  category: Category

  @IsString()
  @MaxLength(200)
  organization: string

  @IsOptional()
  @IsInt()
  postCount?: number

  @IsOptional()
  @IsString()
  qualification?: string

  @IsOptional()
  @IsDateString()
  lastDate?: string

  @IsUrl()
  officialLink: string

  @IsOptional()
  @IsString()
  state?: string

  @IsOptional()
  @IsString()
  examName?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean = false
}
