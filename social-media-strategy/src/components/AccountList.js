// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import CharacterCard from "./AccountCard";
// import data from "./accounts.json";



// const AccountList = (props) => {
//   const [characters, setCharacters] = useState([])
//   const [filterData, updateData] = useState([])


//   // useEffect(() => {
//   //   const getCharacters = () => {
//   //     axios 
//   //     .get (`https://rickandmortyapi.com/api/character/`, {
//   //       params: {
//   //         _limit: 3
//   //       }
//   //     })
//   //     .then (res => {
//   //     setCharacters(res.data.results)
//   //     updateData(res.data.results)
//   //   })
//   //   .catch (error => {
//   //     console.log('Theres an error in the API call in Character List', error)
//   //   });
//   // }

//   // getCharacters();
//   // }, []);


//   return (
//     <section className="acct-list">
//       {filterData.map(acct => (
//         <CharacterCard 
//         key={acct.id}
//         name={acct.name}
//         tHandle={acct.name}
//         location={acct.origin.name}
//         posts={acct.status}
//         following={acct.species}
//         followers={acct.gender}
//         image={acct.image}
//         />
//       ))}
      
//     </section>
//   );
// }

// export default AccountList;