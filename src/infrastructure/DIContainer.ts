import { InMemoryBookRepository } from "./repositories/InMemoryBookRepository";
import { GetAllBooks } from "../use-cases/GetAllBooks";
import { CreateBook } from "../use-cases/CreateBook";

class DIContainer {
    private static _bookRepository = new InMemoryBookRepository;

    static getBookRepository() {
        return this._bookRepository;
    }

    static getGetAllBooksUseCase() {
        return new GetAllBooks(this.getBookRepository());
    }

    static getCreateBookUseCase() {
        return new CreateBook(this.getBookRepository());
    }
}

export { DIContainer };