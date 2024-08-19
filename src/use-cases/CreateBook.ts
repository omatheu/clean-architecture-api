import { Book } from "../domain/entities/Book";
import { BookRepository } from "../domain/interfaces/BookRepository";
import { CreateBookDto } from "../interface/dto/CreateBookDto";
import { v4 as uuidv4 } from 'uuid';

class CreateBook {
    constructor(private bookRepository: BookRepository) {}

    async execute(dto: CreateBookDto): Promise<Book> {
        const id = uuidv4();
        const book = new Book(id, dto.title, dto.author, dto.publishedDate);
        return this.bookRepository.create(book);
    }
}

export { CreateBook }