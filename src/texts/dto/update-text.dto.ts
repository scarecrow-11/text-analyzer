import { IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateTextDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim?.() || '')
    content?: string
}
