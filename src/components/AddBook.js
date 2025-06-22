import { useState } from "react";
import categories from "../categories";
import './AddBook.css';

function AddBook(props) {
  // Form state management - stores all form field values
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    amount: '',
    publicationDate: '',
    price: '',
    discount: '',
    category: 'adults' // Default category
  });

  // Error state management - stores validation errors for each field
  const [errors, setErrors] = useState({});

  // Generic input change handler - updates form data and clears errors
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing in a field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Form validation function - checks all required fields and formats
  const validateForm = () => {
    const newErrors = {};
    
    // Check required text fields
    if (!formData.name.trim()) newErrors.name = 'Book name is required';
    if (!formData.author.trim()) newErrors.author = 'Author name is required';
    
    // Check numeric fields with validation
    if (!formData.amount || formData.amount < 0) newErrors.amount = 'Valid amount is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    
    // Check date field
    if (!formData.publicationDate) newErrors.publicationDate = 'Publication date is required';
    
    // Check discount range
    if (formData.discount < 0 || formData.discount > 100) newErrors.discount = 'Discount must be between 0-100%';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return; // Stop if validation fails

    // Create new book object with proper data types
    const newBook = {
      name: formData.name,
      author: formData.author,
      amount: parseInt(formData.amount), // Convert to number
      category: [categories[formData.category]], // Convert to array with category object
      publicationDate: new Date(formData.publicationDate), // Convert to Date object
      price: parseFloat(formData.price), // Convert to decimal number
      discount: parseInt(formData.discount) || 0, // Convert to number, default 0
      rating: 0, // Initialize rating
      numRating: 0 // Initialize rating count
    };

    // Add book to the books list
    props.SetBooks(prevBooks => [...prevBooks, newBook]);
    
    // Reset form to initial state
    setFormData({
      name: '',
      author: '',
      amount: '',
      publicationDate: '',
      price: '',
      discount: '',
      category: 'adults'
    });
    
    // Close the form
    props.onClose();
  };

  return (
    <div className="add-book-form">
      {/* Form header with title and close button */}
      <div className="form-header">
        <h2>📖 Add New Book</h2>
        <button className="close-btn" onClick={props.onClose}>✕</button>
      </div>

      <div className="form-content">
        {/* Book title input field */}
        <div className="form-group">
          <label htmlFor="name">Book Title *</label>
          <input
            id="name"
            type="text"
            placeholder="Enter book title"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={errors.name ? 'error' : ''} // Add error class if validation fails
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
          
        </div>

        {/* Author input field */}
        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            id="author"
            type="text"
            placeholder="Enter author name"
            value={formData.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
          
        </div>

        {/* Two-column layout for amount and category */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Stock Amount *</label>
            <input
              id="amount"
              type="number"
              min="0"
              placeholder="0"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className={errors.amount ? 'error' : ''}
            />
            {errors.amount && <span className="error-message">{errors.amount}</span>}
            
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              {/* Dropdown options for all available categories */}
              <option value="adults">Adults</option>
              <option value="teens">Teens</option>
              <option value="childrens">Children's</option>
              <option value="comics">Comics</option>
              <option value="cooking">Cooking</option>
              <option value="fantasy">Fantasy</option>
              <option value="history">History</option>
            </select>
          </div>
        </div>

        {/* Publication date input */}
        <div className="form-group">
          <label htmlFor="publicationDate">Publication Date *</label>
          <input
            id="publicationDate"
            type="date"
            value={formData.publicationDate}
            onChange={(e) => handleInputChange('publicationDate', e.target.value)}
            className={errors.publicationDate ? 'error' : ''}
          />
          {errors.publicationDate && <span className="error-message">{errors.publicationDate}</span>}
          
        </div>

        {/* Two-column layout for price and discount */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price (₪) *</label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01" // Allow decimal values
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
            
          </div>

          <div className="form-group">
            <label htmlFor="discount">Discount (%)</label>
            <input
              id="discount"
              type="number"
              min="0"
              max="100"
              placeholder="0"
              value={formData.discount}
              onChange={(e) => handleInputChange('discount', e.target.value)}
              className={errors.discount ? 'error' : ''}
            />
            {errors.discount && <span className="error-message">{errors.discount}</span>}
            
          </div>
        </div>

        {/* Form action buttons */}
        <div className="form-actions">
          <button className="cancel-btn" onClick={props.onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBook;