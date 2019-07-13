const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
/*
Helper for constructing Data Base
 */
const defaultItem = {users:[{username:'', password:'', uuid: '', session:''}], 
                    media:[{vid: '', cover:'', isDone: false, url:'', desc:'',title:''}],
                    attachment: [{time: 0, question: '', comments: [], vid: '', qid: ''}],
                    data:[{name:'', path:'', page: '', vid: ''}]
                };

db.defaults(defaultItem)
    .write();

module.exports = db;
