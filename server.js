const express = require('express');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const express = require('express');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_SESSION_URL = process.env.MONGO_SESSION_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO_SESSION_URL,
        ttl: 60 * 30
    }),
    cookie: {
        sameSite: true,
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 10
    }
}));


const users = [
    { id: '1', username: "John", password: 'J0hn124' },
    { id: '2', username: "Phoebe", password: "Ph0ebe123" },
    { id: '3', username: "Amy", password: "@my123" }
];

function authenticate(req, res, next) {
    try {
        if (req.session.user && req.session.user.username) {
            next();
        }
        const err = new Error("Unauthorized, Please login");
        err.status = 403;
        return next(err);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

app.get('/', (req, res) => {
    if (req.session.user && req.session.user.username) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/login')
    }
});

app.get('/login', (req, res) => {
    res.send(`
    <form method="POST" action="/login">
      <label>Username: <input type="text" name="username" /></label><br>
      <label>Password: <input type="password" name="password" /></label><br>
      <button type="submit">Login</button>
    </form>
  `);
});

//Routes
app.post('/login', (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            req.session.user = { username: user.username }; //Session will be save in memory after having something to store
            return res.send(`Logged in successfully. Session ID: ${req.session.id}`);
        }
        const err = new Error("Invalid credentials");
        err.status = 401;
        return next(err);
    } catch (err) {
        console.log(err);
        next(err);
    }
});



app.get('/dashboard', authenticate, (req, res, next) => {
    try {
        res.send(`Welcome to the dashboard, ${req.session.user.username}`);
    } catch (err) {
        console.log(err);
        next(err);
    }
});


app.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            err.message = "Error logging out";
            err.status = 500;
            next(err);
        }
        res.send("Logged out successfully");
    })
});

app.use((err, req, res, next) => {
    console.log("Error caught", err.message);
    const status = err.status || 500;
    return res.status(status).send({ error: err.message });
});

app.listen(PORT, () => { console.log("Server is running") });

process.on("SIGINT", () => {
    console.log("Server shutting down...");
    process.exit();
});