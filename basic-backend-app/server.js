// The address of this server connected to the network is : http://localhost:2424
const express = require("express");
const app = express()
const PORT = 2424

// This command listen to the server when it is run.
app.listen(PORT, function() {
    console.log(`Server is running on: ${PORT}`);
})