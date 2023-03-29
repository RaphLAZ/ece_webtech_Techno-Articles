// pages/articles.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const articles = [
  { id: 1, title: 'Article 1', content: 'This is the first article.' },
  { id: 2, title: 'Article 2', content: 'This is the second article.' },
  { id: 3, title: 'Article 3', content: 'This is the third article.' },
];

function Articles() {
  return (
    <div>
      <Header/>
      <h1>Articles Page</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    <Footer/>
    </div>
  );
}

export default Articles;

