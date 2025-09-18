const http = require('http');
const url = require('url');
const uaParser = require("ua-parser-js");

const server = http.createServer((req, res) => {

    //Response Headers:  tell the browser that kind of data we are sending
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, "OK", { 'content-type': 'text/html' });


    //Url Parsing
    const parsedURL = new URL(req.url, `https://${req.headers.host}`)
    console.log("Request received from", req.url);


    //User agent in header Parsing details
    const parser = new uaParser(req.headers['user-agent']);
    const requestUserDetails = parser.getResult();
    console.log("User Details", requestUserDetails)
    const browser = requestUserDetails?.browser?.name;
    if (browser === 'Chrome') {
        res.write("<h1>Hey, Chrome User</h1>")
    }
    console.log("Reqest From brower", requestUserDetails?.browser?.name);
    console.log("Client ID", req.socket.remoteAddress);
    console.log("Port", req.socket.remotePort);

    //Route handling
    console.log("Path", parsedURL.pathname);
    console.log("Request Method", req.method);
    const path = parsedURL.pathname;
    handleRoute(req.method, parsedURL.pathname, res);

    //Query Params extractions
    console.log("QueryParams", parsedURL.searchParams.get('name'));

    //Closes the response and sends data to the client.
    res.end("Nice connecting to you, Bye");
});


function handleRoute(method, path, res) {
    if (method === "GET") {
        if (path.includes('/about')) {
            res.write("<h1> About me </h1>");
            res.write("<h1>I am Kaviiiii's server😁💻</h1>");
        } else if (path.includes('/help')) {
            res.write("<h1> Help </h1>");
            res.write("<h1>How can I help you?</h1>");
        } else {
            res.write("<h1> Home </h1>");
            res.write("<p>Hey ,Welcome to my server space</p>");
        }
    }
    return;
}

server.listen(3000, "localhost", () => { console.log("server is running") });