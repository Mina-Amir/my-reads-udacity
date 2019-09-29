import React from 'react'
import Book from '../Book/Book'


const Shelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.filter(book => book.shelf === props.shelf)
                .map(book => (
                    <Book updateBook={props.updateBook} key={book.id} book={book} bookShelf={book.shelf}/>
                ))
                }
            </ol>
            </div>
        </div>
    )
}

export default Shelf