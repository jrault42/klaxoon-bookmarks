import React from 'react';
import { TablePagination } from 'react-pagination-table';
import config from "./config";

function PaginatedTable (props) {

  /**
   *
   * @param evt
   */
  const handleClickOverview = evt => {
    const bookmarkID = evt.target.parentElement.id;
    const bookmark = props.bookmarks.find(elem => elem._id === bookmarkID);
    props.showOverview(bookmark);
  };

  /**
   *
   * @param evt
   */
  const handleClickUpdate = evt => {
    const bookmarkID = evt.target.parentElement.id;
    const bookmark = props.bookmarks.find(elem => elem._id === bookmarkID);
    props.showUpdate(bookmark);
  };

  /**
   *
   * @param evt
   */
  const handleClickDelete = evt => {
    const bookmarkID = evt.target.parentElement.id;
    if (window.confirm('Etes-vous sûr de vouloir supprimer ce bookmark ?')) {
      fetch(`${config.backendUrl}/bookmarks/${bookmarkID}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.status === 204) {
            props.backToList(true);
          } else {
            throw new Error('Une erreur est survenue lors de la suppression.');
          }
        }).catch(err => {
        console.error(err);
        props.displayError(err.message);
      });
    }
  };

  const bookmarks = props.bookmarks.map(bookmark => {
    bookmark.actions = (<div id={bookmark._id}>
      <span onClick={handleClickOverview} className='material-icons btn'>visibility</span>
      <span onClick={handleClickUpdate} className='material-icons btn'>create</span>
      <span onClick={handleClickDelete} className='material-icons btn'>delete</span>
    </div>);
    return bookmark
  });

  const headers =  [
    'URL',
    'Titre',
    'Auteur',
    'Date de création',
    'Mots-clés',
    'Actions'
  ];

  return (
    <div>
    <TablePagination
      title="Bookmarks"
      subTitle=""
      headers={ headers }
      data={ bookmarks }
      columns="url.title.author.createDate.keyWords.actions"
      perPageItemCount={ 5 }
      prePageText='<'
      nextPageText='>'
      totalCount={ props.nbTotal }
      arrayOption={ [["keyWords", 'all', ', ']] }
    /></div>
  );
}

export default PaginatedTable;
