import React from 'react';
import TableItem from './TableItem';

function Table (props) {
  const bookmarks = props.bookmarks.map(bookmark => {
    return <TableItem
      key={bookmark._id}
      bookmark={bookmark}
      backToList={props.backToList}
      showOverview={props.showOverview}
      showUpdate={props.showUpdate}
      displayError={props.displayError}
    />;
  });

  return (
    <table className='table table-hover'>
      <thead className='sticky-top'>
        <tr>
          <th>URL</th>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Date de création</th>
          <th>Aperçu</th>
          <th>Mots-clés</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookmarks}
      </tbody>
    </table>
  );
}

export default Table;
