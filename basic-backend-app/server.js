// The address of this server connected to the network is : http://localhost:2424
const express = require("express");
const app = express()
const PORT = 2424

// Differents HTTP verbs
// The methods inform the nature of the request and the route is a further directory (basically we direct the request to the body of code to respond appropriately, and these locations or routes are called endpoints)
// ---------------------

app.get("/", (req, res) => {
    //this is endpoint #1
    res.send("this is my home page");
    res.sendStatus(200)
})

app.get("/dashboard", (req, res) => {
    //this is endpoint #2
    res.send("hey you're on the dashboard");
})

// This command listen to the server when it is run.
app.listen(PORT, function() {
    console.log(`Server is running on: ${PORT}`);
})