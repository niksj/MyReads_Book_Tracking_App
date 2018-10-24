import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class SearchBooksPage extends Component {
  state = {
    query: '',
    booksToSearch: [],
    queryResultsFound: false
  }

  onShelfChange(book, bookshelf) {
    if (this.props.onUpdateShelf) {
      this.props.onUpdateShelf(book, bookshelf)
      let searchBookTobeUpdated = this.state.booksToSearch
      for (let i = 0; i < this.state.booksToSearch.length; i++) {
        if (searchBookTobeUpdated[i].id === book.id) {
          searchBookTobeUpdated[i].shelf = bookshelf
        }
      }
      this.setState({ booksToSearch: searchBookTobeUpdated })
    }
  }

  searchAllBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then(booksToSearch => {
        booksToSearch.length > 0
          ? this.setState({ booksToSearch: booksToSearch, queryResultsFound: false })
          : this.setState({ booksToSearch: [], queryResultsFound: true })
        for (let i = 0; i < booksToSearch.length; i++) {
          booksToSearch[i].shelf = this.getShelfOfBook(booksToSearch[i], this.props.books)
        }
        this.setState({ booksToSearch: booksToSearch })
      })
    } else {
      this.setState({ booksToSearch: [], queryResultsFound: false })
    }
  }

  getShelfOfBook(searchBook, books) {
    for (let i = 0; i < books.length; i++) {
      if (searchBook.id === books[i].id) {
        return books[i].shelf
      }
    }
    return 'none'
  }

  updateQuery = (query) => {
    this.setState({ query })
    this.searchAllBooks(query)
  }

  render() {
    let nonAddedSearchBooks = []
    if (this.state.booksToSearch && typeof this.state.booksToSearch.filter === 'function') {
      nonAddedSearchBooks = this.state.booksToSearch.filter((searchBook) => this.getShelfOfBook(searchBook, this.props.books) !== 'none')
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              className='search-books'
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
        { (this.state.booksToSearch.length > 0) && 
          (
            <ol className="books-grid">
            <BookShelf
              booksInShelf={this.state.booksToSearch}
              onUpdateShelf={this.props.onUpdateShelf}
              onHandleChange={(book, bookshelf) => {
                this.onShelfChange(book, bookshelf)
              }}
            />
            </ol>
          )}
          { this.state.queryResultsFound && 
            (
              <b>Invalid Query :( No results found. Try again!</b>
            )}
        
        </div>
          
      </div>
    )
  }
}

export default SearchBooksPage