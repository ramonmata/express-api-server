var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

// Here we
router.post('/authenticate', function(req, res){

  // Update this section to check against a DB or other thing to validate user/pass

  // DEMO ONLY
  var user = 'admin';
  var password = '123321';

  // if user/pass matches the values in demo... then create token
  if (req.body.user === user && req.body.password === password) {
    // https://github.com/auth0/node-jsonwebtoken
    var token = jwt.sign({user:user}, config.secret, {expiresIn:'2h'});
    res.json({success: true, token: token});
  }else{
    res.json({success: false, message: 'Authentication failed'});
  }

});

// Declares a express middleware to verify token between calls to API
// IMPORTANT :  applies to the end-points below (/api/authenticate will not use this)
router.use(function(req, res, next) {

  //Verify header or url parameters or post parameters looking for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Bad Token'
        });
      } else {
        // Data in token is available at req.decoded
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
      success: false,
      message: 'Missing Token'
    });

  }
});

router.get('/', function(req, res, next) {
  res.json({message:'api v 1.0'});
});

router.get('/users', function(req, res, next) {
  //console.log('decoded token: ' +JSON.stringify(req.decoded));
  res.json({count:1, result:[{name:'user', pass:'123'},{name:'user', pass:'123'}]});
});


module.exports = router;
