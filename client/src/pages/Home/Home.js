import React from 'react'
import Menu from '../../components/Menu';
import AddFD from '../Add/AddFD';
import ExpireFD from './ExpireFD';
import "./Home.scss";
import Navbar from './Navbar';
import Status from './Status';
import Manage from '../Manage/Manage';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Home() {
    return (
        <Router>
                <div>
                    <Navbar/>
                    <Menu/>
                    <Switch>
                        <Route path="/add">
                            <br/><br/>
                            <h1 style={{margin:"0 10rem 2rem 10rem"}}>Enter Fixed Deposit Details</h1>
                            <AddFD/> 
                        </Route>
                        <Route path="/manage">
                            <br/><br/>
                            <h1 style={{margin:"0 10rem 2rem 10rem"}}>Manage your deposits</h1>
                            <Manage/>
                        </Route>
                        <Route path="/" exact>
                            <Status/>
                            <br/><br/>
                            <h1 style={{margin:"0 10rem 2rem 10rem"}}>Current Year Stats</h1>
                            <ExpireFD/>
                        </Route>
                    </Switch>
                </div>
        </Router>
    )
}

export default Home
