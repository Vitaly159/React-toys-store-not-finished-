import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../App";
import './Drawer.scss';

function ShadowBlock({onClickClose, onRemove, items = [], opened}){
  const {setItems, total} = useContext(AppContext);

  
  const onClickBuy = (id) => {
    axios.post('https://61e84dcfe32cd90017acc1c6.mockapi.io/orders', {items: items});
    setItems([]);
    axios.delete(`https://61e84dcfe32cd90017acc1c6.mockapi.io/item/${id}`);
  };


    return(
        <div className={opened ? 'shadow visible' : 'shadow'}>
        <div className="right">
          <h2>Корзина<img onClick={onClickClose} className="cartremBtn" src='rem.png' width={20} alt='remove'/>
          </h2>
          
          
          <div className="items">
            {items.map((obj)=>(

            <div key={obj.id} className="cartItem">
              <img className="added-toy" width={100} src={obj.imageUrl} alt='toy' />
              <div className="desc">
                  <p>{obj.title}</p>
                  <b>{obj.price} руб.</b>
              </div>
              <img className="remBtn" src='rem.png' width={20} onClick={()=>onRemove(obj.id)} alt='remove'/>
            </div>
            
            ))}
            </div>

          <div className="blockbottom">
              <span>Итого:<span className="line"> _______________________ </span></span>
              <b>{total} руб.</b>
              <button className="grnbtn" onClick={onClickBuy}>
                <span>Оформить заказ</span>
                <img src='/row.png' alt='row'/>
                
              </button>
          </div>
        </div>
      </div>
    )
}

export default ShadowBlock;