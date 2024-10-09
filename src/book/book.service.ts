import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';


@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,
    ) {}

    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find();
    }

    async findOne(id: string): Promise<Book> {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid UUID format.');
        }
        
       const book = await this.bookRepository.findOneBy({ id })

       if(!book){
        throw new NotFoundException('Book with given id is not found.')
       }

       return book
    }

    async create(bookDto: CreateBookDto, user: any): Promise<Book> {
        const book = await this.bookRepository.create({
            ...bookDto,
            user
    });

        return this.bookRepository.save(book);
    }

    async updateOne(id: string, bookDto: UpdateBookDto): Promise<Book> {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid UUID format.');
        }

        const book = await this.bookRepository.findOneBy({ id })
 
        if(!book){
         throw new NotFoundException('Book with given id is not found.')
        }

        Object.assign(book, bookDto);

        return await this.bookRepository.save(book)
     }

    async deleteOne(id: string): Promise<Book> {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid UUID format.');
        }

        const book = await this.bookRepository.findOneBy({ id })
 
        if(!book){
         throw new NotFoundException('Book with given id is not found.')
        }
 
        await this.bookRepository.delete(id);

        return book
     }

}
function isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}