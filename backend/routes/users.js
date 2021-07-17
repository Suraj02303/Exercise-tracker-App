
//this file is a middleware file
/**
 * Middleware functions are functions that have access to the request object ( req ), 
 * the response object ( res ), and the next function in the application's request-response cycle. 
 * ... Middleware functions can perform the following tasks: Execute any code. 
 * Make changes to the request and the response objects.**/ const router = require('express').Router();
let User = require('../models/user.model');

// handle incoming get request
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// handle incoming post request
router.route('/add').post((req, res) => {
  const username = req.body.username;
  
  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;