const http = require('http'), fs = require('fs'), path = require('path');
http.createServer((req, res) => {
  const file = path.join(__dirname, 'site', req.url === '/' ? 'index.html' : req.url);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}).listen(process.env.PORT || 3000, () => console.log(`ShopEasy demo on http://localhost:${process.env.PORT || 3000}`));
