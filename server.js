const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;
  if (pathname === '/health' || pathname === '/api/health') return send(res, 200, JSON.stringify({ ok: true, service: 'heathalo' }), mime['.json']);
  const clean = pathname === '/' ? '/index.html' : pathname;
  const file = path.resolve(root, `.${clean}`);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(res, 404, 'Not found');
  const ext = path.extname(file);
  send(res, 200, fs.readFileSync(file), mime[ext] || 'application/octet-stream');
});

server.listen(port, '0.0.0.0', () => console.log(`HeatHalo listening on 0.0.0.0:${port}`));
