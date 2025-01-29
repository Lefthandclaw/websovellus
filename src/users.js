const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  console.log('getUserById', req.params.id);
  const user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const addUser = (req, res) => {
  console.log('addUser request body', req.body);

  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      message: 'Request should have username, password, and email properties.',
    });
  }

  const latestId = users.length > 0 ? users[users.length - 1].id : 0;
  const newUser = {
    id: latestId + 1,
    username,
    password,
    email,
  };

  users.push(newUser);
  return res.status(201).json({ message: 'User added.', newUser });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ message: 'Username and password required.' });
  }

  const user = users.find((user) => user.username === username);

  if (user && user.password === password) {
    res.json({ message: 'Login successful.', user });
  } else {
    res.status(401).json({ message: 'Invalid username or password.' });
  }
};

export { getUsers, getUserById, addUser, login };

  