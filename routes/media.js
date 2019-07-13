const router = require('koa-router')();
const db = require('../DBHelper');


router.get('/', async (ctx, next) => {
  const media = await db.get('media').value();
  if (media) {
    ctx.body = {status: 1, media: media.media, title: media.title, desc: media.desc, cover: media.cover};
  } else {
    ctx,body = {status: -1};
  }
});

module.exports = router;
