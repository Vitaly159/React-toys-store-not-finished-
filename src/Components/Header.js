import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../App';

function Header(props){
    const {total} = useContext(AppContext);

    return(
            <header>
                <Link className='sc' to="/">
                <div className="headerLeft">
                
                <img className="logo" height={60} src="/logo1.png" alt='logo'/>
                
                
                <div className="headerInfo">
                    <h3 className='header-h'>React Toys</h3>
                    <p className='header-p'>магазин плюшевых игрушек</p>
                </div>
                
                </div>
                </Link>
                
                <ul className="headerRight">
                <li className="bag" onClick={props.onClickOpen}>
                    <img  src='/bag.png' width={20} alt='bag'/>
                    <span>{total} руб.</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img className="faveItems" onClick={props.onAddFave} width={28} src='/heart.png' alt='fave'></img>
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img src='/user.png' width={22} alt='user'/>
                    </Link>
                </li>
                </ul>
            </header>
    )
}

export default Header;