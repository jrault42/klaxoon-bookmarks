import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import AddForm from './AddForm';
import config from './config';
import Overview from "./Overview";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { };
    this.handleAddBtn = this.handleAddBtn.bind(this);
    this.backToList = this.backToList.bind(this);
    this.handleClickOverview = this.handleClickOverview.bind(this);
  }

  componentDidMount () {
    fetch(`${config.backendUrl}/bookmarks`)
      .then(res => res.json())
      .then(
        (bookmarks) => {
          this.setState({
            isEmptyState: true,
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

  handleAddBtn () {
    this.setState({
      ...this.state,
      addBookmarkPage: true,
      isEmptyState: false
    });
  };

  backToList () {
    this.setState({
      isEmptyState: true
    });
  }

  handleClickOverview (bookmark) {
    this.setState({
      isEmptyState: false,
      overviewPage: true,
      bookmark
    });
  }

  render () {
    const { isEmptyState, bookmarks, error, isLoaded, addBookmarkPage, overviewPage } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    else if (!isLoaded) {
      return <div>Loading...</div>;
    }

    if (isEmptyState) {
      if (!bookmarks.length) {
        return <AddForm added={this.backToList} />;
      } else {
        return (
          <div className='App mt-2'>
            <span className="material-icons btn btn-success sticky-top m-2" onClick={this.handleAddBtn}>add</span>
            <Table
              backToList={this.backToList}
              bookmarks={this.state.bookmarks}
              handleClickOverview={this.handleClickOverview}
            />,
          </div>
        );
      }
    }

    else if (addBookmarkPage) {
      return (
        <div className='App mt-2'>
          <AddForm added={this.backToList}/>
        </div>
      );
    }

    else if (overviewPage) {
      return <Overview backToList={this.backToList} bookmark={this.state.bookmark}  />;
    }
  }
}

export default App;
