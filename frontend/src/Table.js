import React from 'react';
import TableItem from './TableItem';

function Table (props) {
  const bookmarks = props.bookmarks.map((bookmark) => <TableItem key={bookmark.id} bookmark={bookmark} />);

  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>URL</th>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Date de création</th>
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
