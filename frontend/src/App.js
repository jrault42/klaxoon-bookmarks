import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import AddForm from './AddForm';
class App extends Component {
  constructor (props) {
    super(props);
    this.state = { };
    this.bookmarks = [
      {
        id: '0',
        url: 'titi0',
        author: 'titi0',
        title: 'titi0',
        createDate: 'titi0'
      },
      {
        id: '1',
        url: 'titi1',
        author: 'titi1',
        title: 'titi1',
        createDate: 'titi1'
      }
    ];

    this.handleAddBookmark = this.handleAddBookmark.bind(this);
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
    console.log("COUCOU", this.state)
    if (this.state.addBookmark) {
      return (
        <div className='App mt-2'>
         <AddForm></AddForm>
        </div>
      );
    } else {
        return (
        <div className='App mt-2'>
          <button className='btn btn-success m-2' onClick={this.handleAddBookmark}>Ajouter</button>
          <Table bookmarks={this.bookmarks} />,
        </div>
      );
    }
  }
}

export default App;
