import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import AddForm from './AddForm';
import config from './config';
import Overview from "./Overview";
import Update from "./Update";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { };
    this.handleAddBtn = this.handleAddBtn.bind(this);
    this.backToList = this.backToList.bind(this);
    this.showOverview = this.showOverview.bind(this);
    this.showUpdate = this.showUpdate.bind(this);
  }

  componentDidMount () {
    fetch(`${config.backendUrl}/bookmarks`)
      .then(res => res.json())
      .then(
        (bookmarks) => {
          bookmarks = bookmarks.map(bookmark => {
            bookmark.keyWords = bookmark.keyWords ? bookmark.keyWords.join(', ') : '';
            return bookmark
          });

          this.setState({
            isEmptyState: true,
            isLoaded: true,
            bookmarks
          });
        })
      .catch (error => {
          this.setState({
            isEmptyState: true,
            isLoaded: true,
            error
          });
        }
      );
  }

  handleAddBtn () {
    this.setState({
      ...this.state,
      isEmptyState: false,
      addBookmarkPage: true
    });
  };

  backToList (reloadList) {
    this.setState({
      isEmptyState: true
    });
    if (reloadList) {
      window.location.reload(true);
    }
  }

  showOverview (bookmark) {
    this.setState({
      isEmptyState: false,
      overviewPage: true,
      bookmark
    });
  }

  showUpdate (bookmark) {
    this.setState({
      isEmptyState: false,
      updatePage: true,
      bookmark
    });
  }

  render () {
    const { isEmptyState, bookmarks, error, isLoaded } = this.state;

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
              showOverview={this.showOverview}
              showUpdate={this.showUpdate}
            />
          </div>
        );
      }
    }
    else if (this.state.addBookmarkPage) {
      return (
        <div className='App mt-2'>
          <AddForm added={this.backToList}/>
        </div>
      );
    }

    else if (this.state.overviewPage) {
      return <Overview backToList={this.backToList} bookmark={this.state.bookmark}  />;
    }

    else if (this.state.updatePage) {
      return <Update backToList={this.backToList} bookmark={this.state.bookmark}  />;
    }
  }
}

export default App;
