const express = require('express');
const { createBook, getBooks , getBook, updateBook, deleteBook} = require('../controllers/books');

const router = express.Router();


router.post("/create", createBook);
router.get("/", getBooks)
router.get("/:id", getBook)
router.put("/:id", updateBook)
router.delete("/:id", deleteBook)

module.exports = router;