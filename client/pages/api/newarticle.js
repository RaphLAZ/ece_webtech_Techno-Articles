import books from "../../data/articles";

export default function handler(req, res) {
    const { title, author, description } = req.body;
    const id = books.length + 1;
    const newBook = { id: id.toString(), title, author, description };
    books.push(newBook);

    // Check if the new book was added correctly
    const addedBook = books.find((book) => book.id === newBook.id);
    if (!addedBook) {
        res.status(500).json({ error: "Failed to add new book" });
    }

    // Return the updated list of books
    res.status(200).json(books);
}
