const express = require('express');
const app = express();
const port = 3000;
const db = require('./db'); // import the db object from db.js

// GET /articles - list all articles
app.get('/articles', (req, res) => {
  res.json(db.articles);
});

// POST /articles - add a new article
app.post('/articles', (req, res) => {
  const newArticle = {
    id: create_UUID(), // example UUID generation method
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    author: req.body.author
  };
  db.articles.push(newArticle);
  res.status(201).json(newArticle);
});

// GET /articles/:articleId - get an article by ID
app.get('/articles/:articleId', (req, res) => {
  const article = db.articles.find(a => a.id === req.params.articleId);
  if (!article) {
    res.status(404).json({ message: 'Article not found' });
  } else {
    res.json(article);
  }
});

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

// Start the server
app.listen(port, () => {
  console.log('Server started on port 3000');
});

