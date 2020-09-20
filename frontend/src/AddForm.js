import React from 'react';

function AddFrom (props) {
  return (
    <form className="d-flex justify-content-center flex-column">
	    <div className="form-group row justify-content-center">
		  <label htmlFor="urlinput" className="m-2">URL</label> 
		  <input id="urlinput" type="text"/>
	    </div> 
	    <div className="d-flex form-group justify-content-center">     
	      <button className='btn btn-success' type='submit'>Valider</button>
	    </div> 
    </form>
  );
}

export default AddFrom;
