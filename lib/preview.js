const ogs = require('open-graph-scraper');
const db = require('./db');

function to(promise) {
   return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]);
}

async function getPreviewCache(url) {
  let err,page, preview;
  [err, page] = await to(db.PagePreview.findOne({where:{url:url}}));
  if (page) {
      console.log(`${page.get('id')} is exist`);
      return page.get('id');
  }
  
  [err, preview] = await to(ogs({'url':url, 'timeout': 3000}));
  if (err) throw 'Error in get ogs';

  console.log('description : ' + preview.data.ogDescription);

  if (!preview.data.ogDescription) {
    preview.data.ogDescription = '';
  }

  if (preview.data.ogDescription.length > 15) {
    preview.data.ogDescription = preview.data.ogDescription.substring(0, 15) + "...";
  }

  [err, page] = await to(db.PagePreview.create({
	url:url,
	title:preview.data.ogTitle,
	description:preview.data.ogDescription,
	image:preview.data.ogImage.url
  }));

  if (err) {
    console.log(err);
    throw 'Error in insert pagepreview';
  }
  console.log('generate new id');
  return page.get('id');
}
module.exports = { getPreviewCache };
