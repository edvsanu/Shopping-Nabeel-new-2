const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'public');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const server = http.createServer((req,res)=>{
  let pathname = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = path.join(root, pathname === '/' ? 'index.html' : pathname.replace(/^\/+/,''));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file,(err,stat)=>{
    if(err || !stat.isFile()) file = path.join(root,'index.html');
    fs.readFile(file,(e,data)=>{ if(e){res.writeHead(500);return res.end('Unable to load AYLKART');} res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data); });
  });
});
const port = process.env.PORT || 3000;
server.listen(port,'0.0.0.0',()=>console.log(`AYLKART running on port ${port}`));
