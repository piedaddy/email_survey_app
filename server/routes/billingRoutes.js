const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middelwares/requireLogin');

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // if (!req.user) return res.status(401).send({error: 'must be logged in'});  //requireLogin middleware does this now 
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    }); //creating Charge object!
    req.user.credits += 5; //set up by passport so we can always figure out who is singed in
    const user = await req.user.save();
    res.send(user);
  });
};
