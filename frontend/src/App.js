import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import AddForm from './AddForm';
import config from './config';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { };
    this.handleAddBtn = this.handleAddBtn.bind(this);
  }

  componentDidMount () {
    fetch(`${config.backendUrl}/bookmarks`)
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
      );
  }

  handleAddBtn (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    console.log('TU AS CLIQUE SUR LE BOUTON AjOUTER !');
    this.setState({
      ...this.state,
      addBookmarkPage: true
    });
  }

  handleAdded = () => {
    this.setState({
      ...this.state,
      addBookmarkPage: false
    });
  };

  render () {
    const { bookmarks, error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (this.state.addBookmarkPage) {
      return (
        <div className='App mt-2'>
          <AddForm added={this.handleAdded} />
        </div>
      );
    } else if (!bookmarks.length) {
      return <AddForm added={this.handleAdded} />;
    } else {
      return (
        <div className='App mt-2'>
          <button className='btn btn-success sticky-top m-2' onClick={this.handleAddBtn}>Ajouter</button>
          <Table bookmarks={this.state.bookmarks} />,
        </div>
      );
    }
  }
}

export default App;
