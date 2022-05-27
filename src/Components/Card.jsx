import React from 'react';
import ContentLoader from 'react-content-loader';
import {AppContext}  from '../App';
import {useContext} from "react";

function Card({id, title, price, imageUrl, onPlus, onLike, loading=false}){
const {isProdAdded} = useContext(AppContext);
const {isProdFaved} = useContext(AppContext);

const sub = {title, price, imageUrl, id, parentId: id};

const onClickPlus = () => {
onPlus(sub);
};

const onClickFave = () => {
onLike(sub);

}


    return(
        <div className="card">
              {
                loading ? <ContentLoader 
                speed={2}
                width={600}
                height={300}
                viewBox="0 0 600 300"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb">
                <rect x="20" y="10" rx="10" ry="10" width="150" height="155" /> 
                <circle cx="158" cy="246" r="12" /> 
                <rect x="118" y="244" rx="0" ry="0" width="22" height="0" /> 
                <rect x="48" y="259" rx="0" ry="0" width="1" height="0" /> 
                <rect x="23" y="195" rx="10" ry="10" width="120" height="15" /> 
                <rect x="23" y="172" rx="10" ry="10" width="143" height="15" /> 
                <rect x="26" y="238" rx="10" ry="10" width="88" height="21" />
              </ContentLoader>:

              
              <>  
                <img className="imgcard" src={imageUrl} alt='toy'/>
                <h5>{title}</h5>
                <div>
                  <div className="cardtext">
                    <div className="bottom">
                      <span>Цена:</span><br/>
                      <b>{price} руб.</b>
                    </div>

                    <div className="icons"> 
                      
                      <div>
                  {onLike && <img  className={isProdFaved(id) ? 'onfave' : 'fave'} onClick={onClickFave} width={22} src='/fave.png' alt='fave' />}                      </div>
                      
                      <div>
                      {onPlus && <img className='plus' onClick={onClickPlus} width='22' src={isProdAdded(id) ? '/added.png' : '/plus.png'} alt='Plus'/>}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </>
          }
        </div>
    )
}

export default Card;