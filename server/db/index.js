const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    port:'3306',
    user:'root',
    password:'root123',
    database:'fdm'
});

let db ={}

db.updateRenewal = ({id})=>{
    return new Promise((resolve,reject) =>{
        const UPDATE_QUERY = "UPDATE deposits SET renewed=1 where deposit_id=?";
        const values = [[id]];
        pool.query(UPDATE_QUERY,[values],(error,result)=>{
            console.log(error);
            return resolve(result);
        })
    })
}

db.deleteFDByNo = (no) =>{
    return new Promise((resolve,reject) => {
        const DELETE_QUERY = "DELETE from deposits where fd_no = ?";
        const values = [[no]];
        pool.query(DELETE_QUERY,[values],(error,result)=>{
            console.log(error);
            return resolve(result);
        })
    })
}

db.searchAll = ({term}) => {
    return new Promise((resolve,reject) => {
        const SEARCH_QUERY = "select * from deposits where fd_no like '%" + term + "%'" +" or owner like '"+'%'+ term +'%' + "' or bank like '" + '%' + term +'%'+ "' or start_date like '" + '%' + term + '%'+ "'";
        pool.query(SEARCH_QUERY,(error,result)=>{
            return resolve(result);
        })
    })
}

db.addItem = ({no,owner,bank,amount,fromDate,mDate,period,mAmount,interest,format,ci})=>{
    return new Promise((resolve,reject) => {
        const INSERT_QUERY = "INSERT INTO deposits (fd_no,bank,owner,amount,start_date,maturity_date,interest,maturity_amount,period,p_format,renewed,compound_interval) values ?";
        const values = [[no,bank,owner,amount,fromDate,mDate,interest,mAmount,period,format,0,ci]];
        pool.query(INSERT_QUERY,[values],(error,result)=>{
            console.log(error);
            return resolve(result);
        })
    })
}

db.getAllFDOrderByRemPeriod = (year) => {
    return new Promise((resolve,reject) => {
        const SELECT_QUERY = "SELECT *,(DATEDIFF(maturity_date,CURRENT_TIMESTAMP)) AS rem_period from deposits where renewed = ? ORDER BY rem_period ";
        pool.query(SELECT_QUERY,[0],(error,result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        })
    })
}


db.getTotalInvestment = () => {
    return new Promise((resolve,reject) => {
        const SELECT_QUERY = "select fd_no,min(amount) as principal, max(maturity_amount) as maturity from deposits GROUP BY fd_no";
        pool.query(SELECT_QUERY,(error,result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        })
    })
}

module.exports = db;