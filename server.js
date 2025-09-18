const http = require('http');
const url = require('url');
const uaParser = require("ua-parser-js");

const server = http.createServer((req, res) => {
    const parsedURL = new URL(req.url, `https://${req.headers.host}`)
    console.log("Request received from", req.url);
    console.log("Path", parsedURL.pathname);

    console.log("User Agent", new uaParser(req.headers['user-agent']));
    console.log("Client ID", req.socket.remoteAddress);
    console.log("Port", req.socket.remotePort);
    console.log("QueryParams", parsedURL.searchParams.get('name'));
    //to tell the browser that kind of data we are sending
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');

    res.writeHead(200, "OK", { 'content-type': 'text/plain' });
    res.write("<h1>I am Kaviiiii's server😁</h1>");
    res.end("Nice connecting to you, Bye");
})

server.listen(3000, "localhost", () => { console.log("server is running") });