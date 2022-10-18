var express = require('express');
var router = express.Router();
var authen = require('../models/authenticator')
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'ATN SHOP', message: 'PLEASE Input username or password' });
});

router.post('/', async function(req, res, next) {
let username = req.body.username;
let password = req.body.password;
let [authenticated, shop_id] = await authen(username, password)
console.log(authenticated)
if (authenticated == true) {
  res.render('users', { title: 'Welcome to ATN SHOP',
                        name: username,
                        table_string: table });
}
else {
  res.render('login', { title: 'ATN SHOP',
                        message: 'Wrong username or password'});
}
});

module.exports = router;
