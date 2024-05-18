import { Test, TestingModule } from '@nestjs/testing'
import { HttpException, HttpStatus } from '@nestjs/common'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import { TextsService } from './texts.service'
import { PrismaService } from '../shared/services/prisma/prisma.service'

describe('TextsService', () => {
  let service: TextsService
  let prismaMock: DeepMockProxy<PrismaClient>

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>()
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextsService, { provide: PrismaService, useValue: prismaMock }]
    }).compile()

    service = module.get<TextsService>(TextsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // Test cases for create()
  describe('create()', () => {
    it('should throw an HttpException with status 400', async () => {
      const mockInput = { content: '' }
      try {
        prismaMock.text.create.mockResolvedValue(null as any)
        await service.create(mockInput)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST)
        expect(e.message).toBe('Content is required.')
      }
    })

    it('should create a text', async () => {
      const mockInput = { content: 'Hello World.' }
      const mockOutput = { id: 1, content: 'Hello World.' }
      prismaMock.text.create.mockResolvedValue(mockOutput)
      const res = await service.create(mockInput)
      expect(res).toEqual(mockOutput)
    })
  })

  // Test cases for findAll()
  describe('findAll()', () => {
    it('should return an empty array', async () => {
      prismaMock.text.findMany.mockResolvedValue([])
      const res = await service.findAll()
      expect(res).toEqual([])
    })

    it('should return a text array', async () => {
      const mockOutput = [
        { id: 1, content: 'Hello World.' },
        { id: 2, content: 'Welcome Home.' }
      ]
      prismaMock.text.findMany.mockResolvedValue(mockOutput)
      const res = await service.findAll()
      expect(res).toEqual(mockOutput)
    })
  })

  // Test cases for findOne()
  describe('findOne()', () => {
    it('should throw an HttpException with status 400', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        await service.findOne(null as any)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST)
        expect(e.message).toBe('ID is required.')
      }
    })

    it('should throw an HttpException with status 404', async () => {
      try {
        const mockInput = 1
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        await service.findOne(mockInput)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND)
        expect(e.message).toBe('Text not found.')
      }
    })

    it('should return a text', async () => {
      const mockInput = 1
      const mockOutput = { id: 1, content: 'Hello World.' }
      prismaMock.text.findUnique.mockResolvedValue(mockOutput)
      const res = await service.findOne(mockInput)
      expect(res).toEqual(mockOutput)
    })
  })

  // Test cases for update()
  describe('update()', () => {
    it('should throw an HttpException with status 400', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.text.update.mockResolvedValue(null as any)
        await service.update(null as any, {} as any)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST)
        expect(e.message).toBe('ID is required.')
      }
    })

    it('should throw an HttpException with status 404', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.text.update.mockResolvedValue(null as any)
        await service.update(1, {} as any)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND)
        expect(e.message).toBe('Text not found.')
      }
    })

    it('should return the updated text', async () => {
      const mockDto = { content: 'Updated Hello World.' }
      const mockOutput = { id: 1, content: 'Updated Hello World.' }
      prismaMock.text.findUnique.mockResolvedValue({} as any)
      prismaMock.text.update.mockResolvedValue(mockOutput)
      const res = await service.update(1, mockDto)
      expect(res).toEqual(mockOutput)
    })
  })

  // Test cases for delete()
  describe('delete()', () => {
    it('should throw an HttpException with status 400', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.text.delete.mockResolvedValue(null as any)
        await service.delete(null as any)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST)
        expect(e.message).toBe('ID is required.')
      }
    })

    it('should throw an HttpException with status 404', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.text.delete.mockResolvedValue(null as any)
        await service.delete(1)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND)
        expect(e.message).toBe('Text not found.')
      }
    })

    it('should return the deleted text', async () => {
      const mockOutput = { id: 1, content: 'Hello World.' }
      prismaMock.text.findUnique.mockResolvedValue({} as any)
      prismaMock.text.delete.mockResolvedValue(mockOutput)
      const res = await service.delete(1)
      expect(res).toEqual(mockOutput)
    })
  })

  // Test cases for getNumberOfWords()
  describe('getNumberOfWords()', () => {
    it('should throw an HttpException with status 400', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.$queryRaw.mockResolvedValue(null as any)
        await service.getNumberOfWords(null as any)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST)
        expect(e.message).toBe('ID is required.')
      }
    })

    it('should throw an HttpException with status 404', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.$queryRaw.mockResolvedValue(null as any)
        await service.getNumberOfWords(1)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND)
        expect(e.message).toBe('Text not found.')
      }
    })

    it('should return the number of words', async () => {
      const mockOutput = [{ numberOfWords: 8 }]
      prismaMock.text.findUnique.mockResolvedValue({} as any)
      prismaMock.$queryRaw.mockResolvedValue(mockOutput as any)
      const res = await service.getNumberOfWords(1)
      expect(res).toEqual(mockOutput[0])
    })
  })

  // Test cases for getNumberOfCharacters()
  describe('getNumberOfCharacters()', () => {
    it('should throw an HttpException with status 400', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.$queryRaw.mockResolvedValue(null as any)
        await service.getNumberOfCharacters(null as any)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST)
        expect(e.message).toBe('ID is required.')
      }
    })

    it('should throw an HttpException with status 404', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.$queryRaw.mockResolvedValue(null as any)
        await service.getNumberOfCharacters(1)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND)
        expect(e.message).toBe('Text not found.')
      }
    })

    it('should return the number of characters', async () => {
      const mockOutput = [{ numberOfCharacters: 50 }]
      prismaMock.text.findUnique.mockResolvedValue({} as any)
      prismaMock.$queryRaw.mockResolvedValue(mockOutput as any)
      const res = await service.getNumberOfCharacters(1)
      expect(res).toEqual(mockOutput[0])
    })
  })

  // Test cases for getNumberOfSentences()
  describe('getNumberOfSentences()', () => {
    it('should throw an HttpException with status 400', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.$queryRaw.mockResolvedValue(null as any)
        await service.getNumberOfSentences(null as any)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST)
        expect(e.message).toBe('ID is required.')
      }
    })

    it('should throw an HttpException with status 404', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.$queryRaw.mockResolvedValue(null as any)
        await service.getNumberOfSentences(1)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND)
        expect(e.message).toBe('Text not found.')
      }
    })

    it('should return the number of sentences', async () => {
      const mockOutput = [{ numberOfSentences: 3 }]
      prismaMock.text.findUnique.mockResolvedValue({} as any)
      prismaMock.$queryRaw.mockResolvedValue(mockOutput as any)
      const res = await service.getNumberOfSentences(1)
      expect(res).toEqual(mockOutput[0])
    })
  })

  // Test cases for getNumberOfParagraphs()
  describe('getNumberOfParagraphs()', () => {
    it('should throw an HttpException with status 400', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.$queryRaw.mockResolvedValue(null as any)
        await service.getNumberOfParagraphs(null as any)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST)
        expect(e.message).toBe('ID is required.')
      }
    })

    it('should throw an HttpException with status 404', async () => {
      try {
        prismaMock.text.findUnique.mockResolvedValue(null as any)
        prismaMock.$queryRaw.mockResolvedValue(null as any)
        await service.getNumberOfParagraphs(1)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND)
        expect(e.message).toBe('Text not found.')
      }
    })

    it('should return the number of paragraphs', async () => {
      const mockOutput = [{ numberOfParagraphs: 3 }]
      prismaMock.text.findUnique.mockResolvedValue({} as any)
      prismaMock.$queryRaw.mockResolvedValue(mockOutput as any)
      const res = await service.getNumberOfParagraphs(1)
      expect(res).toEqual(mockOutput[0])
    })
  })
})
