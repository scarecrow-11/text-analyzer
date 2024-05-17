import { Controller, Body, Param, Post, Get, Patch, Delete } from '@nestjs/common'
import { TextsService } from './texts.service'
import { CreateTextDto } from './dto/create-text.dto'
import { UpdateTextDto } from './dto/update-text.dto'

@Controller('texts')
export class TextsController {
    constructor(private readonly textsService: TextsService) {}

    @Post()
    async create(@Body() createTextDto: CreateTextDto) {
        return await this.textsService.create(createTextDto)
    }

    @Get()
    async findAll() {
        return await this.textsService.findAll()
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.textsService.findOne(id)
    }

    @Patch('/:id')
    async update(
        @Param('id') id: number,
        @Body() updateTextDto: UpdateTextDto
    ) {
        return await this.textsService.update(id, updateTextDto)
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return await this.textsService.delete(id)
    }
}
