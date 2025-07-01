const { initializeDatabase } = require("./db/db.connect");
const Book = require("./models/books.models");
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

initializeDatabase();

const createBook = async (newMovie) => {
  try {
    const book = new Book(newMovie);
    const saveBook = await book.save();
    return saveBook;
  } catch (error) {
    throw error;
  }
};

app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    console.log(savedBook);
    res.status(201).json({ message: "Book Saved successfully." });
  } catch (error) {
    console.log("Error saving the book", error);

    res.status(500).json({ error: "Failed to save book." });
  }
});

const readAllBooks = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (error) {
    throw error;
  }
};

app.get("/books", async (req, res) => {
  try {
    const readBooks = await readAllBooks();
    if (readBooks.length != 0) {
      res.json(readBooks);
      res.status(201).json({ message: "Book " });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Books." });
  }
});

const readBookByTitle = async (bookTitle) => {
  try {
    const bookByTitle = Book.findOne({ title: bookTitle });
    return bookByTitle;
  } catch (error) {
    throw error;
  }
};

app.get("/books/:bookTitle", async (req, res) => {
  try {
    const bookByTitle = await readBookByTitle(req.params.bookTitle);
    if (bookByTitle) {
      res
        .status(200)
        .json({ message: "Book found successfully", book: bookByTitle });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.log("An error occurred while fetching data", error);
    res.status(500).json({ error: "Failed to fetch Books" });
  }
});

const readBooksByAuthor = async (authorName) => {
  try {
    const booksByAuthor = await Book.find({ author: authorName });
    return booksByAuthor;
  } catch (error) {
    throw error;
  }
};

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const bookByAuthor = await readBooksByAuthor(req.params.authorName);
    if (bookByAuthor.length != 0) {
      res
        .status(200)
        .json({ message: "Found book successfully.", book: bookByAuthor });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    console.log("An error occured while fetching data.", error);
    res.status(500).json({ error: "Failed to fetch Books" });
  }
});

const readBooksByGenre = async (bookGenre) => {
  try {
    const booksByGenre = await Book.find({ genre: bookGenre });
    return booksByGenre;
  } catch (error) {
    throw error;
  }
};

app.get("/books/genre/:genreName", async (req, res) => {
  try {
    const books = await readBooksByGenre(req.params.genreName);
    if (books.length != 0) {
      res.status(200).json({ message: "Book found successfully.", books });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    console.log("An error occured while fetching data", error);
    res.status(500).json({ error: "Failed to fetch Books" });
  }
});

const readBooksByYear = async (releaseYear) => {
  try {
    const booksByYear = await Book.find({ publishedYear: releaseYear });
    return booksByYear;
  } catch (error) {
    throw error;
  }
};
app.get("/books/release/:releaseYear", async (req, res) => {
  try {
    const books = await readBooksByYear(req.params.releaseYear);
    if (books.length != 0) {
      res.status(200).json({ message: "Book Found successfully.", books });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    console.log("An error occured while fetching data", error);
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

const updateBookById = async (bookId, dataToUpdate) => {
  try {
    const updateBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updateBook;
  } catch (error) {
    throw error;
  }
};

app.post("/books/:id", async (req, res) => {
  try {
    const updatedBook = await updateBookById(req.params.id, req.body);
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully.", book: updatedBook });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    console.log("An error occured while updating book.");
    res.status(500).json({ error: "Failed to update Book." });
  }
});

const updateBookByTitle = async (bookTitle, dataToUpdate) => {
  try {
    const updateBook = await Book.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      { new: true }
    );
    return updateBook;
  } catch (error) {
    throw error;
  }
};

app.post("/books/title/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body);
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    console.log("An error occured while updating data", error);
    res.status(500).json({ error: "Failed to update book." });
  }
});

const deleteBook = async (bookId) => {
  try {
    const bookDelete = await Book.findByIdAndDelete(bookId);
    return bookDelete;
  } catch (error) {
    throw error;
  }
};

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBook(req.params.bookId);
    if (deleteBook) {
      res.status(200).json({ message: "Book deleted successfully." });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.log("An error occured while deleting book.");
    res.status(500).json({ error: "Failed to delete book." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on Port", PORT);
});
