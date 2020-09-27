import React from 'react';

function Overview (props) {
  const {type, title, url, width, height} = props.bookmark;

  let content;
  if (type === 'photo') {
    content = (<img alt='visuel' src={url} width={width} height={height}/>)
  } else if (type === 'video') {
    content = (<><p className='m-2'>Durée : {props.bookmark.duration}</p>
      <iframe src={url} width={width} height={height} frameBorder="0"  title={title}/></>)
  }
  return (
    <div className='d-flex justify-content-center flex-column'>
      <span className="material-icons btn" onClick={props.backToList}>arrow_back</span>
      <h2 className='m-2'>{title}</h2>
      {content}
    </div>
  );
}

export default Overview;
