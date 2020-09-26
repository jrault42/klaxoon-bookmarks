import React from 'react';

function TableItem (props) {
  const bookmark = props.bookmark;
  return (
    <tr>
      <td>{bookmark.json.url}</td>
      <td>{bookmark.json.title}</td>
      <td>{bookmark.json.author_name}</td>
      <td>{bookmark.createDate}</td>
      <td>
        <button className='btn btn-primary m-2'>Modifier</button>
        <button className='btn btn-danger m-2'>Supprimer</button>
      </td>
    </tr>
  );
}

export default TableItem;
