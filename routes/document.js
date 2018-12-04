const express = require('express');
const solrClient = require('../lib/solr')();

const router = express.Router();
const documentPostCheck = [ 'url', 'content', 'title' ];
const options = {commit: false };
/*document result*/
router.post('/', (req, res, next) => {
  for (var elem of req.body){
    var omittedFlag = false;
    for (var key of documentPostCheck) {
      if(!elem.hasOwnProperty(key)) {
        //must send keys omitted
        omittedFlag = true;
        break;
      }
    }
    
    if(!omittedFlag) {
      //TODO change solr-client because it doesn't support update using array
      solrClient.update({ url:elem.url, content:elem.content, title:elem.title }, options)
        .then(function(result) {
          return result;
        }).catch(function(err) {
          if (err) 
            console.log(err);
        });
    }
  }
  res.send('OK');
  return;
});


module.exports = router;
