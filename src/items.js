const items = [
  { id: 1, name: 'Omena' },
  { id: 2, name: 'Appelsiini' },
  { id: 3, name: 'Porkkana' },
  { id: 4, name: 'Mandariini' },
];

const getItems = (req, res) => {
  res.json(items);
};

const getItemById = (req, res) => {
  console.log('getItemById', req.params.id);
  const item = items.find((item) => item.id === Number(req.params.id));
  
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

const addItem = (req, res) => {
  console.log('addItem request body', req.body);
  
  if (!req.body.name) {
    return res.status(400).json({ message: 'Request is missing name property.' });
  }

  const latestId = items.length > 0 ? items[items.length - 1].id : 0;
  const newItem = { id: latestId + 1, name: req.body.name };
  items.push(newItem);
  
  return res.status(201).json({ message: 'Item added.', newItem });
};

const editItem = (req, res) => {
  console.log('editItem request body', req.body);
  const item = items.find((item) => item.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  item.name = req.body.name;
  res.json({ message: 'Item updated.', updatedItem: item });
};

const deleteItem = (req, res) => {
  console.log('deleteItem', req.params.id);
  const index = items.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items.splice(index, 1);
  res.json({ message: 'Item deleted.' });
};


export { getItems, getItemById, addItem, editItem, deleteItem };
