import React,{useState,useEffect} from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Moment from 'react-moment';

function Navbar() {
    const [isOpen,setIsOpen] = useState(false);
    const [currTimeDate,setCurrTimeDate] = useState(new Date());

    const clickHandler = ()=>{
        const menu = document.querySelector(".menu");
        const body = document.querySelector("body");
        // body.classList.add("blur");
        menu.classList.toggle("hide");
        menu.classList.add("anim");
        setIsOpen(flag => !flag);
    }

    const closeHandler = ()=>{
        const menu = document.querySelector(".menu");
        const body = document.querySelector("body");
        // body.classList.remove("blur");
        menu.classList.remove("anim");
        menu.classList.add("hide");
        setIsOpen(flag => !flag);
    }

    return (
            <nav>
                <h2>FDM</h2>
                <div className="right">
                    <Moment interval={5000} format={"MMMM Do YYYY, h:mm:ss a"} date={currTimeDate}></Moment>
                    {isOpen ? <button className="btn-close" onClick={closeHandler}><CloseIcon/></button> :  <button className="btn-menu" onClick={clickHandler}><MenuIcon/></button>}
                </div>
            </nav>
    )
}

export default Navbar
