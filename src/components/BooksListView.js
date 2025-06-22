// components/BooksListView.js
import React from 'react';
import Book from './Book'; // ודאי שנתיב הייבוא נכון
import MaxRatingCom from './MaxRatingArray'; // ודאי שנתיב הייבוא נכון

function BooksListView({ books, setBooks, setMaxRating, maxRating }) {
  return (
    <>
      <main className="books-container">
        <div className="books-grid">
          {books.map((book, index) => (
            <Book 
              key={`${book.name}-${index}`} 
              {...book} 
              SetBooks={setBooks} 
              books={books} 
              SetMaxRating={setMaxRating}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default BooksListView;