import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getAllBook() {
        return this.bookService.findAll()
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.bookService.findOne(id)
    }

    @Post()
    async createBook(@Body() body: CreateBookDto) {

        const user = {
            name: "Vijay",
            email: "vijay@gmail.com",
            password: "Vijay@1234",
            id: "42b4a8e3-b242-4025-881f-e07769cf50a5"
          }


        return this.bookService.create(body, user)
    }

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() body: CreateBookDto) {
        return this.bookService.updateOne(id, body)
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string) {
        return await this.bookService.deleteOne(id)
    }
}
