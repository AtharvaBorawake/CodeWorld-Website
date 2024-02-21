const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const db = "mongodb+srv://atharvaborawake210:MongoDBAtharva210@atharvaeventhub.qvy2ymg.mongodb.net/?retryWrites=true&w=majority";
const EventModel = require('../models/Event');
const specialModel = require('../models/special');

mongoose.Promise = global.Promise;

mongoose.connect(db,{
  useNewUrlParser: true,
  useUnifiedTopology: true
},function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});


function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/events', (req,res) => {
  
  EventModel.find(function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        res.send(data);
    }
});
});

router.get('/special', verifyToken, (req, res) => {
  
  specialModel.find(function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        res.send(data);
    }
});
})

router.post('/login', (req, res) => {
    let userData = req.body
    
    if ((userData.email == "Marvellous") && (userData.password == "Marvellous")) 
    {
      let payload = {subject: 1}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})   
    } 
    else 
    {
        res.status(401).send('Invalid Password')
    } 
})

module.exports = router;