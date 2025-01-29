import express from 'express';
import {addItem, deleteItem, editItem, getItemById, getItems} from './items.js';
import {addUser, getUsers, login} from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use('/', express.static('public'));
app.use(express.json());
app.get('/api/', (req, res) => {
  console.log('get-pyyntö apin juureen havaittu');
  console.log(req.url);
  res.send('Welcome to my REST API!');
});

app.get('/api/items', getItems);
app.get('/api/items/:id', getItemById);
app.post('/api/items', addItem);
app.put('/api/items/:id', editItem);
app.delete('/api/items/:id', deleteItem);

app.get('/api/users', getUsers);
app.post('/api/users', addUser);
app.post('/api/users/login', login);


app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log(req.params);
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);
  if(isNaN(num1) || isNaN(num2)) {
    res.status(400);
    res.json({
      error: 'Both parameters must be numbers!'
    });
    return;
  }
  res.json({
    num1,
    num2,
    sum: num1 + num2
  });
});

app.get('/api/sum/', (req, res) => {
  console.log(req.query);
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  res.json({
    num1,
    num2,
    sum: num1 + num2
  });
});

app.post('/api/moro', (req, res) => {
  console.log(req.body);
  res.status(200);
  res.json({reply: 'no Moro ' + req.body.sender});
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});