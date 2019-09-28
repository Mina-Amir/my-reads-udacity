import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book/Book'
import {Link} from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books:[],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  componentDidMount(){
    BooksAPI.getAll()
    .then(response => {
      let data = response
      this.setState({books:data})
    })
  }

  updateBook = (e, book) =>{
    BooksAPI.update(book, e.target.value).then(response => {
      BooksAPI.getAll().then(response => {
        let data = response
        this.setState({books:data})
      })
    })
  }

  render() {
    const test = this.state.books.filter(book => book.shelf === "wantToRead")
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter(book => book.shelf === "currentlyReading")
                        .map(book => (
                          <Book updateBook={this.updateBook} key={book.id} book={book}/>
                        ))
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter(book => book.shelf === "wantToRead")
                        .map(book => (
                          <Book updateBook={this.updateBook} key={book.id} book={book}/>
                        ))
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter(book => book.shelf === "read")
                        .map(book => (
                          <Book updateBook={this.updateBook} key={book.id} book={book}/>
                        ))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
            <Link to='/search'>
              <button>Add a book</button>
            </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
