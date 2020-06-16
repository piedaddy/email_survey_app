const passport = require('passport');

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  ); //whenever user comes to this url, we tell passport to do its thing while using the google method 
  //google stragey has internal identifer of 'google'
  //scope specifies to google servers what we want access to 
  //google has a list of things we could ask for! these are just two of them
  
  app.get('/auth/google/callback', 
  passport.authenticate('google'),
  (req, res) => {res.redirect('/surveys')}
  //where request is sent to after authentification
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // logout is a function automatically created by passport. it takes the cookie with the id and kills it!!
    //res.send(req.user); // got a response but response was empty!! 
    res.redirect('/');

  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // will test to make sure that now if youve logged in you will get info of user
  });


}; 

// now exporting 

