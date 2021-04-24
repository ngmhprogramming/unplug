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
  const text =
	'Team, I know that times are tough! Product ' +
	'sales have been disappointing for the past three ' +
	'quarters. We have a competitive product, but we ' +
  'need to do a better job of selling it!';

  //anger fear joy sadness confident tentative
  
  toneAnalyzer.tone({tone_input:{text: text}}, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      let tones = res.document_tone.tones;
      console.log(tones);
      let emotions = []; // put all emotions results in an array
  
      for (let v of tones) {
        if(v.score > 0) { // pulse only if the likelihood of an emotion is above the given confidencethreshold
          console.log(`Current Emotion is ${v.tone_id}, ${v.score}`);
          emotions.push(v.tone_id);
        }
      }
        
      if(emotions.length) console.log(emotions);
    }
  });
  /*
  a = []
  axios
    .post('https://api.kr-seo.tone-analyzer.watson.cloud.ibm.com/instances/f071a1ab-4152-420c-a0fd-ad9d6b72db45',
      {
        auth: {
          username: "apikey",
          password: "q6qFtVqLgf1so0kWuXkLsNTG7rrEKefShu9Ctx_OEvw0",
        }
      }
    )
    .then(res => {
      console.log(`statusCode: ${res.statusCode}`)
      a = res
      console.log(res)
    })
    .catch(error => {
      console.error(error)
    })
  */
  res.send('ur mum ghey');
});

module.exports = router;
