const router = require('koa-router')();
const db = require('../DBHelper');
const uuid = require('node-uuid');


router.get('/', async (ctx, next) => {
    let o = {};
    ctx.request.querystring.split('&').forEach((it) => {
        const res = it.split('=');
        o[res[0]] = res[1];
    });
    const {vid} = o;
    const v = db.get('media').find({vid}).value();
    // v.url
    const comments = db.get('attachment').filter({vid}).value();
    const attachments = db.get('data').filter({vid}).value();
    console.log({v, comments, attachments})
    ctx.body = {v, comments, attachments};
});

router.post('/', async (ctx, next) => {
    const {time, content, tar, vid} = ctx.request.body;
    if (tar) {
        let d = db.get('attachment').find({qid: tar}).value();
        const comments = d['comments'];
        comments.push(content);
        db.get('attachment').find({qid: tar}).assign({comments}).write();
    } else {
        let qid = (Math.random() * 1000).toString();
        let instance = {vid, qid, time, question: content, comments: ['']};
        db.get('attachment')
            .push(instance)
            .write();
    }
    ctx.body = {status: 1}; 
});

module.exports = router;
