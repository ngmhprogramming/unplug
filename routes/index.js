var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var cookie = req.cookies.data;
  if(cookie === undefined){
    res.cookie("data", 0, {maxAge: 999999});
  } else {
    console.log(cookie);
    counter = parseInt(cookie);
    res.cookie("data", counter+1, {maxAge: 999999});
  }

  res.render('index', { title: cookie });
});

module.exports = router;
