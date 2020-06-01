import React from "react";

export default function Recommendations() {
  return (
    <div>
      <h4 style={{textAlign:"center"}}>Trending in Topic</h4>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
        <h6>#hashtag</h6>
        <h6>@handle</h6>
        <h6>keyword</h6>
      </div>
    </div>
  );
}
