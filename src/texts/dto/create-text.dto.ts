import { IsNotEmpty, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateTextDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value?.trim?.() || '')
    content: string
}
