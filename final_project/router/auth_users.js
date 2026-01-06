const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    let user = users.find(u => u.username === username && u.password === password)
    return user !== undefined
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        return res.status(404).json({ message: "Credentials not provided" })
    }

    if (authenticatedUser(username, password)) {
        const accessToken = jwt.sign({
            data: password
        }, "access", { expiresIn: 60 * 60 })

        req.session.authentication = {
            accessToken,
            username
        }
        return res.status(200).json({ message: "User successfully logged in"})
    } else {
        return res.status(208).json({ message: "Invalid login" })
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbn = req.params.isbn
    if (req.session.authentication) {
        const username = req.session.authentication.username
        // If same user posts different review on same isbn, update it
        books[isbn].reviews[username] = req.query.review
        return res.send("Review successfully added")
    } else {
        return res.status(401).json({ message: "User not authenticated "})
    }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn
    const username = req.session.authentication.username
    delete books[isbn].reviews[username]
    return res.send("Review successfully deleted")
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
