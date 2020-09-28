import React from 'react';
import config from "./config";

function Update (props) {

  const handleClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    const keyWords = document.getElementById('input').value.split(' ');

    fetch(`${config.backendUrl}/bookmarks/${props.bookmark.type}/${props.bookmark._id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(keyWords)
      })
      .then(res => {
        if (res.status === 200) {
        } else {
          throw new Error('Response status not good! Update failed.');
        }
      }).catch(err => console.error(err));
  };

  return (
    <div className='m-2'>
      <span className="material-icons btn" onClick={()=> props.backToList(true)}>arrow_back</span>
      <h2 className='m-2'>{props.bookmark.title}</h2>
      <form>
        <div className='form-group row m-2'>
          <p className='m-2'>Ajouter des mots clés pour ce bookmark. Séparez les mots-clés par des espaces.</p>
        </div>

        <div className='form-group row m-2'>
          <label htmlFor='urlinput' className='m-2'>Mots-clés</label>
          <input id='input' type='text' />
        </div>
        <div className='d-flex form-group m-2'>
          <button className='btn btn-success' onClick={handleClick}>Valider</button>
        </div>
      </form>
    </div>
  );
}

export default Update;
