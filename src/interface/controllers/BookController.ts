import { Request, Response } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { validate } from "class-validator";
import { CreateBookDto } from "../dto/CreateBookDto";

export class BookController {
    private getAllBooks = DIContainer.getGetAllBooksUseCase();
    private createBook = DIContainer.getCreateBookUseCase();// esse método precisa receber um parâmetro

    async getAll(req: Request, res: Response) {
        const books = await this.getAllBooks.execute();
        res.json(books);
    }

    async create(req: Request, res: Response) {
        const dto = Object.assign(new CreateBookDto(), req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            return res.status(400).json({errors});
        }

        try {
            const newBook = await this.createBook.execute(dto);
            res.status(201).json(newBook);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }
}

// import { Request, Response } from "express";
// import { GetAllBooks } from "../../use-cases/GetAllBooks";

// export class BookController {
//     constructor(private getAllBooks: GetAllBooks) {}

//     async getAll(req: Request, res: Response) {
//         const books = await this.getAllBooks.execute();
//         res.json(books);
//     }
// }