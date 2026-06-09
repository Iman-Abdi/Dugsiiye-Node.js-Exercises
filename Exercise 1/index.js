const express = require('express');
const app = express();
const Port = 3000;

app.use(express.json());

let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' }
];


app.get('/books', (req,res) => {
    res.json(books)
})

app.get('/books/:id', (req , res) => {
    const book = books.find( book => book.id ==req.params.id);
    if(!book) return res.status(404).json({error: "Book not found."});
    res.json(book)
})

app.post('/books', (req , res) =>{
    const {title , author } = req.body;
    if(!title || !author) return res.status(400).json({error: "title and author required"});

    const newbook = {
        id : books.length + 1,
        title,
        author
    };

    books.push(newbook);
    res.status(201).json(newbook);
})

app.put('/books/:id', (req , res) => {
    const book = books.find( book => book.id ==req.params.id);
    if(!book) return res.status(404).json({error: "Book not found."});
    const { title } = req.body;
    if(!title) return res.status(400).json({error : "Title is required"});
    book.title = title;
    res.json(book)
})

app.delete('/books/:id' , ( req , res ) => {
    books = books.filter(b=> b.id != req.params.id );
    res.send("book deleted")
})







app.listen(Port, () =>{
    console.log(`Server is running at http://localhost:${Port}`)
});