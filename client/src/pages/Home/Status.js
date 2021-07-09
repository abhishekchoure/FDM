import React,{useState,useEffect} from 'react'
import "./Status.scss";
import axios from "axios";
import Loader from './Loader';
import CountUp from 'react-countup';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function Status() {
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    let totalP = 0;
    let totalM = 0;
    let totalI = 0;

    const getTotalInvestment = ()=>{
        setIsLoading(true);
        axios.get("http://localhost:3001/api/fd/total")
        .then((data)=>{
            setData(data.data.results);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(()=>{
        getTotalInvestment();
    },[]);

    if(data.length > 0){
        totalP = data.reduce((accumulator,currVal) => {
            return accumulator + currVal.principal
        },0);
        totalM = data.reduce((accumulator,currVal) => {
            return accumulator + currVal.maturity
        },0);
        totalI = totalM - totalP;
    }

    return (
        <>
            <div className="status-header">
                <h1>Your Current Position</h1>
                <button className="btn-refresh" onClick={getTotalInvestment}><RefreshIcon/></button>
            </div>
            <div className="status-box">
                {isLoading ? <Loader/> : null}
                {data.length > 0 ?  
                    <>   
                        <div className="box">
                            <h3>Total FD's</h3>
                            <p><CountUp end={data.length}/></p>
                        </div>
                        <div className="box">
                            <h3>Total Investment</h3>
                            <p>&#8377; <CountUp  end={totalP} duration={0.5}/></p>
                        </div>
                        <div className="box">
                            <h3>Total Maturity</h3>
                            <p>&#8377; <CountUp  end={totalM} duration={0.5}/></p>
                        </div>
                        <div className="box">
                            <h3>Total Interest Earned</h3>
                            <p>&#8377; <CountUp  end={totalI} duration={0.5}/></p>
                        </div>
                    </>
                : null}
            </div>
            <div className="quick-links">
                <div className="link-container">
                    <Link to="/add">Add a Fixed Deposit <ArrowForwardIcon className="arrow-forward"/></Link>
                </div>
                <div className="link-container">
                    <Link to="/manage">Your Deposits  <ArrowForwardIcon className="arrow-forward"/></Link>
                </div>               
            </div>
        </>
    )
}

export default Status
