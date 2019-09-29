import React, {Component} from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import Book from '../Book/Book'
import * as BooksAPI from '../BooksAPI'


class Search extends Component {
    state={
        books:[],
        reservedBooks: []
    }
    componentDidMount(){
        BooksAPI.getAll()
    .then(response => {
      let data = response
      this.setState({reservedBooks:data})
    })
    }
    search = (e) => {
        if(e.target.value === ""){
            this.setState({books: []})
            return
        }
        BooksAPI.search(e.target.value)
        .then(response => {
            let data = response
            this.setState({books: data})
        })
    }
    updateBook = (e, book) =>{
        BooksAPI.update(book, e.target.value)
      }
    render() {
        const books = this.state.books.length ? (
            this.state.books.map(book => {
                const bookShelf = this.state.reservedBooks.find(el => {
                    return el.id === book.id
                })
                if(bookShelf === undefined){
                    return <Book key={book.id} updateBook={this.updateBook} book={book} bookShelf="none" />
                }
                else{
                    return <Book key={book.id} updateBook={this.updateBook} book={book} bookShelf={bookShelf.shelf} />
                }
            })
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
                        {books}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search