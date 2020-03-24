import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import CharacterCard from "./AccountCard";



export default function CharacterList(props) {
  // TODO: Add useState to track data from useEffect
  const [characters, setCharacters] = useState([])
  const [filterData, updateData] = useState([])

  // TODO: Add API Request here - must run in `useEffect`
  //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
  
  useEffect(() => {
    const getCharacters = () => {
      axios 
      .get (`https://rickandmortyapi.com/api/character/`, {
        params: {
          _limit: 3
        }
      })
      .then (res => {
      setCharacters(res.data.results)
      updateData(res.data.results)
    })
    .catch (error => {
      console.log('Theres an error in the API call in Character List', error)
    });
  }

  getCharacters();
  }, []);


  return (
    <section className="acct-list">
      {filterData.map(acct => (
        <CharacterCard 
        key={acct.id}
        name={acct.name}
        Thandle={acct.name}
        location={acct.origin.name}
        posts={acct.status}
        following={acct.species}
        followers={acct.gender}
        image={acct.image}
        />
      ))}
      
    </section>
  );
}

// function CharacterDetails({ character }) {
//   const { id, name, species } = character;

//   return (
//     <div>
//       <Link to = {`/characters/${id}`}>
//         <CharacterCard
//           name={name}
//           species={species}>
//         </CharacterCard>
//       </Link>
//     </div>
//   );
// }