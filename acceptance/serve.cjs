const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const fixture = '@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix vcard: <http://www.w3.org/2006/vcard/ns#>.\n<#me> a foaf:Person, vcard:Individual; foaf:name "Playwright Pod profile"; vcard:fn "Playwright Pod profile".';
http.createServer((req, res) => {
    if (req.headers.origin === 'http://localhost:5001') {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization, DPoP, Link, If-None-Match, Range');
    res.setHeader('Access-Control-Expose-Headers', 'Link, Content-Type, ETag');
    if (req.method === 'OPTIONS') { res.writeHead(204).end(); return; }
    if (req.url !== '/profile.ttl') { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', 'text/turtle');
    res.end(fixture);
}).listen(5002, '127.0.0.1');
const root = path.resolve(__dirname, '../dist');
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };
http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const filename = path.resolve(root, '.' + decodeURIComponent(pathname === '/' ? '/browse.html' : pathname));
    if (!filename.startsWith(root + path.sep) || !fs.existsSync(filename) || fs.statSync(filename).isDirectory()) {
        res.writeHead(404).end(); return;
    }
    res.setHeader('Content-Type', types[path.extname(filename)] || 'application/octet-stream');
    fs.createReadStream(filename).pipe(res);
}).listen(5001, '127.0.0.1');
