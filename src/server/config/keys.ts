if(process.env.NODE_ENV === 'production'){
   var { DB, SESSION_SECRET } = require('./prod');
} else {
    var { DB, SESSION_SECRET } = require('./dev');
}

export { DB, SESSION_SECRET };