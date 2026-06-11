const book = require('../models/books');


exports.createBook = async (req , res) => {
    try {
        const Book = new book(req.body);
        const saved = await Book.save();
        res.status(201).json(saved);
    }
    catch(err) {
        res.status(500).json({ message: err.message,})
    }
};

exports.getBooks =  async (req , res) => {
    try {
        const books = await book.find();
        res.status(200).json(books);
    }
    catch (err) {
        res.status(500).json({ message: err.message,})
    }
}

exports.getBook = async (req , res ) => {
    try {
        const Book = await book.findById(req.params.id);
        if(!Book) return res.status(404).json({error : "Book not found"})
        res.status(200).json(Book);
    }
    catch (err) {
        res.status(500).json({ message : err.message})
    }
}

exports.updateBook = async (req , res ) => {
    const id = req.params.id;
    try {
        const updatedBook = await book.findByIdAndUpdate(id,req.body,{ new : true });
        if(!updatedBook) return res.status(404).json({ error : "Book not found"});
        res.json(updatedBook)
    }
    catch (err) {
        res.status(500).json({ message : err.message})
    }
}


exports.deleteBook = async (req , res) => {
    const id = req.params.id;
    try{
        const deleteBook = await book.findByIdAndDelete(id);
        if(!deleteBook) return res.status(404).json({error : " Book not found"})
        res.send(`Book with id ${id} deleted`)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
}