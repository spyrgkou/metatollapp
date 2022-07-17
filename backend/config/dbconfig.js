const conn_params = {
    host : 'localhost',
    db : 'metatolldb',
    port : '27017',
    username : 'appAdmin',
    password : 'appAdmin123'
};

const connection_string = 'mongodb://'+conn_params.username+':'+conn_params.password+'@'+conn_params.host+':'+conn_params.port+'/'+conn_params.db;
module.exports = connection_string;
