const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username
  const password = req.body.password


  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books, null, 4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.send(books[req.params.isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  let book = null
  for (let isbn in books) {
    if (books[isbn].author === author) {
        book = books[isbn]
    }
  }
  if (book) {
    return res.send(book)
  } else {
    return res.status(401).send(`Book with author '${author}' does not exist`)
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title
  for (let isbn in books) {
    if (books[isbn].title === title) {
        return res.send(books[isbn])
    }
  }

  return res.status(401).send(`Book with title '${title}' does not exist`)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.send(books[req.params.isbn].reviews)
});

module.exports.general = public_users;
