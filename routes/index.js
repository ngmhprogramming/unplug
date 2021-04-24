var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Unplug." });
});

function evaluate(text){
  emotions = ["happy", "sad", "angry", "fear", "calm", "confusion"];
  for(const emotion of emotions){
    if(text.includes(emotion)) return emotion;
  }
  return "happy";
}

router.post('/', function(req, res, next) {
  feeling = evaluate(req.body.feeling);
  current = req.cookies.data;
  if(current === undefined){
    current = [];
  }
  current.push(feeling);
  if(current.length > 30) current.shift();
  res.cookie("data", current);
  res.render('index', { title: "Unplug.", feeling: feeling, current: current});
});

module.exports = router;
