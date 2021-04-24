var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  current = req.cookies.data;
  if(current === undefined){
    current = [];
    res.cookie("data", current);
  }
  res.render('index', { title: "Unplug.", current: current});
});

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
async function evaluate(text){
  text += " ";
  const toneAnalyzer = new ToneAnalyzerV3({
    iam_apikey: "q6qFtVqLgf1so0kWuXkLsNTG7rrEKefShu9Ctx_OEvw0",
    url: 'https://api.kr-seo.tone-analyzer.watson.cloud.ibm.com/instances/f071a1ab-4152-420c-a0fd-ad9d6b72db45',
    version: '2017-09-21',
  });

  valid = ["anger", "fear", "joy", "sadness"];
  emotion = "Unknown";
  const result = await new Promise((resolve, reject) => {
    toneAnalyzer.tone({tone_input:{text: text}}, (err, resp) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        let tones = resp.document_tone.tones;
        console.log(tones);

        var score = -1;
        for (let v of tones) {
          if(v.score > score && valid.includes(v.tone_id)){
            score = v.score;
            emotion = v.tone_name;
          }
        }
        resolve(emotion);
      }
    });
  });
  return result;
}

router.post('/', async function(req, res, next) {
  feeling = await evaluate(req.body.feeling);
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
