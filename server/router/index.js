const express = require('express')
const db = require('../db')
const apiRouter = express.Router();


apiRouter.put('/fd/renewed',async(request,response)=>{
    try{
        const id = JSON.parse(JSON.stringify(request.body));
        let results = await db.updateRenewal(id);
        console.log(results);
        response.json({
            message:"FD renewed successfully!",
        })

    }catch(e){
        response.sendStatus(500);
        console.log(e);
    }
})

apiRouter.post('/fd/search/all',async(request,response) => {
    try{
        const term = JSON.parse(JSON.stringify(request.body));
        let results = await db.searchAll(term);
        response.json({
            deposits: results
        })
       
    }catch(error){
        console.log(error);
    }
})

apiRouter.post('/add',async(request,response,next)=>{
    try{
        const fd = JSON.parse(JSON.stringify(request.body));
        console.log(fd);
        let results = await db.addItem(fd);
        console.log(results);

        response.json({
            message:"Deposit added successfully!",
            insertId:results.insertId
        });
        
    }catch(e){
         response.sendStatus(500);
         console.log(e);
    }
 });


 apiRouter.get("/fd/expiring/:year",async(request,response)=>{
    try{
        let results = await db.getAllFDOrderByRemPeriod(request.params.year);
        response.json({
            results
        });
    }catch(e){
        response.sendStatus(500);
        console.log(e);
    }
 });


 apiRouter.get("/fd/total",async(request,response)=>{
    try{
        let results = await db.getTotalInvestment();
        response.json({
            results
        });
    }catch(e){
        response.sendStatus(500);
        console.log(e);
    }
 });


 apiRouter.delete("/fd/delete/:no",async(request,response) => {
    try{
        let results = await db.deleteFDByNo(request.params.no);
        response.json({
            message:"Deposit deleted successfully"
        });
    }catch(e){
        response.sendStatus(500);
        console.log(e);
    }
 })

 module.exports = apiRouter;