import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import ListBooksPage from './ListBooksPage'
import SearchBooksPage from './SearchBooksPage'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => { this.setState({ books }) })
  }

  updateShelf(book, bookshelf) {
    BooksAPI.update(book, bookshelf).then(() => { this.componentDidMount() })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooksPage
            books={this.state.books}
            onUpdateShelf={(book, bookshelf) => { this.updateShelf(book, bookshelf) }}
          />
        )} />

        <Route path='/search' render={({ history }) => (
          <SearchBooksPage
            books={this.state.books}
            onUpdateShelf={(book, bookshelf) => { this.updateShelf(book, bookshelf) }}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp