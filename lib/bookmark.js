const express = require('express');
const db = require('./db');
const events = require('../routes/events');
const preview = require('./preview');

const attributeCheck = ['id', 'page'];
const defaultImage = '/images/Chosung_on_grid_1.png';

async function showBookmarkList(req, res) {
  try {
    const page = req.query.page;
    const pageSize = 5;

    let err, likes_data, preview_data;
    [err, likes_data] = await preview.to(db.LikeEvent.findAll({
      attributes: ['preview_id'],
      where: {
        user_id: req.query.id
      },
      limit: pageSize,
      offset: pageSize * (page - 1)
    }));
    if (err) {
      throw 'Error in list likes_data';
    }

    let likes = likes_data.map(x => {
      return x.dataValues.preview_id;
    });
    [err, preview_data] = await preview.to(db.PagePreview.findAll({
      where: {
        id: likes
      }
    }));
    if (err) {
      throw 'Error in list preview_data';
    }

    let previews = preview_data.map(x => {
      let ret = {};
      ret.url = x.dataValues.url;
      ret.title = x.dataValues.title;
      if (x.dataValues.image) {
        ret.image = x.dataValues.image;
      } else {
        ret.image = defaultImage;
      }
      ret.description = x.dataValues.description;
      if (!ret.description) {
        ret.description = '';
      }
      return ret;
    });
    console.log(previews);
    
    return previews;

  } catch (err) {
    res.status(403).end();
    console.log(err);
    return err;
  }
}

module.exports = { showBookmarkList };