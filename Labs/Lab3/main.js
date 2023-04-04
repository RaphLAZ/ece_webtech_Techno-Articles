const express = require('express');
const app = express();
const port = 3000;
const db = require('./db.json'); // import the db object from db.json
const uuid = require('uuid');

// GET /articles - list all articles
app.get('/articles', (req, res) => {
  res.json(db);
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
  db.push(newArticle);
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

// GET /articles/articlesId/comments - get all comments for an article 
app.get('/articles/articleId/comments', (req, res) => {
  const comments = db.comments.filter(c => c.articleId === req.params.articleId);
  res.send(comments);
});

// POST /articles/articleId/comments - add a new comment to a specific article with articleId
app.post('/articles/articleId/comments', (req, res) => {
  const newComment = {
    id: uuidv4(), // generate a new UUID for the comment
    timestamp: Date.now(), // use current timestamp as comment timestamp
    content: req.body.content,
    articleId: req.params.articleId,
    author: req.body.author
  };
  db.comments.push(newComment);
  res.status(201).send(newComment);
});

// GET /articles/articleId/comments/commentId - get a comment with commentId of the article with articleId
app.get('/articles/articleId/comments/commentId', (req, res) => {
  const comment = db.comments.find(c => c.id === req.params.commentId && c.articleId === req.params.articleId);
  if (!comment) {
    res.status(404).send('Comment not found');
  } else {
    res.send(comment);
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server started on port 3000');
});

