import React, { useState } from "react";
import "./AddFD.scss";
import axios from "axios";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import Message from "./Message";
const FDUtility = require("../../lib/FDUtility");



function AddFD() {
    const [no, setNo] = useState("");
    const [owner, setOwner] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [period, setPeriod] = useState("");
    const [interest, setInterest] = useState("");
    const [bank, setBank] = useState("");
    const [pFormat, setPFormat] = useState("blank");
    const [amount,setAmount] = useState(0);
    const [showMessage,setShowMessage] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [optCI,setOptCI] = useState("default");
    const [message,setMessage] = useState("");

    const resetInputFields = () => {
        setNo("");
        setBank("");
        setOwner("");
        setPeriod("");
        setInterest("");
        setPFormat("blank");
    };

    const formHandler = async(e) => {
        e.preventDefault();
        const mDate = FDUtility.generateMaturityDate(fromDate,period,pFormat);
        const mAmount = FDUtility.calcMaturityAmount(amount,period,interest,pFormat,optCI);
        const fd = {
            no: parseInt(no),
            owner: owner,
            bank: bank,
            amount:amount,
            fromDate: fromDate,
            mDate: mDate,
            period: period,
            format: pFormat,
            mAmount: mAmount,
            interest: interest,
            ci:optCI
        };
        console.log(fd);
        axios.post("http://localhost:3001/api/add",fd)
            .then((response)=>{
                console.log("/add response : ", response);
                if(response.data.insertId > 0){
                    setMessage(response.data.message)
                    setShowMessage(true)
                    let box = document.querySelector(".message-box");
                    box.classList.remove("hide");

                }
                resetInputFields();
            })
            .catch((error)=>{
                console.log(error);
            });
    };

    const selectHandler = (e) => {
        setPFormat(e.target.value);
    };

    const selectCIHandler = (e) =>{
        setOptCI(e.target.value);
    }

    const fromDateInputHandler = (e) => {
        setFromDate(e.target.value);
    };

    const periodInputHandler = (e) => {
        setPeriod(e.target.value);
    };

    const interestInputHandler = (e) => {
        setInterest(e.target.value);
    };

    const fdNoInputHandler = (e) => {
        setNo(e.target.value);
    };

    const ownerInputHandler = (e) => {
        setOwner(e.target.value);
    };

    const bankInputHandler = (e) => {
        setBank(e.target.value);
    };

    const amountInputHandler = (e) => {
        setAmount(e.target.value);
    };

    return (
        <>
        <div className="form-container">
            <h2>Add your FD details here</h2>
            <div className="error">{errorMessage}</div>
            <form className="form" onSubmit={formHandler}>
                <div className="input-group">
                    <div>
                        <label htmlFor="">FD no</label>
                        <input
                            id="fd-no"
                            type="text"
                            value={no}
                            onChange={fdNoInputHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="">FD Owner</label>
                        <input
                            id="owner"
                            type="text"
                            value={owner}
                            onChange={ownerInputHandler}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <div>
                        <label htmlFor="">Bank</label>
                        <input
                            id="bank"
                            type="text"
                            value={bank}
                            onChange={bankInputHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Amount</label>
                        <input
                            id="amount"
                            type="text"
                            value={amount}
                            onChange={amountInputHandler}
                            placeholder="in Rs"
                        />
                    </div>
                </div>
                <div className="input-group">
                    <div>
                        <label htmlFor="">From Date</label>
                        <input
                            id="from-date"
                            type="date"
                            value={fromDate}
                            onChange={fromDateInputHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Period</label>
                        <div className="input-period">
                            <input
                                id="period"
                                type="text"
                                value={period}
                                onChange={periodInputHandler}
                                placeholder="number of"
                            />
                            <select value={pFormat} onChange={selectHandler}>
                                <option value="blank">Select option</option>
                                <option value="days">days</option>
                                <option value="months">months</option>
                                <option value="years">years</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="input-group">
                    <div>
                        <label htmlFor="">Interest</label>
                        <input
                            type="text"
                            placeholder="in %"
                            value={interest}
                            onChange={interestInputHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Compound Interval</label>
                        <select value={optCI} onChange={selectCIHandler}>
                            <option value="default">Select option</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button className="btn-add" type="submit">
                        Add FD
                     </button>
                </div>
            </form>
            {showMessage ? <Message msg={message} /> : null}
        </div>
        <div className="goto-home">
            <div className="link-container">
                <Link to="/"><ArrowBackIcon className="arrow-back"/> Back to Home</Link>
            </div>
        </div>
        </>
    );
}

export default AddFD;
