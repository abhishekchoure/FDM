import React, {useEffect,useState}from 'react'
import "./ExpireFD.scss";
import axios from "axios";
import Loader from './Loader';
const FDUtility = require("../../lib/FDUtility");


function ExpireFD() {
    const [deposits,setDeposits] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    let filteredDeposits = null;
    const [expiredDeposits,setExpiredDeposits] = useState([]);

    const getFdByRemPeriod = ()=>{
        setIsLoading(true);
        const currYear = new Date().getFullYear();
        axios.get(`http://localhost:3001/api/fd/expiring/${currYear}`)
        .then((data)=>{
            setDeposits(data.data.results);   
            setExpiredDeposits(data.data.results.filter((ele) => ele.rem_period < 0));
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const autoRenewFD = (selectedFD)=>{
        const fd = selectedFD;
        // console.log(fd);
        let toModifyFD = {
            no:fd.fd_no,
            bank:fd.bank,
            owner:fd.owner,
            amount:fd.amount,
            mDate:fd.maturity_date,
            mAmount:fd.maturity_amount,
            fromDate:fd.start_date,
            period:fd.period,
            format:fd.p_format,
            interest:fd.interest,
            ci:fd.compound_interval
        };
        let tempDate = toModifyFD.mDate;
        let date = new Date(tempDate);
        let mDateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        const newMDate = FDUtility.generateMaturityDate(mDateString,toModifyFD.period,toModifyFD.format);
        toModifyFD.fromDate = mDateString;
        toModifyFD.mDate = newMDate;
        const newInt = prompt("Enter new interest if changed or enter 0 :");
        toModifyFD.interest = parseFloat(newInt === 0 ? toModifyFD.interest : newInt);
        toModifyFD.amount = toModifyFD.mAmount;
        toModifyFD.mAmount = FDUtility.calcMaturityAmount(toModifyFD.amount,toModifyFD.period,toModifyFD.interest,toModifyFD.format,toModifyFD.ci);
    
        
        axios.put("http://localhost:3001/api/fd/renewed", {id:fd.deposit_id})
        .then((result)=>{
            console.log(result);
            axios.post("http://localhost:3001/api/add",toModifyFD)
            .then((result)=>{
                setExpiredDeposits(expiredDeposits.map((ele)=>{
                    if(ele.deposit_id === fd.deposit_id){
                        return {...ele,renewed:true}
                    }else{
                        return ele
                    }
                }))
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(()=>{
        getFdByRemPeriod();
    },[]);

    
    filteredDeposits = deposits.filter((ele)=> ele.rem_period > 0);
    
 
    return (
        <div className="table-container">
            <div className="container-header">
                <h2>FD's soon to get expired</h2>
                {/* <button className="btn-refresh" onClick={getFdByRemPeriod}><RefreshIcon /></button> */}
            </div>
            {isLoading ? <Loader/> : null}
            <table>
                <thead>
                    <tr>
                        <th>FD no</th>
                        <th>Bank</th>
                        <th>Owner</th>
                        <th>Amount</th>
                        <th>From Date</th>
                        <th>Maturity Date</th>
                        <th>Maturity Amount</th>
                        <th>Interest</th>
                        <th>Period Remaning</th>
                    </tr>
                </thead>
                <tbody>
                {filteredDeposits.length === 0 ? <tr><td colSpan="9">No deposits getting expired</td></tr> : null}
                {deposits.length !== 0 ? filteredDeposits.map((ele)=>{
                    return(<tr key={ele.deposit_id}>
                            <td className="number">{ele.fd_no}</td>
                            <td>{ele.bank}</td>
                            <td >{ele.owner}</td>
                            <td>&#8377; {Math.ceil(ele.amount)}</td>
                            <td>{new Date(ele.start_date).toLocaleDateString()}</td>
                            <td>{new Date(ele.maturity_date).toLocaleDateString()}</td>
                            <td>&#8377; {Math.ceil(ele.maturity_amount)}</td>
                            <td>{ele.interest}%</td>
                            <td>{ele.rem_period} days</td>
                        </tr>);
                }) : null} 
                </tbody>
            </table>
            <br />
            <div className="container-header">
                <h2>FD's expired</h2>
                {/* <button className="btn-refresh" onClick={getFdByRemPeriod}><RefreshIcon /></button> */}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>FD no</th>
                        <th>Bank</th>
                        <th>Owner</th>
                        <th>Amount</th>
                        <th>From Date</th>
                        <th>Maturity Date</th>
                        <th>Maturity Amount</th>
                        <th>Interest</th>
                        <th>Period Remaning</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {expiredDeposits.length === 0 ? <tr><td colSpan="10">No deposits expired!</td></tr> : null}
                {expiredDeposits.length !== 0 ? expiredDeposits.map((ele)=>{
                    return(!ele.renewed ? <tr key={ele.deposit_id}>
                            <td>{ele.fd_no}</td>
                            <td>{ele.bank}</td>
                            <td>{ele.owner}</td>
                            <td className="number">&#8377; {Math.ceil(ele.amount)}</td>
                            <td>{new Date(ele.start_date).toLocaleDateString()}</td>
                            <td>{new Date(ele.maturity_date).toLocaleDateString()}</td>
                            <td className="number">&#8377; {Math.ceil(ele.maturity_amount)}</td>
                            <td>{ele.interest}%</td>
                            <td>{ele.rem_period} days</td>
                            <td><button className="btn-renew" onClick={()=>autoRenewFD(ele)}>Renew</button></td>
                        </tr> : null);
                }) : null} 
                </tbody>
            </table>
        </div>
    )
}

export default ExpireFD
