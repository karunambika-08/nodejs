## Express
A web framework build on top of the node js

## Express.js simple flow
Client Request
      ↓
Express App (app = express())
      ↓
Global Middleware (logging, parsing, auth)
      ↓
Route Matching (app.get('/users'), app.post('/login'))
      ↓
Route Handler (controller function)
      ↓
Response sent back

Express App is a more like a manager that receive all the request from the client

Middleware are functions that run before your main route.

The Express app acts like a **manager** that receives all client requests.  
 **Middleware** are functions that run *before* your main route handler.  

---

## Types of Middleware

- **Global Middleware** → runs for all requests.  
- **Built-in Middleware** → like `express.json()`, `express.static()`.  
- **Route-Specific Middleware** → applies only to certain routes.  
- **Error-Handling Middleware** → handles errors with `(err, req, res, next)`.  
- **Custom Middleware** → logic you define yourself.  

---

## `next()`

Express automatically passes a `next` function into every middleware.  
- `next()` → passes control to the next middleware/route handler.  
- If you **don’t call `next()`** *and* don’t send a response (`res.send`, `res.json`), the request will **hang forever**.  

---

## Use Cases of Middleware

### Case A: Middleware that does something, then passes control
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // important, otherwise request never reaches the route
});


###  Case B: Middleware that ends the response
const authMiddleware = (req, res, next) => {
  if (req.headers['x-auth'] === '12345') {
    next(); // continue to route
  } else {
    res.status(403).send("Forbidden"); // no next(), response ends here
  }
};

###  Case C: Error Handling

app.use((req, res, next) => {
  try {
    // something risky
    next();
  } catch (err) {
    next(err); // passes error to error-handling middleware
  }
});

Use next(err) if you want to trigger error-handling middleware.

