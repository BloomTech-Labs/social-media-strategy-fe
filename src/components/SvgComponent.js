import React from "react";

const SvgComponent = (props) => {

  const icons = require('../assets/svgs.json');
  const local = String(icons[props.iconName])
  return (
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px" height="30px"> 
      <path d={local} fill='currentColor'/>
    </svg>
    
  );
};

export default SvgComponent;