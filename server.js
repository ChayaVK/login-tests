const http = require('http'), fs = require('fs'), path = require('path');

const port = process.env.PORT || 3000;
const version = process.env.APP_VERSION || 'dev';
const rememberMe = process.env.FEATURE_REMEMBER_ME === 'on';
const users = { asha: 'demo-pass' };

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function readBody(req, done) {
  let data = '';
  req.on('data', (chunk) => (data += chunk));
  req.on('end', () => { try { done(JSON.parse(data || '{}')); } catch { done({}); } });
}

http.createServer((req, res) => {
  // Small API used by the API tests and the deploy checks
  if (req.url === '/api/health') return sendJson(res, 200, { status: 'ok', version });
  if (req.url === '/api/users' && req.method === 'POST') {
    return readBody(req, ({ username, password }) => {
      if (!username || !password) return sendJson(res, 400, { error: 'username and password are required' });
      users[username] = password;
      sendJson(res, 201, { username });
    });
  }
  if (req.url === '/api/login' && req.method === 'POST') {
    return readBody(req, ({ username, password }) => {
      if (users[username] && users[username] === password) return sendJson(res, 200, { message: `Welcome, ${username}` });
      sendJson(res, 401, { error: 'Invalid username or password' });
    });
  }

  // The login page
  const file = path.join(__dirname, 'site', req.url === '/' ? 'index.html' : req.url);
  fs.readFile(file, 'utf8', (err, html) => {
    if (err) { res.writeHead(404); return res.end(); }
    if (rememberMe) html = html.replace('<!-- remember-me -->', '<label><input type="checkbox" data-testid="remember-me"> Remember me</label>');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
}).listen(port, () => console.log(`ShopEasy ${version} on http://localhost:${port}`));
