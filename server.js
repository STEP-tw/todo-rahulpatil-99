const http = require('http');
const PORT = 8888;
const app = require('./app.js');
const server = http.createServer(app);
server.listen(PORT);
console.log(`Server is listening on ${PORT}`);
