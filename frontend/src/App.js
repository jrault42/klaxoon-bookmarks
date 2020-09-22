import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import AddForm from './AddForm';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { };
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
  }

   componentDidMount() {
    fetch('http://localhost:8080/bookmarks')
      .then(res => res.json())
      .then(
        (bookmarks) => {
          this.setState({
            isLoaded: true,
            bookmarks
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  handleAddBookmark (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    console.log('TU AS CLIQUE SUR LE BOUTON AjOUTER !');
    this.setState({
      ...this.state,
      addBookmark: true
    });
  }

  render () {
    const {bookmarks, error, isLoaded} = this.state;
      if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (this.state.addBookmark) {
      return (
        <div className='App mt-2'>
         <AddForm></AddForm>
        </div>
      );
    } else if (!bookmarks.length) {
        return <AddForm></AddForm>
    } else {
        return (
        <div className='App mt-2'>
          <button className='btn btn-success m-2' onClick={this.handleAddBookmark}>Ajouter</button>
          <Table bookmarks={this.state.bookmarks} />,
        </div>
      );
    }
  }
}

export default App;
