/**
 * Created by mikkri on 2017-04-20.
 */
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test');
    break;
  case 'dev':
  case 'development':
    module.exports = require('./config/webpack.dev');
    break;
  default:
    module.exports = require('./config/webpack.dev');
}