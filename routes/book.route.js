import express from "express";
import {
  getBooks,
  addBook,
  //updateBook,
  updateBook,
  deleteBook,
  getSingleBook,
  //updateBookAvatar,
} from "../controllers/book.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

//get books
router.get("/", getBooks);

//get a Single Book
router.get("/:id", getSingleBook);

//add a book
router.post(
  "/",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  addBook
);

// Update a book and its avatar
router.put("/:id", upload.single("avatar"), updateBook);



//delete a book
router.delete("/:id", deleteBook);

export default router;

{/*
//update aa book
router.put("/:id", updateBook);

//update book avatar
router.put("/:id", upload.single("avatar"), updateBookAvatar)
*/}