import React from 'react';

function Overview (props) {

  return (
    <img alt='visuel' src={props.url} width={props.width} height={props.height}/>
  );
}

export default Overview;
