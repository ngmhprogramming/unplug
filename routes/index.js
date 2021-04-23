var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Unplug." });
});

function evaluate(text){
  if(text.includes("sad")){
    return "sad";
  } else return "happy";
}

router.post('/', function(req, res, next) {
  feeling = evaluate(req.body.feeling);
  current = req.cookies.data;
  if(current === undefined){
    current = [];
  }
  current.push(feeling);
  res.cookie("data", current);
  res.render('index', { title: "Unplug.", feeling: feeling, current: current});
});

module.exports = router;
