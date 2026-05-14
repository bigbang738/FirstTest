const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (request, response) {
    let filePath = '.' + request.url;
    if (filePath == './') filePath = './index.html';
    
    let extname = String(path.extname(filePath)).toLowerCase();
    let mimeTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpg', '.gif': 'image/gif', '.svg': 'image/svg+xml' };
    let contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            response.writeHead(500);
            response.end('Error');
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
