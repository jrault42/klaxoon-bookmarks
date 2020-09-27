import React from 'react';

function TableItem (props) {
  const {url, title, author, createDate, keyWords} = props.bookmark;

  const handleClickOverview = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    console.log("COUCOU")
  };

  return (
    <tr>
      <td>{url}</td>
      <td>{title}</td>
      <td>{author}</td>
      <td>{createDate}</td>
      <td>
        <span onClick={handleClickOverview} className="material-icons btn">visibility</span>
      </td>
      <td>{keyWords}</td>
      <td>
        <span className="material-icons btn">create</span>
        <span className="material-icons btn">delete</span>
      </td>
    </tr>
  );
}

export default TableItem;
