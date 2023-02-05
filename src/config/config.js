process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if (process.env.NODE_ENV == 'dev') {

    process.env.DBNAME =  'venezuela';
    process.env.DBUSER = 'root';
    process.env.DBPASSWORD = '';
    process.env.DBHOST = 'localhost';
    process.env.SEED = 'token-SEED';
    process.env.CADUCIDAD_TOKEN = '2h';

}