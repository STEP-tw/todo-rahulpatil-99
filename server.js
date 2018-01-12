let http = require('http');
const PORT = 9999;
let app = require('./app.js');
let server = http.createServer(app);
server.listen(PORT);
console.log(`Server is listening on ${PORT}`);
