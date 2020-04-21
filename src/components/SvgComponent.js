import React from "react";

const SvgComponent = props => {
  const icons = require("../assets/svgs.json"); // import paths for svg icons
  const local = String(icons[props.iconName]); // set choice to be passed via props
  return (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="30px"
      height="30px"
    >
      <path d={local} fill="currentColor" />
    </svg>
  );
};

export default SvgComponent;
