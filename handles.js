/*const http = require('http');
const url = require('url');
const fs = require('fs');*/
const port = 8080;
const express = require('express');
const app = express();

const explication = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>Web Tech Project App</title>' +
'    </head>' +
'    <body>' +
'       <h1>How to use /hello route</h1>' +
'       <p>To use the /hello route, add a name query parameter to the URL like this:</p>' +
'       <pre>/hello?name=YourName</pre>' +
'       <p>For example:</p>' +
'       <pre>/hello?name=John</pre>' +
'       </body>' +
'</html>'

const presentation = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>Web Tech Project App</title>' +
'    </head>' +
'    <body>' +
'       <h1>Welcome to the biographie page</h1>' +
'       <p>We are Raphael and Axel, two students in apprentice at ECE Paris Engineering school. We are both doing this project regarding the web technology course we are both following for this semester.</p>' +
'       </body>' +
'</html>'

/*const server = http.createServer((req, res) => {
const parsedUrl = url.parse(req.url, true);
const path = parsedUrl.pathname;
const query = parsedUrl.query;*/

  //Dans le cas où l'url est juste http://localhost:8080/
  /*if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(explication);
    res.end();
  }*/

//Dans le cas où l'url est juste http://localhost:8080/
const rootRouter = express.Router();
rootRouter.get('/', (req, res) => {
  res.status(200).send(explication);
});

  //Dans le cas où l'url est http://localhost:8080/hello?name=NAME
  /*else if (path === '/hello') {
    const name = query.name;
    //Dans le cas où le champ "name" n'est pas rempli
    if (!name) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Please provide a name query parameter');
      res.end();
      return;
    }
    //Dans le cas où le champ "name" est celui d'un du binôme
    else if (name === 'Raphael' || 'Axel') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(presentation);
      res.end();
    }
    else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(`Hello ${name}!`);
      res.end();
    }
  }*/

//Dans le cas où l'url est http://localhost:8080/hello?name=NAME
const helloRouter = express.Router();
helloRouter.get('/hello', (req, res) => {
  const name = req.query.name;
  if (!name) {
    res.status(400).send('Please provide a name query parameter');
  } else if (name === 'Raphael' || name === 'Axel') {
    res.status(200).send(presentation);
  } else {
    res.status(200).send(`Hello ${name}!`);
  }
});

  //Dans le cas où l'url est http://localhost:8080/about
  /*else if (path === '/about') {
    const file = require('./content/about.json')
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(file));
    res.end();
  }*/

//Dans le cas où l'url est http://localhost:8080/about
const aboutRouter = express.Router();
aboutRouter.get('/about', (req, res) => {
  const about = require('./content/about.json');
  res.status(200).json(about);
});

  //Affiche une erreur 404 si on est dans aucun cas de figure précèdent
  /*else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
  
});*/

//Affiche une erreur 404 si on est dans aucun cas de figure précèdent
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});