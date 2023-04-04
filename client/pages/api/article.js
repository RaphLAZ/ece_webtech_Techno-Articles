import books from "../../data/articles";

export default function handler(req, res) {
    const { title, author, description } = req.body;
    const id = books.length + 1;
    const newBook = { id: id.toString(), title, author, description };
    books.push(newBook);
    res.status(200).json(newBook);
}
