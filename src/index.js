import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let items = [
  { id: 1, name: 'Item1' },
  { id: 2, name: 'Item2' },
];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex(item => item.id === parseInt(id));

  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }

  items[itemIndex] = { id: parseInt(id), ...req.body };
  res.json(items[itemIndex]);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex(item => item.id === parseInt(id));

  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }

  items.splice(itemIndex, 1);
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).send('Resource not found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

