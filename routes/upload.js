const router = require('koa-router')();
const multer = require('koa-multer')
const db = require('../DBHelper');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  filename: function (req, file, cb) {
    const fileFormat = 'pdf'; 
    cb(null,Date.now() + "." + fileFormat);
  }
})
const upload = multer({ storage: storage });
router.post('/pdf', upload.any() , async (ctx, next) => {
  let o = {};
  const param = ctx.url.split('?');
  const p = param[1].split('&').forEach((it) => {
    const res = it.split('=');
    o[res[0]] = res[1];
  });
  const instance = {
    name: ctx.req.files[0].filename,
    path: '/upload/' + ctx.req.files[0].filename,
    ori: ctx.req.files[0].originalname,
    ...o
  };
  db.get('data')
    .push(instance)
    .write();
  
  ctx.body = {
    path: instance.path
  }
});

module.exports = router;
