import Card from "../Components/Card";
// import React, { useContext } from 'react';
// import { AppContext } from "../App";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function Orders(){

const [orders, setOrders] = useState([]);

useEffect(() => {
(async () => {

const {data} = await axios.get('https://61e84dcfe32cd90017acc1c6.mockapi.io/orders');

  setOrders(data.map((obj) => obj.items).flat());

})();
}, []);

    return (
  <div className="content">
            
    <div className="contentHead">
      <h1>Мои покупки</h1>
    </div>
    
    <div className="cards">
    {orders.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          id={item.id}
          
        />
      ))
    }
    </div>
      
  </div>
    )}

export default Orders;