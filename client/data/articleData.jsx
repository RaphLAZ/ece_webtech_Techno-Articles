export const articles = [
    {
        id: "1",
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        content:
            "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J.K. Rowling. It is the first novel in the Harry Potter series and Rowling's debut novel, first published in 1997 by Bloomsbury. The plot follows Harry Potter, a young wizard who discovers his magical heritage as he makes close friends and a few enemies in his first year at the Hogwarts School of Witchcraft and Wizardry."
    },
    {
        id: "2",
        title: "Eloquent JavaScript: A Modern Introduction to Programming",
        author: "Marijn Haverbeke",
        content:
            "Eloquent JavaScript is a book written by Marijn Haverbeke that teaches the basics of programming using JavaScript. The book assumes no prior programming experience and covers topics like control structures, functions, and data structures. It also introduces more advanced concepts like asynchronous programming and the document object model."
    },
    {
        id: "3",
        title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
        author: "Aurélien Géron",
        content:
            "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow is a book written by Aurélien Géron that teaches the basics of machine learning using Python libraries like Scikit-Learn, Keras, and TensorFlow. The book covers topics like linear regression, clustering, and neural networks, and provides hands-on examples to help readers understand the concepts."
    },
    {
        id: "4",
        title: "The Basics of Cybersecurity",
        author: "Jason Andress",
        content:
            "The Basics of Cybersecurity is a book written by Jason Andress that provides an introduction to the field of cybersecurity. The book covers topics like threat assessment, risk management, and incident response, and provides guidance for developing effective security strategies."
    }
];


export function getAllArticles() {
    return articles;
}

export function getArticleById(id) {
    return articles.find((article) => article.id === id);
}
