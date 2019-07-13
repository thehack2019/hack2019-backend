const router = require('koa-router')();
const multer = require('koa-multer')
const db = require('../DBHelper');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
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
  const p = param.split('&').forEach((it) => {
    const res = it.split('=');
    o[res[0]] = res[1];
  });
  const instance = {
    name: ctx.req.files[0].filename,
    path: '/upload/' + ctx.req.files[0].filename,
    ...o
  };
  db.get('data')
    .push(instance)
    .write();
  
  ctx.body = {
    filename: ctx.req.files[0].filename,
  }
});

module.exports = router;
