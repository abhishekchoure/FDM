import axios from 'axios';
import React,{useState,useEffect} from 'react'
import "./Manage.scss";
import DeleteIcon from '@material-ui/icons/Delete';
import Message from '../Add/Message';
import Loader from '../Home/Loader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

function Manage() {
    const [searchTerm,setsearchTerm] = useState(""); 
    const [searchResults,setSearchResults] = useState([]);
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const searchHandler = (e)=>{
        setsearchTerm(e.target.value)
    }

    const formHandler = (e) =>{
        e.preventDefault();
        setIsLoading(true)
        axios.post("http://localhost:3001/api/fd/search/all",{term:searchTerm})
        .then((result)=>{
            setSearchResults(result.data.deposits)
            setIsLoading(false)
        })
        .catch(err => console.error(err))
    }

    const deleteHandler = (fd) => {
        setIsLoading(true)
        axios.delete(`http://localhost:3001/api/fd/delete/${fd.fd_no}`)
        .then((result)=>{
            setMessage(result.data.message)
            setShowMessage(true)
            let box = document.querySelector(".message-box");
            box.classList.remove("hide");
            setSearchResults([])
            setIsLoading(false)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <div className="manage">
            {showMessage ? <Message msg={message} /> : null}
            {isLoading ? <Loader /> : null}
            <form onSubmit={formHandler} className="form-search">
                <div>
                    <input type="text" id="search" onChange={searchHandler} value={searchTerm} placeholder="Search by fd no , owner etc" />
                </div>
                <div>
                    <button type="submit">Search</button>
                </div>
            </form>
            <br/><br/>
            <div className="search-result">
                <h2>Search Results</h2><br/>
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
                        <th>Period</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {searchResults.length === 0 ? <tr><td colSpan="10">Result not found!</td></tr> : null}
                {searchResults.length !== 0 ? searchResults.map((ele)=>{
                    return(<tr key={ele.deposit_id}>
                            <td>{ele.fd_no}</td>
                            <td>{ele.bank}</td>
                            <td>{ele.owner}</td>
                            <td>&#8377; {Math.ceil(ele.amount)}</td>
                            <td>{new Date(ele.start_date).toLocaleDateString()}</td>
                            <td>{new Date(ele.maturity_date).toLocaleDateString()}</td>
                            <td>&#8377; {Math.ceil(ele.maturity_amount)}</td>
                            <td>{ele.interest}%</td>
                            <td>{ele.period + " " +  ele.p_format}</td>
                            <td><button className="btn-delete" onClick={() => deleteHandler(ele)}><DeleteIcon/></button></td>
                        </tr>);
                }) : null} 
                </tbody>
            </table>
            </div>
        </div>
        <div className="goto-home">
            <div className="link-container">
                <Link to="/"><ArrowBackIcon className="arrow-back"/> Back to Home</Link>
            </div>
        </div>
        </>
    )
}

export default Manage
