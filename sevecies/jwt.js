var jwt = require('jsonwebtoken');
const APP_key = "my-secret-key"
var token = jwt.sign({ id : 123 },APP_key)
// console.log(token)
console.log(jwt.verify(token,APP_key))
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3NTMxNjYwODZ9.L1hl51r2QW5rb8fufaSbaEiXVkXkOSMgfSvyWWuYkHk