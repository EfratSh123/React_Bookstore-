let books = [
  {
    name: "Elections 2021",
    author: "Sara Cohen",
    category: ["adults"],
    amount: 35,
    publicationDate: "2021-05-25",
    price: 80,
    discount: 30,
    rating: 16,
    numRating: 10
  },
  {
    name: "Duplicatim",
    author: "Ayala Levi",
    category: ["comics", "childrens"],
    amount: 22,
    publicationDate: "2022-06-10",
    price: 67,
    discount: 20,
    rating: 20,
    numRating: 6
  },
  {
    name: "The king",
    author: "Sara Cohen",
    category: ["teens", "cooking"],
    amount: 0,
    publicationDate: "2022-07-27",
    price: 82,
    discount: 50,
    rating: 5,
    numRating: 20
  },
  {
    name: "Hello world",
    author: "Lea Kisner",
    category: ["childrens"],
    amount: 5,
    publicationDate: "2023-11-11",
    price: 55,
    discount: 0,
    rating: 50,
    numRating: 15
  },
  {
    name: "My Shabbos",
    author: "David Levy",
    category: ["childrens"],
    amount: 18,
    publicationDate: "2023-03-10",
    price: 75,
    discount: 10,
    rating: 40,
    numRating: 14
  },
  {
    name: "The Golden Key",
    author: "Rachel Shtern",
    category: ["fantasy", "childrens"],
    amount: 40,
    publicationDate: "2022-09-05",
    price: 50,
    discount: 5,
    rating: 3.9,
    numRating: 22
  },
  {
    name: "Open the door",
    author: "Ben Zion",
    category: ["history", "adults"],
    amount: 12,
    publicationDate: "2021-12-20",
    price: 90,
    discount: 20,
    rating: 4.6,
    numRating: 16
  },
  {
    name: "The Winner",
    author: "Shira Kaplan",
    category: ["cooking", "adults"],
    amount: 28,
    publicationDate: "2024-01-01",
    price: 65,
    discount: 15,
    rating: 4.3,
    numRating: 11
  },
  {
    name: "Easy Code",
    author: "Moshe Klein",
    category: ["adults"],
    amount: 20,
    publicationDate: "2023-07-15",
    price: 70,
    discount: 0,
    rating: 4.0,
    numRating: 9
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
