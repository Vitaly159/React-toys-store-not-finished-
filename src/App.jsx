import axios from 'axios';
import React, { createContext, useState } from 'react';
import Header from './Components/Header';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import ShadowBlock from './Components/cart/ShadowBlock';
import { Route, Routes } from "react-router-dom";
import Orders from './Pages/Orders';

export const AppContext = createContext({});

function App() {
  
  const [openShadow, setOpenShadow] = useState(false);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [prods, setProds] = useState([]);
  const [faves, setFaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [iOrdered, setIOrdered] = useState([]);

  const total = items.reduce((sum, obj) => Number(obj.price) + Number(sum), 0);

  // const [prods, setProds] = useState([
  // {"id": "1","title": "Мишка с бантиком", "price": "1 999", "imageUrl": "/toy1.png"},
  // {"id": "2","title": "Розовый мишка", "price": "2 999", "imageUrl": "/toy.jpg"},
  // {"id": "3","title": "Мишка с бантиком", "price": "2 499", "imageUrl": "/toy2.png"},
  // {"id": "4","title": "Мишка Love", "price": "1 999", "imageUrl": "/toy3.png"},
  // {"id": "5","title": "Мишка с бантиком", "price": "1 999", "imageUrl": "/toy1.png"},
  // {"id": "6","title": "Розовый мишка", "price": "2 999", "imageUrl": "/toy.jpg"},
  // {"id": "7","title": "Мишка с бантиком", "price": "2 499", "imageUrl": "/toy2.png"},
  // {"id": "8","title": "Мишка Love", "price": "1 999", "imageUrl": "/toy3.png"}
  // ]);
  
  React.useEffect(() => {
    async function fetchData() {
      try {
      
        const itemResponse = await axios.get('https://61e84dcfe32cd90017acc1c6.mockapi.io/item');
          
        const favesResponse = await axios.get('https://61e84dcfe32cd90017acc1c6.mockapi.io/faves');
          
        const toysResponse = await axios.get('https://61e84dcfe32cd90017acc1c6.mockapi.io/toys');

        setIsLoading(false);   
        setItems(itemResponse.data);
        setFaves(favesResponse.data);
        setProds(toysResponse.data);

        }
          catch(error){
            alert('Ошибка');
        }
    }
    fetchData();
  
  }, []);

  const onAddToy = async (item) => {
      try{
        const findItem = items.find((obj) => Number(obj.parentId) === Number(item.id));
        if (findItem){
          setItems((prev) => prev.filter((obj) => Number(obj.parentId) !== Number(item.id)));
          await axios.delete(`https://61e84dcfe32cd90017acc1c6.mockapi.io/item/${findItem.id}`);
        } else {
        setItems([...items, item]);
        const {data} = await axios.post('https://61e84dcfe32cd90017acc1c6.mockapi.io/item', item);
        setItems ((prev) => prev.map(obj => {
          if (obj.parentId === data.parentId){
            return {
              ...obj,
              id: data.id
            };
          }
          return obj;
        }));
      }
    }catch(error){
      alert('Ошибка');
    }
  };

  const Searching = function(event){
    setSearchValue(event.target.value);
  }

  const remove = (id)=>{
    axios.delete(`https://61e84dcfe32cd90017acc1c6.mockapi.io/item/${id}`);
    setItems(items.filter((item)=>Number(item.id)!==Number(id)));
  }


  const removee = (id)=>{
    axios.delete(`https://61e84dcfe32cd90017acc1c6.mockapi.io/faves/${id}`);
    setFaves(faves.filter((fave)=>Number(fave.id)!==Number(id)));
  }

const onAddFave = async (item) => {

  try{
    if(faves.find((fave) => Number(fave.id) === Number(item.id))){
    axios.delete(`https://61e84dcfe32cd90017acc1c6.mockapi.io/faves/${item.id}`);
    setFaves((prev) => prev.filter((fave)=>Number(fave.id)!==Number(item.id)));

    }else{

    const {data} = await axios.post('https://61e84dcfe32cd90017acc1c6.mockapi.io/faves', item);
    setFaves((prev) => [...prev, data]);

  }
 }
catch (error){
  alert('Ошибка');
}}

const isProdAdded = (id) => {
  return items.some(obj => Number(obj.parentId) === Number(id));
}

const isProdFaved = (id) => {
  return faves.some(fave => Number(fave.parentId) === Number(id));
}


 return (
  <AppContext.Provider value={{items, setItems, faves, prods, isProdAdded, isProdFaved, onAddFave, total, iOrdered, setIOrdered}}>
   
    
    <div className="wrapper">
         <ShadowBlock items={items} onClickClose={()=> setOpenShadow(false)} opened={openShadow} onRemove={remove}/>
          <Header onClickOpen={()=> setOpenShadow(true)} />

    <Routes>
              <Route path="/" element={
                  <Home 
                  Searching={Searching}
                  searchValue={searchValue}
                  prods={prods}
                  onAddToy={onAddToy}
                  onAddFave={onAddFave}
                  items={items}
                  faves={faves}
                  isLoading={isLoading}
                />} />

              <Route path="/favorites" element={
                  <Favorites onRemove={remove} onRemovee={removee}/>} 
              />

              <Route path="/orders" element={
                  <Orders />} 
              />
    </Routes>

    </div>
  
  </AppContext.Provider>
  );
}

export default App;
