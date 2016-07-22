var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

router.post('/authenticate', function(req, res){
    var user = 'admin';
    var password = '123321';

    if (req.body.user === user && req.body.password === password) {
        var token = jwt.sign({user:user}, config.secret, {expiresIn:'24h'});
        res.json({success: true, token: token});
    }else{
        res.json({success: false, message: 'Authentication failed'});
    }

});
