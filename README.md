# Node JS
 1. JS runtime Environment, 
 2. Single threaded. 
 3. It uses event loop to achieve concurrent running of the process


# Node JS Server flow
http.createServer() → creates the server instance.

Callback (req, res) → handles every incoming request.

res.writeHead or statusCode + res.setHeader + res.end → sends the response back.

server.listen(PORT) → binds server to a port.


res.end() -> Close the response data and send back to the server, if we don't use res.end() then browser will keep on waiting forever

# Event Loop

The **event loop** is like a queue manager. It decides *when callbacks run* — whether they come from timers, promises, I/O, or other sources.  
Think of it as the traffic controller that makes sure everything gets executed in the right order.  

---

## Phases of the Event Loop (Simplified)

1. **Timers Phase** → Runs callbacks from `setTimeout` and `setInterval`.  
2. **I/O Callbacks** → Handles system events (like when a file finishes reading or a network request completes).  
3. **Idle, Prepare** → Internal stuff (you don’t usually deal with this).  
4. **Poll Phase** → Waits for new I/O events, processes them if ready.  
5. **Check Phase** → Runs `setImmediate` callbacks.  
6. **Close Callbacks** → Handles cleanup when things close (like sockets).  

---

##  Macro-tasks

Also called **tasks**.  
These are bigger chunks of work, and the event loop runs them *one at a time*.  

**Examples:**  
- `setTimeout`  
- `setInterval`  
- `setImmediate` (Node.js only)  
- I/O callbacks (like `fs.readFile`)  
- UI rendering (in browsers)  

 After finishing one macro-task, the event loop always checks for micro-tasks before moving to the next one.  

---

## Micro-tasks

These are **smaller, high-priority jobs**. They run right after the current code finishes, *before the event loop moves on to the next macro-task*.  

**Examples:**  
- Promises (`.then`, `.catch`, `.finally`)  
- `queueMicrotask()` (browser + Node)  
- `process.nextTick()` (Node.js only — even higher priority than Promises!)  

The event loop won’t move forward until the **micro-task queue is empty**.  

---

##  Event Loop task handling
1. Take one macro-task (e.g., a `setTimeout`).  
2. Run all its code.  
3. Check the micro-task queue → run everything there until empty.  
4. Move to the next macro-task.  

---




