/* global fetch */

import React, { Component } from 'react';
import './App.css';
import PaginatedTable from './PaginatedTable';
import AddForm from './AddForm';
import config from './config';
import Overview from './Overview';
import Update from './Update';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEmptyState: true,
      itemsPerPage: 5
    };
    this.handleAddBtn = this.handleAddBtn.bind(this);
    this.backToList = this.backToList.bind(this);
    this.showOverview = this.showOverview.bind(this);
    this.showUpdate = this.showUpdate.bind(this);
    this.displayError = this.displayError.bind(this);
    this.setKeyWords = this.setKeyWords.bind(this);
  }

  componentDidMount () {
    fetch(`${config.backendUrl}/bookmarks`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            ...this.state,
            isEmptyState: true,
            isLoaded: true,
            bookmarks: result.bookmarks,
            nbTotal: result.nbTotal
          });
        })
      .catch(error => {
        this.setState({
          ...this.state,
          isEmptyState: true,
          isLoaded: true,
          error
        });
      }
      );
  }

  /**
   * Display error
   * @param err
   */
  displayError (err) {
    const errorP = document.getElementById('errorP');
    errorP.innerText = err;
    errorP.classList.remove('d-none');
  }

  handleAddBtn () {
    this.setState({
      ...this.state,
      isEmptyState: false,
      addBookmarkPage: true
    });
  }

  backToList (reloadList) {
    this.setState({
      overviewPage: false,
      updatePage: false,
      addBookmarkPage: false,
      isEmptyState: true,
      itemsPerPage: 5
    });
    if (reloadList) {
      window.location.reload(true);
    }
  }

  showOverview (bookmark) {
    this.setState({
      ...this.state,
      isEmptyState: false,
      overviewPage: true,
      bookmark
    });
  }

  showUpdate (bookmark) {
    this.setState({
      ...this.state,
      isEmptyState: false,
      updatePage: true,
      bookmark
    });
  }

  setKeyWords (keyWords) {
    this.setState({
      ...this.state,
      isEmptyState: false,
      updatePage: true,
      keyWords
    });
  }

  render () {
    const { isEmptyState, bookmarks, error, isLoaded, nbTotal } = this.state;

    if (error) {
      return <div>Erreur: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }

    if (isEmptyState) {
      if (!bookmarks.length) {
        return <AddForm backToList={this.backToList} />;
      } else {
        return (
          <div className='App mt-2'>
            <span className='material-icons btn btn-success sticky-top m-2' onClick={this.handleAddBtn}>add</span>
            <PaginatedTable
              backToList={this.backToList}
              bookmarks={bookmarks}
              nbTotal={nbTotal}
              showOverview={this.showOverview}
              showUpdate={this.showUpdate}
              displayError={this.displayError}
            />
            <p id='errorP' className='d-none text-danger'>Erreur !</p>
          </div>
        );
      }
    } else if (this.state.addBookmarkPage) {
      return (
        <div className='App mt-2'>
          <AddForm backToList={this.backToList} />
        </div>
      );
    } else if (this.state.overviewPage) {
      return <Overview backToList={this.backToList} bookmark={this.state.bookmark} />;
    } else if (this.state.updatePage) {
      return <Update backToList={this.backToList} bookmark={this.state.bookmark} />;
    }
  }
}

export default App;
