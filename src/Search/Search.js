import React, {Component} from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import Book from '../Book/Book'
import * as BooksAPI from '../BooksAPI'


class Search extends Component {
    state={
        books:[]
    }
    search = (e) => {
        if(e.target.value === ""){
            this.setState({books: []})
            return
        }
        BooksAPI.search(e.target.value)
        .then(response => {
            let data = response
            // console.log(data)
            this.setState({books: data})
        })
    }
    updateBook = (e, book) =>{
        // let books = [...this.state.books]
        // let bookIndex = books.findIndex(book => book.id === bookID)
        // books[bookIndex].shelf = e.target.value
        // this.setState({books: books})
        BooksAPI.update(book, e.target.value)
      }
    render() {
        const books = this.state.books.length ? (
            this.state.books.map(book => <Book key={book.id} updateBook={this.updateBook} book={book} />)
        ) : null
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input type="text" onChange={this.search.bind(this)} placeholder="Search by title or author"/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {/* {this.state.books.map(book => <Book key={book.id} updateBook={this.updateBook} book={book} />)} */}
                        {books}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search