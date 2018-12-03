const express = require('express');
const db = require('../lib/db');
const events = require('../routes/events');

const router = express.Router();

router.post('/ping', (req, res) => {
  db.PingEvent.create({
    blog_id: 0, // TODO replace by req.body.blog_id
    url: req.query.url
  });

  res.end();
});

router.post('/like', (req, res) => {
  console.log(req.body);
  console.log(`Like events user_id : ${req.body.user_id}`);
  console.log(`Like events url : ${req.body.url}`);

  db.User.findOne({
    where: { id: req.body.user_id }
  }).then((user) => {
    db.LikeEvent.findOne({
      where: {user_id: user.id, url: req.body.url}
    }).then(exist => {
      if (!exist) {
        db.LikeEvent.create({
          user_id: user.id,
          url: req.body.url
        });
      } else {
        console.log('Like event already exist');
      }
    });

  }).catch(err => {
    console.log('User not Found!');
  });

  const updateParam ={url:req.query.url, clicked:{inc:1}}; 
  console.log(updateParam);
  solrClient.update(updateParam, {commit: true})
    .then(function(result) {
        return result;
    }).catch(function(err) {
         if (err) {
            console.log(err);
        }
    });

    res.end('/');
});

router.post('/cancel_like', (req, res) => {
  console.log(req.body);
  console.log(`cancel like events user_id : ${req.body.user_id}`);
  console.log(`cancel like events url : ${req.body.url}`);

  db.User.findOne({
    where: { id: req.body.user_id }
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
