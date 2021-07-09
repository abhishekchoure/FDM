const express = require('express')
const apiRouter = require('./router')   
const app = express()
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())
app.use('/api/',apiRouter);

app.listen(process.env.PORT || '3001', ()=>{
    console.log(`Server running on port : ${process.env.PORT || '3001'}`);
});

