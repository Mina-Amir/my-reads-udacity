import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './shelf/shelf'
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
  async componentDidMount(){
    const books = await BooksAPI.getAll()
    this.setState({ books })
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
                <Shelf title="Currently Reading" books={this.state.books} updateBook={this.updateBook} shelf="currentlyReading"  />
                <Shelf title="Want to Read" books={this.state.books} updateBook={this.updateBook} shelf="wantToRead"  />
                <Shelf title="Read" books={this.state.books} updateBook={this.updateBook} shelf="read"  />
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
