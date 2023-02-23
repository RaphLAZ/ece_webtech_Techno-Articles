const express = require('express');
const app = express();
const port = 8080;

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
  '</html>';

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
  '</html>';

// Define a router for the '/hello' route
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

// Define a router for the '/' route
const rootRouter = express.Router();
rootRouter.get('/', (req, res) => {
  res.status(200).send(explication);
});

// Define a router for the '/about' route
const aboutRouter = express.Router();
aboutRouter.get('/about', (req, res) => {
  const about = require('./content/about.json');
  res.status(200).json(about);
});

// Use the routers for their respective routes
app.use(helloRouter);
app.use(rootRouter);
app.use(aboutRouter);
 
// Define a catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});