import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../db.js"

const router = express.Router()

// Register a new user endpoint /auth/register
router.post("/register", (req, res) => {
    const { username, password } = req.body
    // Save the username and an irreversibly encrypted password (no longer the password that I want but a weird long string with no meaning)
    // Encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)

    // Save the new user and hashed password to the db
    try {
        const insertUser = db.prepare(`
            INSERT INTO users (username, password)
            VALUES (?, ?)
        `)
        const result = insertUser.run(username, hashedPassword)

        // Now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello! Add your first todo!`
        const insertTodo = db.prepare(`
            INSERT INTO todos (user_id, task)
            VALUES (?, ?)
        `)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // Create a token
        const token = jwt.sign(
            { id: result.lastInsertRowid },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        // The Final response sent to the user after registering
        res.status(201).json({ token });

    } catch(err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})


router.post("/login", (req, res) => {
    // We get their email, and we look up the password associated with thae email in the database
    // But we get it back and see it's encrypted, which means that we cannot compare it to the one the user just used trying to login
    
    const  { username, password } = req.body
    
    try {
        const getUser = db.prepare("SELECT * FROM users WHERE username = ?")
        const user = getUser.get(username)

        // Case where we cannot find a user associated with that username
        if(!user) {
            return res.status(404).send({ message: "No user that match the username found"})
        }

        // Compare the password entered by the user to the hashed password of the user in the table
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // Case where the password doesn't match the password stored in the database
        if(!passwordIsValid) {
            return res.status(401).send({message : "Invalid password"})
        }
        // Case when the user could authenticate
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )
        res.json({ token })

    } catch(err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router;