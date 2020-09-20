import React from 'react';

function TableItem (props) {
  const bookmark = props.bookmark;
  return (
    <tr>
      <td>{bookmark.url}</td>
      <td>{bookmark.title}</td>
      <td>{bookmark.author}</td>
      <td>{bookmark.createDate}</td>
      <td>
        <button className='btn btn-primary m-2'>Modifier</button>
        <button className='btn btn-danger m-2'>Supprimer</button>
      </td>
    </tr>
  );
}

export default TableItem;
