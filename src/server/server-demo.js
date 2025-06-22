const express = require('express')
const booksList = require('./booksList').BookList;
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Use the imported booksList as our working array
let books = [...booksList]; // Create a copy so we can modify it

// GET endpoint - return current books array
app.get('/src/server/bookList', (req, res) => {
    res.send(books)
})

// POST endpoint - add new book (fixed the route path)
app.post('/src/server/bookList', (req, res) => {
    let newBook = {...req.body}
    
    // Basic validation (uncomment if needed)
    if(!newBook.name || !newBook.author || !newBook.category || 
       newBook.amount === undefined || !newBook.publicationDate || 
       !newBook.price || newBook.discount === undefined) {
        res.status(400).send('missing values');
        return;
    }
    
    // Add the new book to our books array
    books.push(newBook);
    console.log('New book added:', newBook.name);
    console.log('Total books:', books.length);
    
    res.send(newBook);
})

// PUT endpoint - update existing book (for ratings, inventory, etc.)
app.put('/src/server/bookList/:name', (req, res) => {
    const bookName = req.params.name;
    const updates = req.body;
    
    let bookIndex = books.findIndex(book => book.name === bookName);
    if(bookIndex === -1) {
        res.status(404).send('book not found');
        return;
    }
    
    // Update the book with new data
    books[bookIndex] = { ...books[bookIndex], ...updates };
    console.log('Book updated:', bookName);
    
    res.send(books[bookIndex]);
})

// DELETE endpoint - delete book (fixed variable name from 'id' to work with name)
app.delete('/src/server/bookList/:name', (req, res) => {
    const bookName = req.params.name;
    let index = books.findIndex(book => book.name === bookName);
    
    if(index === -1) {
        res.status(404).send('book not found');
        return;
    }
    
    const deletedBook = books[index];
    books.splice(index, 1);
    console.log('Book deleted:', deletedBook.name);
    
    res.send({ message: 'book deleted', deletedBook });
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
    console.log('Initial books loaded:', books.length)
})