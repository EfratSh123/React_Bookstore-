// App.js
import './App.css';
import { Routes, Route, useParams } from 'react-router-dom'; // נוסף useParams
import Book from './components/Book';
import categories from './categories';
import { useState, useEffect } from 'react';
import AddBook from './components/AddBook';
import MaxRatingCom from './components/MaxRatingArray';
import Navigation from './components/Navigation';
import Home from './components/Home'; // ייבוא של קומפוננטת הבית
import BooksListView from './components/BooksListView'; // ייבוא הקומפוננטה החדשה
import React from 'react';

Book.defaultProps = {
  name: "anonymous", 
  author: "anonymous", 
  category: [categories.teens], 
  amount: 0, 
  publicationDate: new Date(2021, 4, 25), 
  price: 0, 
  discount: 0, 
  rating: 0, 
  numRating: 1
}

function App() {
  const [books, setBooks] = useState([]);
  const [maxRating, setMaxRating] = useState([]);
  const [showAddBook, setShowAddBook] = useState(false);

  useEffect(() => {
    (async function() {
      const res = await fetch('/api/bookList');
      const data = await res.json();
      setBooks(data);
    })()
  }, [])

  useEffect(() => {
    // עדכון 3 הספרים המדורגים ביותר בכל פעם שרשימת הספרים משתנה
    const sortedBooks = [...books].sort((a, b) => {
      const avgA = a.numRating > 0 ? a.rating / a.numRating : 0;
      const avgB = b.numRating > 0 ? b.rating / b.numRating : 0;
      return avgB - avgA;
    });
    setMaxRating(sortedBooks.slice(0, 3));
  }, [books])
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Bookstore Inventory</h1>
        <p>Manage your book collection with ease</p>
      </header>

      {/* קומפוננטת הניווט תמיד תופיע */}
      <Navigation />

      <Routes>
        {/* נתיב הבית - עמוד פשוט */}
        <Route path="/" element={<Home />} /> 
        
        {/* נתיב הספרים - מציג את כל הספרים    */}
        <Route 
          path="/books" 
          element={<BooksListView books={books} setBooks={setBooks} setMaxRating={setMaxRating} maxRating={maxRating} />} 
        />
        
        {/* ספרים נבחרים   */}
        <Route 
          path="/FeaturedBooks" 
          element={<MaxRatingCom books={books} setBooks={setBooks} setMaxRating={setMaxRating} maxRating={maxRating} />} 
        />

        {/* נתיב לספר בודד לפי שמו */}
        <Route 
          path="/books/:bookName" 
          element={<SingleBookView books={books} setBooks={setBooks} setMaxRating={setMaxRating} />} 
        />
      </Routes>

      {/* קטע הוספת ספר נשאר מחוץ ל-Routes כדי להיות גלובלי */}
      <div className="add-book-section">
        {!showAddBook ? (
          <button 
            className="add-book-trigger"
            onClick={() => setShowAddBook(true)}
          >
            📖 Click here to add a book
          </button>
        ) : (
          <div className="add-book-container">
            <AddBook 
              SetBooks={setBooks} 
              books={books} 
              onClose={() => setShowAddBook(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// קומפוננטה חדשה המציגה ספר בודד על בסיס פרמטר ה-URL
function SingleBookView({ books, setBooks, setMaxRating }) {
  const { bookName } = useParams(); // קבלת שם הספר מה-URL
  const foundBook = books.find(book => book.name === bookName); // מציאת הספר ברשימה לפי השם

  if (!foundBook) {
    return <p>Book not found!</p>; // הודעה אם הספר לא נמצא
  }

  return (
    <Book 
      {...foundBook} 
      SetBooks={setBooks} 
      books={books} 
      SetMaxRating={setMaxRating}
    />
  );
}

export default App;