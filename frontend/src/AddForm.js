import React from 'react';
import './App.css';
import config from './config';

function AddFrom (props) {

  /**
   * Display error
   * @param evt
   */
  const handleClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    const encodedUrl = encodeURIComponent(document.getElementById('urlinput').value);

    if (!encodedUrl.includes('vimeo.com') && !encodedUrl.includes('flickr.com')) {
      displayError('URL non acceptée. Vous ne pouvez ajouter un lien que de flickr.com ou vimeo.com.');
      return;
    }
    fetch(`${config.backendUrl}/bookmarks`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookmarkUrl: encodedUrl })
      })
      .then(res => {
        if (res.status === 201) {
          props.backToList(true);
        } else {
          throw new Error('Une erreur est survenue.');
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
    <>
      <span className="material-icons btn" onClick={props.backToList}>arrow_back</span>
      <h2 className='m-2'>Créer un bookmark</h2>
      <form className='d-flex justify-content-center flex-column'>
        <div className='form-group row justify-content-center'>
          <p className='m-2'>Renseignez l'url d'une photo (flickr.com) ou d'une vidéo (vimeo.com).</p>
        </div>

        <div className='form-group row justify-content-center'>
          <label htmlFor='urlinput' className='m-2'>URL</label>
          <input id='urlinput' type='text' />
        </div>
        <div className='d-flex form-group justify-content-center'>
          <button className='btn btn-success' onClick={handleClick}>Valider</button>
        </div>
      </form>
      <p id='errorP' className='d-none text-danger'>Erreur !</p>
    </>
  );
}

export default AddFrom;
