import './MaxRatingArray.css';

function MaxRatingCom(props) {
  const { maxRating } = props;

  if (!maxRating || maxRating.length === 0) {
    return null;
  }

  const renderStars = (rating, numRating) => {
    const averageRating = numRating > 0 ? rating / numRating : 0;
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star">⭐</span>);
        
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half">⭐</span>);
        
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
        
      }
    }
    return stars;
  };

  return (
    <div className="top-rated-section">
      <div className="top-rated-header">
        <h2>🏆 Top Rated Books</h2>
        <p>Our customers' favorites</p>
      </div>
      
      <div className="top-rated-books">
        {maxRating.map((book, index) => {
          const averageRating = book.numRating > 0 ? (book.rating / book.numRating).toFixed(1) : 0;
          
          return (
            <div key={`${book.name}-${index}`} className={`top-book rank-${index + 1}`}>
              <div className="rank-badge">#{index + 1}</div>
              <div className="book-info">
                <h3 className="book-name">{book.name}</h3>
                <p className="book-author">by {book.author}</p>
                <div className="rating-display">
                  <div className="stars">
                    {renderStars(book.rating, book.numRating)}
                  </div>
                  <span className="rating-text">
                    {averageRating} ({book.numRating} review{book.numRating !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MaxRatingCom;