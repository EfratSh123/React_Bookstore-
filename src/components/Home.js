import React from 'react';
function Home() {
    return (
    <>
    <div style={{
    backgroundColor: 'rgb(255, 255, 255)', // צבע רקע לבן
    padding: '2cm',                     // רווח של 2 ס"מ מכל צד
    borderRadius: '10px'                // פינות מעוגלות בעדינות (אפשר לשנות את הערך)
}}>
        <h1>Books Home Page</h1>
        <br/>
        <h3>
            📕Here you can see the selection of books we have to offer.<br/><br/>
            ⭐Did you like a book? Rate it<br/><br/>
            ➕Want to add a book to the database? Click the Add button
        </h3>
    </div>

    </>
    )
    }
    export default Home;