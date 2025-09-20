const express = require('express');

const app = express();
const PORT = 3000;
let reqCount = 0;
const posts = [];



//App level middleware - runs for all requests
//Logger middleware
app.use((req, res, next) => {
    const reqTime = new Date().toISOString();
    console.log(`${req.method} ${req.url} - ${reqTime}`);
    next();
});


//Custom middlewares
const checkReq = (req, res, next) => {
    const userAgentBrower = req.headers["sec-ch-ua"];
    console.log("User agent", userAgentBrower);
    console.log("req.headers['x-postman-request']", req.headers['x-postman-request']);
    if (userAgentBrower?.includes('Chrome') || req.headers['x-postman-request']) {
        next();
    } else {
        const err = new Error("Forbidden Entry");
        err.status = 403;
        next(err);
    }
    return;
};

const checkTime = (req, res, next) => {
    if (new Date().getHours() > 22) {
        return next(new Error("Time limit reached,kindly try tomorrow"));
    }
    next();
};

app.use(checkReq);

app.use(checkTime);

app.use((req, res, next) => {
    console.log("Total request handled", reqCount++);
    next();
});


app.use((req, res, next) => {
    req.user = "Kavi";
    next();
})

// Built-in middleware
app.use(express.json());

//Routes
app.get('/posts', (req, res) => {
    const getPosts = posts;
    res.json(getPosts);
});

app.post('/posts', (req, res) => {
    const newPost = req.body;
    if (newPost) {
        posts.push(newPost);
    }
    res.send(posts)
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error("Error caught", err.message);
    const status = err.status || 500
    return res.status(status).send({ error: err.message });
});


//start server
app.listen(PORT, () => {
    console.log("Server is up and running");
});

//process.on("SIGINT") catches when Ctrl + C pressed(or when the server is asked to stop).
process.on("SIGINT", () => {
    console.log("Server shutting down...");
    process.exit();
});

//Note for later use
//Close DB connections
// Flush logs
// Save in -memory data(like posts)