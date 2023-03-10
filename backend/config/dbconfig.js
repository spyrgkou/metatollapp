const conn_params = {
    // host : 'mongo_db',
    host : '127.0.0.1',
    db : 'metatolldb',
    port : '27017',
    username : 'appAdmin',
    password : 'appAdmin123'
};

// const connection_string = 'mongodb://'+conn_params.username+':'+conn_params.password+'@'+conn_params.host+':'+conn_params.port+'/'+conn_params.db;
const connection_string = 'mongodb://mongo_db:27017/metatolldb';

module.exports = connection_string;
