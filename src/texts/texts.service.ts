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

    async getNumberOfWords(id: number) {
        if (!id) {
            throw new HttpException('ID is required.', HttpStatus.BAD_REQUEST)
        }
        const text = await this.prismaService.text.findUnique({
            where: { id }
        })
        if (!text) {
            throw new HttpException('Text not found.', HttpStatus.NOT_FOUND)
        }

        const res: { numberOfWords: number }[] = await this.prismaService.$queryRaw`
            WITH "words" AS (
                SELECT regexp_split_to_table("content", '[ \s\t\n]+') AS "word"
                FROM "Text"
                WHERE "id" = ${id}
            )
            SELECT array_length(array_agg("words"."word"), 1) AS "numberOfWords"
            FROM "words"
            WHERE "words"."word" != '';
        `
        return {
            numberOfWords: res?.length ? res[0].numberOfWords : 0
        }
    }

    async getNumberOfCharacters(id: number) {
        if (!id) {
            throw new HttpException('ID is required.', HttpStatus.BAD_REQUEST)
        }
        const text = await this.prismaService.text.findUnique({
            where: { id }
        })
        if (!text) {
            throw new HttpException('Text not found.', HttpStatus.NOT_FOUND)
        }

        const res: { numberOfCharacters: number }[] = await this.prismaService.$queryRaw`
            SELECT char_length("content") AS "numberOfCharacters"
            FROM "Text"
            WHERE "id" = ${id};
        `
        return {
            numberOfCharacters: res?.length ? res[0].numberOfCharacters : 0
        }
    }

    async getNumberOfSentences(id: number) {
        if (!id) {
            throw new HttpException('ID is required.', HttpStatus.BAD_REQUEST)
        }
        const text = await this.prismaService.text.findUnique({
            where: { id }
        })
        if (!text) {
            throw new HttpException('Text not found.', HttpStatus.NOT_FOUND)
        }

        const res: { numberOfSentences: number }[] = await this.prismaService.$queryRaw`
            WITH "sentences" AS (
                SELECT regexp_split_to_table("content", '[\.\?!]') AS "sentence"
                FROM "Text"
                WHERE "id" = ${id}
            )
            SELECT array_length(array_agg("sentences"."sentence"), 1) AS "numberOfSentences"
            FROM "sentences"
            WHERE "sentences"."sentence" != '';
        `
        return {
            numberOfSentences: res?.length ? res[0].numberOfSentences : 0
        }
    }

    async getNumberOfParagraphs(id: number) {
        if (!id) {
            throw new HttpException('ID is required.', HttpStatus.BAD_REQUEST)
        }
        const text = await this.prismaService.text.findUnique({
            where: { id }
        })
        if (!text) {
            throw new HttpException('Text not found.', HttpStatus.NOT_FOUND)
        }

        const res: { numberOfParagraphs: number }[] = await this.prismaService.$queryRaw`
            WITH "paragraphs" AS (
                SELECT regexp_split_to_table("content", '[\n]+') AS "paragraph"
                FROM "Text"
                WHERE "id" = ${id}
            )
            SELECT array_length(array_agg("paragraphs"."paragraph"), 1) AS "numberOfParagraphs"
            FROM "paragraphs"
            WHERE "paragraphs"."paragraph" != '';
        `
        return {
            numberOfParagraphs: res?.length ? res[0].numberOfParagraphs : 0
        }
    }
}
