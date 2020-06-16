const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User"); //this has to go first bc we end up using it in passport, and if it was declared after passport it wouldnt be able to see it
require('./models/Survey');
require("./services/passport");
const cookieSession = require("cookie-session"); //gives us access to cookies
const passport = require("passport"); //we have to tell passport to use cookies to keep track of user state


const bodyParser = require('body-parser'); 

mongoose.connect(keys.mongoURI);

const app = express(); //generates new app that represents a running express app

app.use(bodyParser.json()); //now middleware will parse the body and assign it to req.body object :) 

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //how long cookie will last for, has to be passed as milliseconds
    keys: [keys.cookieKey], //to encrypt cookie
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* one way of doing it
const authRoutes = require('./routes/authRoutes');
authRoutes(app);
*/

//another way of doing it
require("./routes/authRoutes")(app);
require('./routes/billingRoutes')(app); //return a function, which we immediately call with app object
require('./routes/surveyRoutes')(app);
//require route function, immediately call it with app object


//only during production, when in heroku
if (process.env.NODE_ENV === 'production') {
  //make express serve up production assets, like main jss or main css file 
  ///if gets request for route it doesnt know, this tells express to look in client/build for a file that matches 
  app.use(express.static('client/build'));


    //express will serve index.html if it doesnt recognize the route 
    //if there is nothing inside of those route folders, and nothing inside the client build folder, then it will give them index.html file 
  const path = require('path'); 
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });

}


const PORT = process.env.PORT || 5000;
app.listen(PORT);
