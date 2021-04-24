var express = require('express');
var router = express.Router();

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const toneAnalyzer = new ToneAnalyzerV3({
    iam_apikey: "q6qFtVqLgf1so0kWuXkLsNTG7rrEKefShu9Ctx_OEvw0",
    url: 'https://api.kr-seo.tone-analyzer.watson.cloud.ibm.com/instances/f071a1ab-4152-420c-a0fd-ad9d6b72db45',
    version: '2017-09-21',
  });
  const text = 'i am tentative';

  //anger fear joy sadness confident tentative
  valid = ["anger", "fear", "joy", "sadness"];
  toneAnalyzer.tone({tone_input:{text: text}}, (err, resp) => {

    if (err) {
      console.log(err);
    } else {
      let tones = resp.document_tone.tones;
      console.log(tones);
  
      var score = -1, emotion = "Unknown";
      let final = emotion;
      for (let v of tones) {
        if(v.score > score && valid.includes(v.tone_id)){
          score = v.score;
          emotion = v.tone_name;
          console.log(emotion);
        }
      }
    }
    res.send("you are " + emotion);
  });
});

module.exports = router;
