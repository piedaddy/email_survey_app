const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url"); //default module, helps us parse urls

const mongoose = require("mongoose");
const requireLogin = require("../middelwares/requireLogin");
const requireCredits = require("../middelwares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

//add requireCredits later episode 131
module.exports = (app) => {
  app.get("/api/surveys", async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    }); //to make sure that survey doesnt send back the recipient emails
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for responding");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice"); ///will return object with keys as variables listed there!
    /*
    const events = _.map(req.body, (event) => { ///for every element in req.body, run the following code on it
      const pathname = new URL(event.url).pathname; 
      const match = p.test(pathname); //will either be object or nulll
     // const match = p.test(new URL(event.url).pathname); could also do that

      if (match) {
        return {email: event.email, surveyId: match.surveyId, choice: match.choice}
      }
      //could deconstrut by having {email, url} instead of event
    });
    //compact goes through an array, removes any elements of array that are undefined
    
    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId') //will get rid of elements that have same email and survey ID
    const updatedEvents = _.each(uniqueEvents => {
      Survey.updateOne({
        _id: surveyId,
        recipients: {
          $elemMatch: { email: email, responded: false}
        }
      }, {
        $inc: { [ choice ]: 1 }, //increment by 1 //brackets around choice will replace with the value of choice so 'yes' or 'no'
        $set: { 'recipients.$.responded': true } //will update (set) property of survey found, the $ in the middle represents the recipient that we just found in the previous query 
      }).exec();
    });
    
    */
    _.chain(req.body)
      .map((event) => {
        const match = p.test(new URL(event.url).pathname);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice,
          }
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            }
          },
          {
            $inc: { [choice]: 1 }, //increment by 1 //brackets around choice will replace with the value of choice so 'yes' or 'no'
            $set: { 'recipients.$.responded': true }, //will update (set) property of survey found, the $ in the middle represents the recipient that we just found in the previous query
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body; //deconstructured !
    const survey = new Survey({
      title: title,
      subject: subject,
      body: body, ///could deconstruct to just 'body'
      recipients: recipients.split(",").map((recipient) => {
        return { email: recipient.trim() };
      }),
      _user: req.user.id, //id is automatically available to us through mongo
      dateSent: Date.now(),
      //could have a redirect URl
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    ///                             second arg is actually body of the email, the html
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
