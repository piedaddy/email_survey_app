//what credentials to return
//are we in prod or dev? 

if (process.env.NODE_ENV === 'production') { //if being accessed from Heroku, then it will automatically change this env to production
  //return production set of keys
  module.exports = require('./prod');
} else {
  //return dev keys 
  module.exports = require('./dev');

}

