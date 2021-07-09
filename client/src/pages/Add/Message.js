import React from 'react'
import "./Message.scss"
import CloseIcon from '@material-ui/icons/Close';

const closeHandler = ()=>{
    let box = document.querySelector(".message-box");
    box.classList.add("hide");
}

function Message(props) {
    return (
        <div className="message-box">
            <button onClick={()=> closeHandler()} ><CloseIcon /></button>
            <h2>✔ Successfull</h2>
            <p>{props.msg}</p>
        </div>
    )
}

export default Message
