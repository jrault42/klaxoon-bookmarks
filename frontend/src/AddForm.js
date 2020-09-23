import React from 'react';
import './App.css';

function AddFrom (props) {
const handleClick = evt => {
	evt.preventDefault()
	evt.stopPropagation()
	const url = document.getElementById('urlinput').value;
	const encodedUrl = encodeURIComponent(document.getElementById('urlinput').value);

	let urlToGet = '';
	if (url.startsWith('https://www.vimeo.com/')) {
		urlToGet =`https://vimeo.com/api/oembed.json?url=${encodedUrl}`
	} else if (url.startsWith('https://www.flickr.com/')) {
		urlToGet = `https://www.flickr.com/services/oembed/?format=json&url=${encodedUrl}`
	} else {
		// todo: display error bad url (only flickr or vimeo)
		return	
	}

}

const handleRadioClick = evt => {
	const type = evt.target.id;
	const urlinput = document.getElementById('urlinput');
	urlinput.value = type === 'vimeo-btn' ?  "https://www.vimeo.com/" : "http://www.flickr.com/"
}


  return (
    <form className="d-flex justify-content-center flex-column">
    	<div className="form-group row justify-content-center">
    	<div className="m-2 row justify-content-center">
		  <label htmlFor="vimeo-btn" className="m-2">Video (Vimeo)</label> 
		  <input id="vimeo-btn" name="bookmark-type" onClick={handleRadioClick} type="radio"/>
	    </div> 
	    <div className="m-2 row justify-content-center">
		  <label htmlFor="flickr-btn" className="m-2">Photo (Flickr)</label> 
		  <input id="flickr-btn" name="bookmark-type" onClick={handleRadioClick} type="radio"/>
	    </div> </div> 


	    <div className="form-group row justify-content-center">
		  <label htmlFor="urlinput" className="m-2">URL</label> 
		  <input id="urlinput" type="text"/>
	    </div> 
	    <div className="d-flex form-group justify-content-center">     
	      <button className="btn btn-success" onClick={handleClick}>Valider</button>
	    </div> 
    </form>
  );
}

export default AddFrom;
