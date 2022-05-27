import Card from "../Components/Card";
import React, { useContext } from 'react';
import { AppContext } from "../App";

function Favorites(){
const {onAddFave, faves, onAddToy
      // isProdFaved, id
      } = useContext(AppContext);


  return (
  <div className="content">
            
    <div className="contentHead">
      <h1>Мои закладки</h1>
    </div>
    
    <div className="cards">
    {faves.map((fave, index) => (
        <Card
          key={index}
          title={fave.title}
          price={fave.price}
          imageUrl={fave.imageUrl}
          id={fave.id}
          onPlus={(obj) => onAddToy(obj)} 
          onLike={(obj) => onAddFave(obj)}
          // isProdFaved= {two}

        />
      ))
    }
    </div>
      
  </div>
    )}

export default Favorites;