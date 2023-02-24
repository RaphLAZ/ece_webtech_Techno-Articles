const express = require('express');
const app = express();
const port = 3000;
const db = require('./db'); // import the db object from db.js
const uuid = require('uuid');

// GET /articles - list all articles
app.get('/articles', (req, res) => {
  res.json(db.articles);
});


// Start the server
app.listen(port, () => {
  console.log('Server started on port 3000');
});

// POST /articles - add a new article
app.post('/articles', (req, res) => {
  const newArticle = {
    id: uuid.v4(), // example UUID generation method
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    author: req.body.author
  };
  db.articles.push(newArticle);
  res.status(201).json(newArticle);
});

// GET /articles/articleId - get an article by ID
app.get('/articles/articleId', (req, res) => {
    const articleId = req.query.articleId;
    const article = db.articles.find(a => a.id === req.params.articleId);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
    } else {
      res.json(article);
    }
  });