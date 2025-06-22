import './Book.css';
import { useState } from 'react';

function Book(props) {
  // Destructure all props for easier access
  const {
    name, 
    author, 
    amount, 
    category, 
    publicationDate, 
    price, 
    discount, 
    rating, 
    numRating,
    books,
    SetBooks,
    SetMaxRating
  } = props;
  
  // Local state for favorite status and rating interface
  const [love, setLove] = useState(false); // Track if book is favorited
  const [currentRating, setCurrentRating] = useState(1); // Current rating being selected
  const [showRatingControls, setShowRatingControls] = useState(false); // Show/hide rating interface
  
  // New state for inventory management
  const [showInventoryControls, setShowInventoryControls] = useState(false); // Show/hide inventory interface
  const [inventoryInput, setInventoryInput] = useState(''); // Track inventory input value
  
  // Calculate average rating for display
  const averageRating = numRating > 0 ? (rating / numRating).toFixed(1) : 0;
  // Calculate discounted price
  const discountedPrice = price * (100 - discount) / 100;

  // Handle submitting a new rating
  const handleRateBook = () => {
    // Create updated books array with new rating
    const updatedBooks = books.map(item => {
      if (item.name === name) {
        const newNumRating = item.numRating + 1; // Increment number of ratings
        const newRating = item.rating + currentRating; // Add new rating to total
        return {
          ...item,
          numRating: newNumRating,
          rating: newRating,
        };
      }
      return item; // Return unchanged books
    });

    // Update the main books state
    SetBooks(updatedBooks);

    // Update top rated books list
    const sortedBooksForMaxRating = [...updatedBooks].sort((a, b) => {
      const avgA = a.numRating > 0 ? a.rating / a.numRating : 0;
      const avgB = b.numRating > 0 ? b.rating / b.numRating : 0;
      return avgB - avgA; // Sort by average rating descending
    });
    SetMaxRating(sortedBooksForMaxRating.slice(0, 3)); // Keep top 3
    setShowRatingControls(false); // Hide rating interface
  };

  // Handle updating inventory
  const handleUpdateInventory = () => {
    const quantityToAdd = parseInt(inventoryInput);
    
    // Validate input
    if (isNaN(quantityToAdd) || quantityToAdd <= 0) {
      alert('Please enter a valid positive number');
      return;
    }

    // Create updated books array with new inventory
    const updatedBooks = books.map(item => {
      if (item.name === name) {
        return {
          ...item,
          amount: item.amount + quantityToAdd, // Add to existing inventory
        };
      }
      return item; // Return unchanged books
    });

    // Update the main books state
    SetBooks(updatedBooks);
    
    // Reset inventory controls
    setInventoryInput('');
    setShowInventoryControls(false);
    
    // Show success message
    console.log(`Added ${quantityToAdd} units to ${name} inventory`);
  };

  // Handle book deletion
  const handleDeleteBook = () => {
    // Show confirmation alert
    const confirmed = window.confirm("Are you sure that you want to delete this book?");
    
    if (confirmed) {
      // Create updated books array without the current book
      const updatedBooks = books.filter(item => item.name !== name);
      
      // Update the main books state
      SetBooks(updatedBooks);
      
      // Update top rated books list
      const sortedBooksForMaxRating = [...updatedBooks].sort((a, b) => {
        const avgA = a.numRating > 0 ? a.rating / a.numRating : 0;
        const avgB = b.numRating > 0 ? b.rating / b.numRating : 0;
        return avgB - avgA; // Sort by average rating descending
      });
      SetMaxRating(sortedBooksForMaxRating.slice(0, 3)); // Keep top 3
      
      // Show success message
      console.log(`Book "${name}" has been deleted successfully`);
    }
  };

  // Handle inventory input change
  const handleInventoryInputChange = (e) => {
    const value = e.target.value;
    // Only allow positive numbers
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) > 0)) {
      setInventoryInput(value);
    }
  };

  // Format publication date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render star rating display
  const renderStars = (rating, interactive = false) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a partial star

    // Generate star elements
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        // Full star
        stars.push(
          <span 
            key={i} 
            className={`star ${interactive ? 'interactive' : ''}`}
            onClick={interactive ? () => setCurrentRating(i) : undefined}
          >
            ⭐
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Half star (though not currently used in logic)
        stars.push(<span key={i} className="star half">⭐</span>);
        
      } else {
        // Empty star
        stars.push(
          <span 
            key={i} 
            className={`star empty ${interactive ? 'interactive' : ''}`}
            onClick={interactive ? () => setCurrentRating(i) : undefined}
          >
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className={`book-card ${love ? 'favorite' : ''} ${amount <= 0 ? 'out-of-stock' : ''}`}>
      {/* Header section with title, author, and favorite button */}
      <div className="book-header">
        <div className="book-title-section">
          <h2 className="book-title">{name}</h2>
          <p className="book-author">by {author}</p>
        </div>
        <button 
          className={`favorite-btn ${love ? 'active' : ''}`}
          onClick={() => setLove(!love)}
          disabled={amount <= 0} // Disable for out of stock books
        >
          {love ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Book details section */}
      <div className="book-details">
        {/* Categories display */}
        <div className="detail-row">
          <span className="detail-label">Categories:</span>
          <div className="categories">
            {category.map((cat, index) => (
              <span key={cat || index} className="category-tag">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Stock information with conditional styling and inventory management */}
        <div className="detail-row">
          <span className="detail-label">Stock:</span>
          <div className="stock-section">
            <span className={`stock-amount ${amount <= 0 ? 'out-of-stock' : amount < 10 ? 'low-stock' : ''}`}>
              {amount > 0 ? `${amount} available` : 'Out of stock'}
            </span>
            
            {/* Inventory management controls */}
            <div className="rating-controls">
              {!showInventoryControls ? (
                // Show update inventory button
                <button 
                  className="rate-btn"
                  onClick={() => setShowInventoryControls(true)}
                >
                  Update Inventory
                </button>
              ) : (
                // Show inventory input interface
                <div className="rating-input">
                  <input
                    type="text"
                    value={inventoryInput}
                    onChange={handleInventoryInputChange}
                    placeholder="Enter quantity"
                    className="quantity-input"
                    maxLength="4"
                  />
                  <div className="rating-actions">
                    <button 
                      className="rate-submit-btn" 
                      onClick={handleUpdateInventory}
                      disabled={!inventoryInput || inventoryInput === '0'}
                    >
                      OK
                    </button>
                    <button 
                      className="rate-cancel-btn"
                      onClick={() => {
                        setShowInventoryControls(false);
                        setInventoryInput('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Publication date */}
        <div className="detail-row">
          <span className="detail-label">Published:</span>
          <span>{formatDate(publicationDate)}</span>
        </div>

        {/* Price section with discount handling */}
        <div className="price-section">
          <div className="price-row">
            {discount > 0 ? (
              <>
                <span className="original-price">₪{price}</span>
                <span className="discounted-price">₪{discountedPrice.toFixed(2)}</span>
                <span className="discount-badge">{discount}% OFF</span>
              </>
            ) : (
              <span className="price">₪{price}</span>
            )}
          </div>
        </div>

        {/* Rating section */}
        <div className="rating-section">
          {/* Current rating display */}
          <div className="current-rating">
            <div className="stars">
              {renderStars(parseFloat(averageRating))}
            </div>
            <span className="rating-text">
              {averageRating} ({numRating} review{numRating !== 1 ? 's' : ''})
            </span>
          </div>

          {/* Rating controls - only show for in-stock books */}
          {amount > 0 && (
            <div className="rating-controls">
              {!showRatingControls ? (
                // Show rating button
                <button 
                  className="rate-btn"
                  onClick={() => setShowRatingControls(true)}
                >
                  Rate this book
                </button>
              ) : (
                // Show rating interface
                <div className="rating-input">
                  <div className="rating-stars">
                    {renderStars(currentRating, true)}
                  </div>
                  <div className="rating-actions">
                    <button className="rate-submit-btn" onClick={handleRateBook}>
                      Rate
                    </button>
                    <button 
                      className="rate-cancel-btn"
                      onClick={() => setShowRatingControls(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons section */}
      <div className="book-actions">
        <button 
          className={`add-to-cart-btn ${amount <= 0 ? 'disabled' : ''}`}
          disabled={amount <= 0}
          onClick={() => console.log("Added to cart successfully")}
        >
          {amount > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
        
        {/* Delete book button with spacing */}
        <button 
          className="rate-btn delete-btn"
          onClick={handleDeleteBook}
          style={{ marginTop: '15px' }}
        >
          Delete Book
        </button>
      </div>
    </div>
  );
}

export default Book;