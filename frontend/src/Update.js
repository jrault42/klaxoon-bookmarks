/* global fetch */

import React from 'react';
import config from './config';

function Update (props) {
  /**
   *
   * @param evt
   */
  const handleClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    const keyWords = document.getElementById('keywords-input').value.split(' ');
    const overwrite = document.getElementById('overwrite').checked;

    fetch(`${config.backendUrl}/bookmarks/${props.bookmark._id}?overwrite=${overwrite}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(keyWords)
      })
      .then(res => {
        if (res.status === 201) {
          props.backToList(true);
        } else {
          throw new Error('Une erreur est survenue lors de la mise à jour du bookmark.');
        }
      }).catch(err => {
        console.error(err);
        displayError(err.message);
      });
  };

  /**
   * Display error
   * @param err
   */
  const displayError = err => {
    const errorP = document.getElementById('errorP');
    errorP.innerText = err;
    errorP.classList.remove('d-none');
  };

  return (
    <div className='m-2'>
      <span className='material-icons btn' onClick={() => props.backToList(true)}>arrow_back</span>
      <h2 className='m-2'>{props.bookmark.title}</h2>
      <form>
        <div className='form-group row m-2'>
          <p className='m-2'>Ajouter des mots clés pour ce bookmark. Séparez les mots-clés par des espaces.</p>
        </div>

        <p className='m-2'>Mots clés existants : {props.bookmark.keyWords}</p>

        <div className='form-group row m-2'>
          <label htmlFor='keywords-input' className='m-2'>Mots-clés</label>
          <input id='keywords-input' type='text' />
        </div>
        <label className='btn'> <input id='overwrite' type='checkbox' /> Ecraser les mots-clés existants</label>
        <div className='d-flex form-group m-2'>
          <button className='btn btn-success' onClick={handleClick}>Valider</button>
        </div>
      </form>
      <p id='errorP' className='d-none text-danger'>Erreur !</p>
    </div>
  );
}

export default Update;
