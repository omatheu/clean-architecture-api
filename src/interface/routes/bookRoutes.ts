import { Router } from "express";
import { InMemoryBookRepository } from "../../infrastructure/repositories/InMemoryBookRepository";
import { GetAllBooks } from "../../use-cases/GetAllBooks";
import { BookController } from "../controllers/BookController";

const router = Router();

const bookController = new BookController();

router.get("/books", (req, res) => bookController.getAll(req, res));

export { router as bookRoutes }