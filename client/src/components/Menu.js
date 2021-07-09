import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.scss'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Menu() {
    return (
        <div className="menu hide">
            
            <ul>
                <h2 style={{color:"#aaa"}}>Menu</h2>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add a deposit</Link></li>
                <li><Link to="/manage">Your deposits</Link></li>
                <li>Logout <ExitToAppIcon style={{color:"grey"}} fontSize="large"/></li>
            </ul>
        </div>
    )
}

export default Menu
