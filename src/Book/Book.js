import React from "react"

const Book = (props) => {
    const authors = props.book.authors ? (props.book.authors.length ? (<div className="book-authors">{props.book.authors.join(", ")}</div>) : null) : null
    return(
        <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select defaultValue="move" onChange={(e) => props.updateBook(e, props.book)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                {authors}
            </div>
        </li>
    )
}


export default Book