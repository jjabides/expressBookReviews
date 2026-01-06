const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username
    const password = req.body.password

    if (username && password) {
        let existingUsers = users.filter(user => user.username === username)

        if (existingUsers.length > 0) {
            return res.status(404).json({ message: "User already exists" })
        } else {
            users.push({ username, password })
            return res.send("User successfully added")
        }
    } else {
        return res.status(404).json({ message: "Credentials not provided" })
    }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here

    const myPromise = new Promise((resolve, reject) => {
        let success = true;
        if (success) {
            resolve("The operation was successful!");
        } else {
            reject("The operation failed!");
        }
    });

    myPromise.then((message) => {
        console.log(message)
        res.send(JSON.stringify(books, null, 4))
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here

    const myPromise = new Promise((resolve, reject) => {
        let success = true;
        if (success) {
            resolve("The operation was successful!");
        } else {
            reject("The operation failed!");
        }
    });

    myPromise.then((message) => {
        console.log(message)
        res.send(books[req.params.isbn])
    })
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const author = req.params.author
    let book = null

    const myPromise = new Promise((resolve, reject) => {
        try {
            for (let isbn in books) {
                if (books[isbn].author === author) {
                    book = books[isbn]
                }
            }

            resolve("The operation was successful!");
        } catch (e) {
            reject("The operation failed!");
        }
    });

    myPromise.then((message) => {
        if (book) {
            return res.send(book)
        } else {
            return res.status(401).send(`Book with author '${author}' does not exist`)
        }
    }).catch((message) => {
        return res.status(500).send(message)
    })
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    let book = null
    const title = req.params.title
    const myPromise = new Promise((resolve, reject) => {

        try {
            for (let isbn in books) {
                if (books[isbn].title === title) {
                    book = books[isbn]
                    break
                }
            }

            resolve("The operation was successful!");
        } catch (e) {
            reject("The operation failed!");
        }
    });

    myPromise.then((message) => {
        console.log(message)
        if (book) {
            res.send(book)
        } else {
            res.status(401).send(`Book with title '${title}' does not exist`)
        }

    }).catch((message) => {
        res.status(500).send(message)
    })
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    return res.send(books[req.params.isbn].reviews)
});

module.exports.general = public_users;
