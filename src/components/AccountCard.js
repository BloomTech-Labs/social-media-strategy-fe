import React from "react";


const CharacterCard = props => {
return (
    
<div className="acct-card">
    <img className="icon" src={props.image}></img>
    <h3>{props.name}</h3>
    <h5>@{props.Thandle}</h5>
    <h4>{props.location}</h4>
            <div className="all-stats">
            <div className="headers">
                <h5>Posts</h5>
                <h6>{props.posts}</h6>
            </div>
            <div className="headers">
                <h5>Following</h5>
                <h6>{props.following}</h6>
            </div>
            <div className="headers">
                <h5>Followers</h5>
                <h6>{props.followers}</h6>
            </div>
            </div>
</div>
    )
}

export default CharacterCard;
