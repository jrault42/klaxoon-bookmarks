import React from 'react';
import config from "./config";

function TableItem (props) {
  const {url, title, author, createDate, keyWords} = props.bookmark;

  const handleClickOverview = () => {
    props.showOverview(props.bookmark);
  };

  const handleClickUpdate = () => {
    props.showUpdate(props.bookmark);
  };

  const handleClickDelete = () => {
    if (window.confirm('Etes-vous sûr de vouloir supprimer ce bookmark ?')) {
      fetch(`${config.backendUrl}/bookmarks/${props.bookmark.type}/${props.bookmark._id}`,
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


  return (
    <tr>
      <td>{url}</td>
      <td>{title}</td>
      <td>{author}</td>
      <td>{createDate}</td>
      <td>
        <span id='overview-btn' onClick={handleClickOverview} className="material-icons btn">visibility</span>
      </td>
      <td>{keyWords}</td>
      <td>
        <span id='update-btn' onClick={handleClickUpdate} className="material-icons btn">create</span>
        <span id='delete-btn' onClick={handleClickDelete} className="material-icons btn">delete</span>
      </td>
    </tr>
  );
}

export default TableItem;
