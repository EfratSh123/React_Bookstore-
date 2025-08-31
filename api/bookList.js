let books = [
  { 
    name: "Harry Potter and the Sorcerer's Stone", 
    author: "J.K. Rowling", 
    category: ["Fantasy"], 
    amount: 10, 
    publicationDate: "1997-06-26", 
    price: 20, 
    discount: 0,
    rating: 45,      
    numRating: 15
  },
  { 
    name: "1984", 
    author: "George Orwell", 
    category: ["Dystopian"], 
    amount: 5, 
    publicationDate: "1949-06-08", 
    price: 15, 
    discount: 5,
    rating: 36,
    numRating: 14
  },
  { 
    name: "To Kill a Mockingbird", 
    author: "Harper Lee", 
    category: ["Classic"], 
    amount: 8, 
    publicationDate: "1960-07-11", 
    price: 18, 
    discount: 0,
    rating: 50,
    numRating: 10
  },
  { 
    name: "Pride and Prejudice", 
    author: "Jane Austen", 
    category: ["Romance"], 
    amount: 6, 
    publicationDate: "1813-01-28", 
    price: 12, 
    discount: 0,
    rating: 40,
    numRating: 8
  },
  { 
    name: "The Great Gatsby", 
    author: "F. Scott Fitzgerald", 
    category: ["Classic"], 
    amount: 7, 
    publicationDate: "1925-04-10", 
    price: 14, 
    discount: 2,
    rating: 44,
    numRating: 11
  }
];


export default function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    res.status(200).json(books);
  } else if (method === 'POST') {
    const newBook = req.body;
    if(!newBook.name || !newBook.author || !newBook.category || 
       newBook.amount === undefined || !newBook.publicationDate || 
       !newBook.price || newBook.discount === undefined) {
        return res.status(400).json({ error: 'missing values' });
    }
    books.push(newBook);
    res.status(200).json(newBook);
  } else if (method === 'PUT') {
    const { name } = req.query;
    const updates = req.body;
    let index = books.findIndex(b => b.name === name);
    if(index === -1) return res.status(404).json({ error: 'book not found' });
    books[index] = { ...books[index], ...updates };
    res.status(200).json(books[index]);
  } else if (method === 'DELETE') {
    const { name } = req.query;
    let index = books.findIndex(b => b.name === name);
    if(index === -1) return res.status(404).json({ error: 'book not found' });
    const deletedBook = books[index];
    books.splice(index, 1);
    res.status(200).json({ message: 'book deleted', deletedBook });
  } else {
    res.status(405).end(); // Method not allowed
  }
}
