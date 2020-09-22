import React from 'react';
import './App.css';

function AddFrom (props) {
const handleClick = evt => {
	const url = document.getElementById('urlinput').value;

}

const handleRadioClick = evt => {
	const type = evt.target.id;
	const urlinput = document.getElementById('urlinput');
	urlinput.value = type === 'vimeo-btn' ?  "https://vimeo.com/" : "http://www.flickr.com/"
}


  return (
    <form className="d-flex justify-content-center flex-column">
    	<div className="form-group row justify-content-center">
		  <label htmlFor="vimeo-btn" className="m-2">Video (Vimeo)</label> 
		  <input id="vimeo-btn" name="bookmark-type" onClick={handleRadioClick} type="radio"/>
	    </div> 
	    <div className="form-group row justify-content-center">
		  <label htmlFor="flickr-btn" className="m-2">Photo (Flickr)</label> 
		  <input id="flickr-btn" name="bookmark-type" onClick={handleRadioClick} type="radio"/>
	    </div> 


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
