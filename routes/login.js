var express = require('express');
var router = express.Router();
var authen = require('../models/authenticator');
var getTable = require('../models/table_display');
var gen_box = require('../models/select_box');
var session;
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'ATN SHOP', message: 'PLEASE Input username or password' });
});

router.post('/', async function(req, res, next) {
let username = req.body.username;
let password = req.body.password;
session = req.session;

let [authenticated, shop_id, role] = await authen(username, password)
console.log(authenticated, shop_id, role)
//show user page
if (authenticated == true & role == 'shop') {
  var table = await getTable(shop_id)

  session.user_id = username;
    session.shopId = shopId;
    session.role = role;

    res.redirect('/users');
}
//show admin page
else if (authenticated == true & role == 'admin') {
  session.user_id = username;
    session.shopId = shopId;
    session.role = role;

    res.redirect('/admin');
}
else {
  res.render('login', { title: 'ATN SHOP',
                        message: 'Wrong username or password. Please try again!'});
}
});

// logout
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.render('index', { title: 'ATN SHOP' });
})


module.exports = router;
