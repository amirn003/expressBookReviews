const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
/*
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});
*/

let myPromiseGetBooks = new Promise((resolve,reject) => {
    public_users.get('/',function (req, res) {
        res.send(JSON.stringify(books,null,4));
    });
});

myPromiseGetBooks.then((successMessage) => {
    console.log("From Callback " + successMessage)
});

// Get book details based on ISBN
/*
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
 });
*/

let myPromiseGetByIsbn = new Promise((resolve,reject) => {
    public_users.get('/isbn/:isbn',function (req, res) {
        const isbn = req.params.isbn;
        res.send(books[isbn])
    });
});

myPromiseGetByIsbn.then((successMessage) => {
    console.log("From Callback " + successMessage)
});
  
// Get book details based on author
/*
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    found = 0
    const selectedBooks = [];
    for (val in books){
        if (books[val].author == author){
            console.log(books[val].author);
            selectedBooks.push(books[val]);
            found = 1;
        }
    }
    if(found){
        res.send(selectedBooks);
    }
    else{
        res.send("Unable to find the author!");
    }  
});
*/

let myPromiseGetByAuthor = new Promise((resolve,reject) => {
    public_users.get('/author/:author',function (req, res) {
        const author = req.params.author;
        found = 0
        const selectedBooks = [];
        for (val in books){
            if (books[val].author == author){
                console.log(books[val].author);
                selectedBooks.push(books[val]);
                found = 1;
            }
        }
        if(found){
            res.send(selectedBooks);
        }
        else{
            res.send("Unable to find the author!");
        }  
    });
});

myPromiseGetByAuthor.then((successMessage) => {
    console.log("From Callback " + successMessage)
});

// Get all books based on title
/*
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    found = 0
    const selectedBooks = [];
    for (val in books){
        if (books[val].title == title){
            console.log(books[val].title);
            selectedBooks.push(books[val]);
            found = 1;
        }
    }
    if(found){
        res.send(selectedBooks);
    }
    else{
        res.send("Unable to find the author!");
    }
});
*/

let myPromiseGetByTitle = new Promise((resolve,reject) => {
    public_users.get('/title/:title',function (req, res) {
        const title = req.params.title;
        found = 0
        const selectedBooks = [];
        for (val in books){
            if (books[val].title == title){
                console.log(books[val].title);
                selectedBooks.push(books[val]);
                found = 1;
            }
        }
        if(found){
            res.send(selectedBooks);
        }
        else{
            res.send("Unable to find the author!");
        }
    });
});

myPromiseGetByTitle.then((successMessage) => {
    console.log("From Callback " + successMessage)
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbnrq = req.params.isbn;
    const isbn = parseInt(isbnrq);
    found = 0;
    const review = [];

    for (val in books){
        
        if (isbn == val){
            console.log(val+" : "+ books[val]);
            review.push(books[val].reviews)
            found = 1;
        }
    }  
    if(found){
        res.send(review);
    }
    else{
        res.send("Unable to find the isbn!");
    }
});


module.exports.general = public_users;
