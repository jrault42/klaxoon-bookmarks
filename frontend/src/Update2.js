/* global fetch */

import React from 'react';
import config from './config';

function Update2 (props) {
  /**
   *
   * @param evt
   */
  const handleClickValidate = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    const keyWords = document.getElementById('keywords-input').value.split(' ');
    const overwrite = document.getElementById('overwrite').checked;
    sendKeyWords(keyWords, overwrite)
      .then(res => {
        props.backToList(true);
      })

  };

  /**
   *
   * @param keyWords
   * @param overwrite
   */
  const sendKeyWords = (keyWords, overwrite) => {
    return fetch(`${config.backendUrl}/bookmarks/${props.bookmark._id}?overwrite=${overwrite}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(keyWords)
      })
      .then(res => {
        if (res.status !== 201) {
          throw new Error('Une erreur est survenue lors de la mise à jour du bookmark.');
        }
      }).catch(err => {
        console.error(err);
        displayError(err.message);
      });
  };

  /**
   *
   * @param evt
   */
  const handleClickDelete = (evt) => {
    const keyWord = evt.target.id;
    const newKeyWords = props.bookmark.keyWords.filter(item => item !== keyWord);
    props.setKeyWords(newKeyWords);
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

        <p className='m-2'>Mots clés existants :</p>
        <ul id='keyWords'>
          {props.bookmark.keyWords.map(keyword =>
            <li key={keyword}>
              {keyword}
              <span id={keyword} onClick={handleClickDelete} className='material-icons btn'>delete</span>
            </li>)}
        </ul>

        <div className='form-group row m-2'>
          <p className='m-2'>Ajouter des mots clés pour ce bookmark. Séparez les mots-clés par des espaces.</p>
        </div>

        <div className='form-group row m-2'>
          <label htmlFor='keywords-input' className='m-2'>Mots-clés</label>
          <input id='keywords-input' type='text' />
        </div>
        <label className='btn'> <input id='overwrite' type='checkbox' /> Ecraser les mots-clés existants</label>
        <div className='d-flex form-group m-2'>
          <button className='btn btn-success' onClick={handleClickValidate}>Valider</button>
        </div>
      </form>
      <p id='errorP' className='d-none text-danger'>Erreur !</p>
    </div>
  );
}

export default Update2;
