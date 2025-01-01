// The address of this server connected to the network is : http://localhost:2424
const express = require("express");
const app = express()
const PORT = 2424

// This is fake data to test my endpoints
let data = [{
    firstName: "John",
    lastName: "Doe",
    age: 25,
    job: "teacher",
    hobbies: ["coding", "startup", "finance"]
}]

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Differents HTTP verbs
// The methods inform the nature of the request and the route is a further directory (basically we direct the request to the body of code to respond appropriately, and these locations or routes are called endpoints)
// ---------------------


// TYPE 1 -- Websites endpoints are made to send back HTML and they come when a user type a URL in his browser

//this is endpoint #1
app.get("/", (req, res) => {
    res.send(`
        <body>
            <h1>Welcome ${data[0].firstName} ${data[0].lastName}</h1>
            <p>Your informations are : <br>${JSON.stringify(data)}</p>
        </body>
    `);
})

//this is endpoint #2
app.get("/dashboard", (req, res) => {
    res.send("<h1>Dashboard Page</h1>");
})


// TYPE 2 -- API endpoints are made to perform an action interneally in the server (typacally non visual)
// CRUD operations stands for "Create (POST) - Read (GET) - Update (PUT) - Delete (DELETE)"

// Send data to the client
app.get("/api/data", (req, res) => {
    res.send(data);
})

// Someone wants to create a user (for example when they click a sign up button). The user clicks the sign up button after entering their credentials, and their browser is wired up to send out a network request to the server to handle that action
app.post("/api/data", (req, res) => {
    const newEntry = req.body;
    data.push(newEntry)
    console.log(newEntry.firstName)
    res.sendStatus(201)
})


// This command listen to the server when it is run.
app.listen(PORT, function() {
    console.log(`Server is running on: ${PORT}`);
})