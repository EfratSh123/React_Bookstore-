const express = require('express')
const booksList = require('./booksList').BookList;
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.get('/src/server/bookList',(req,res)=>{
    res.send(booksList)
})
app.post('src/server/bookList',(req,res)=>{
    let newBook={...req.body}
    //בדיקה האם הערכים ריקים, אם כן- להחזיר שגיאה
    // if(!newBook.name || !newBook.author || !newBook.category || !newBook.amount ||
    //  !newBook.publicationDate || !newBook.price || !newBook.discount || !newBook.rating || !newBook.numRating)
    // {
    //     res.status(400).send('missing values');
    //     return;
    // }
    books.push(newBook);
    res.send(newBook);
})
app.delete('src/server/bookList/:id',(req,res)=>{
    let id = req.params.id;
    let index = books.findIndex(book=>book.id == id);
    if(index == -1)
    {
        res.status(404).send('book not found');
        return;
    }
    books.splice(index,1);
    res.send('book deleted');
})
app.listen(3000,()=>{
    console.log('server is listening on port ',3000)
})