const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

const port = 3010;

const users = [
  { id: 1, username: 'asd', password: '123' },
  { id: 2, username: 'bob', password: 'abc' }
];

const sessions = {};

const cookieParser = (headers) => {
  if (!headers.cookie) return {};
  const cookieObj = {};

  const cookiesArr = headers.cookie.split('; ');
  for (let i = 0; i < cookiesArr.length; i++) {
    const cookie = cookiesArr[i];
    const cookieArr = cookie.split('=');
    cookieObj[cookieArr[0]] = cookieArr[1];
  }
  return cookieObj;
};

app.use((req, res, next) => {
  const cookies = cookieParser(req.headers);
  req.cookies = cookies;

  next();
});

const checkAuth = (req, res, next) => {
  const { sessionId } = req.cookies || {};
  console.log(sessionId)
  if (!sessionId || !sessions[sessionId]) return res.status(401).send('Unauthorized');
  next();
};

app.get('/login', checkAuth, (req, res) => {
  res.send('>>>> Protect your data by yourself, we are not your employer');
});

app.post('/login', (req, res) => {
  const us = req.body || {};
  console.log(req.body);
  
  if (!us.username || !us.password) return res.status(422).send('Requirement is not fulfilled');

  const user = users.find(u => u.username === us.username && u.password === us.password);
  console.log(user);

  if (!user) return res.status(401).send('Incorrect username or password');

  const sessionId = Math.ceil(Math.random() * 10000);
  sessions[sessionId] = user.id;

  res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/dashboard; Max-Age=300`);

  res.send({
    message: 'Login successful',
    sessionId
  });
});

app.listen(port, (req, res) => {
  console.log('Server running on port', port);
});