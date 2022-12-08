const express = require("express");
const app = express();
const path = require('path');
const BP = require('body-parser');
const Joi = require('joi');
const fs = require("fs");

// nesto ovde

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'static/yogafun', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'static/yogafun')));

app.use('/send', BP.urlencoded({extended: false}));

app.post("/send", (req, res) =>{
    const shema = Joi.object().keys({
        name: Joi.string().trim().min(5).max(12).required(),
        email: Joi.string().trim().email().required(),
        phone:Joi.string().trim().pattern(/^[0-9]{3}\/?[0-9]{6,7}$/).required(),
        message: Joi.string().trim().required(),

    })
    const {error, succ} = shema.validate(req.body);
    if(error){
        res.send("Greska: " + error.details[0].message);
        return; 
    } else {
        res.send("Poruka je poslata");
    }

    res.send(req.body);
});





app.listen(8000);



