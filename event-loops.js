console.log("Hello, World!");

const fs = require('fs');

fs.readFile('event-loops.js', 'utf8', (err, data) => {
    console.log("File read completed");
    setImmediate(() => {
        console.log("This message is displayed immediately after file read operation");
    });
    setTimeout(() => {
        console.log("This message is displayed after 0 seconds of file read operation");
    }, 0);
    err && console.error(err);
});
setTimeout(() => {
    console.log("This message is displayed after 0 seconds");
}, 0);

setImmediate(() => {
    console.log("This message is displayed immediately Timer phase -> I/O Callbacks -> Idle , Prepare-> Poll ->Check phase");
});

console.log("End of the script execution");