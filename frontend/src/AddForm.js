import React from 'react';
import './App.css';
import config from './config';

function AddFrom (props) {
  const handleClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    const encodedUrl = encodeURIComponent(document.getElementById('urlinput').value);

    if (!encodedUrl.includes('vimeo.com') && !encodedUrl.includes('flickr.com')) {
      // todo: display error bad url (only flickr or vimeo)
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
          props.added();
        } else {
          throw new Error('Response status not good! Add failed.');
        }
      }).catch(err => console.error(err));
  };

  return (
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

  );
}

export default AddFrom;
