import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../shared/services/prisma/prisma.service'
import { CreateTextDto } from './dto/create-text.dto'
import { UpdateTextDto } from './dto/update-text.dto'

@Injectable()
export class TextsService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createTextDto: CreateTextDto) {
        const { content } = createTextDto
        if (!content) {
            throw new HttpException('Content is required.', HttpStatus.BAD_REQUEST)
        }
        return await this.prismaService.text.create({
            data: {
                content
            }
        })
    }

    async findAll() {
        return await this.prismaService.text.findMany()
    }

    async findOne(id: number) {
        if (!id) {
            throw new HttpException('ID is required.', HttpStatus.BAD_REQUEST)
        }
        const text = await this.prismaService.text.findUnique({
            where: { id }
        })
        if (!text) {
            throw new HttpException('Text not found.', HttpStatus.NOT_FOUND)
        }
        return text
    }

    async update(id: number, updateTextDto: UpdateTextDto) {
        const { content } = updateTextDto
        if (!id) {
            throw new HttpException('ID is required.', HttpStatus.BAD_REQUEST)
        }
        const text = await this.prismaService.text.findUnique({
            where: { id }
        })
        if (!text) {
            throw new HttpException('Text not found.', HttpStatus.NOT_FOUND)
        }

        const textUpdateInput: Prisma.TextUpdateInput = {}
        if (content) {
            textUpdateInput.content = content
        }
        const updatedText = await this.prismaService.text.update({
            where: { id },
            data: textUpdateInput
        })
        return updatedText
    }

    async delete(id: number) {
        if (!id) {
            throw new HttpException('ID is required.', HttpStatus.BAD_REQUEST)
        }
        const text = await this.prismaService.text.findUnique({
            where: { id }
        })
        if (!text) {
            throw new HttpException('Text not found.', HttpStatus.NOT_FOUND)
        }
        return await this.prismaService.text.delete({
            where: { id }
        })
    }
}
