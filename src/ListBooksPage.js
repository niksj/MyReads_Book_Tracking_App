import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


class ListBooksPage extends Component {
	
  onShelfChange(book, bookshelf) {
    if (this.props.onUpdateShelf) {
      this.props.onUpdateShelf(book, bookshelf)
    }
  }

	render() {
		const ReadingShelf = this.props.books.filter((book) => book.shelf === 'currentlyReading')
		const WantToReadShelf = this.props.books.filter((book) => book.shelf === 'wantToRead')
		const ReadShelf =  this.props.books.filter((book) => book.shelf === 'read')

		return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <BookShelf
                      booksInShelf={ReadingShelf}
                      onUpdateShelf={this.props.onUpdateShelf}
                      onHandleChange={(book, bookshelf) => {
                        this.onShelfChange(book, bookshelf)
                      }}
                    />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <BookShelf
                      booksInShelf={WantToReadShelf}
                      onUpdateShelf={this.props.onUpdateShelf}
                      onHandleChange={(book, bookshelf) => {
                        this.onShelfChange(book, bookshelf)
                      }}
                    />
                  </div>
  			          <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <BookShelf
                      booksInShelf={ReadShelf}
                      onUpdateShelf={this.props.onUpdateShelf}
                      onHandleChange={(book, bookshelf) => {
                        this.onShelfChange(book, bookshelf)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
           </div>
	  )
  }
}

export default ListBooksPage