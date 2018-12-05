const express = require('express');
const db = require('../lib/db');
const events = require('../routes/events');
const solrClient = require('../lib/solr')();
const preview = require('../lib/preview');

const router = express.Router();

router.post('/ping', async (req, res) => {
  await db.PingEvent.create({
    blog_id: 0, // TODO replace by req.body.blog_id
    url: req.query.url
  });

  const updateParam ={url:req.query.url, clicked:{inc:1}}; 
  console.log(updateParam);
  await solrClient.update(updateParam, {commit: true})
    .then(function(result) {
        return result;
    }).catch(function(err) {
         if (err) {
            console.log(err);
        }
    });

  res.end();
});

router.post('/like', async (req, res) => {
  console.log(req.body);
  console.log(`Like events user_id : ${req.body.user_id}`);
  console.log(`Like events url : ${req.body.url}`);

  const pid = await preview.getPreviewCache(req.body.url);
  console.log(`previed id : ${pid}`);

  await db.User.findOne({
    where: { id: req.body.user_id }
  }).then((user) => {
    db.LikeEvent.findOne({
      where: {user_id: user.id, url: req.body.url}
    }).then(exist => {
      if (!exist) {
        db.LikeEvent.create({
          user_id: user.id,
          url: req.body.url,
          preview_id: pid
        });
      } else {
        console.log('Like event already exist');
      }
    });

  }).catch(err => {
    console.log('User not Found!');
  });


  res.end('/');
});

router.post('/cancel_like', (req, res) => {
  console.log(req.body);
  console.log(`cancel like events user_id : ${req.user.id}`);
  console.log(`cancel like events url : ${req.body.url}`);

  db.User.findOne({
    where: { id: req.user.id }
  }).then((user) => {
    db.LikeEvent.findOne({
      where: {user_id: user.id, url: req.body.url}
    }).then(likeEvent => {
      likeEvent.destroy();
    }).catch(err => {
      console.log('Like not exist');
    });

  }).catch(err => {
    console.log('User not Found!');
  });

  res.end('/');
});

module.exports = router;
