const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur !');
});
server.listen(process.env.port || 3000);