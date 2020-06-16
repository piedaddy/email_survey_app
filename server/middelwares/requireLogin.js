module.exports = (req, res, next) => {
  if(!req.user) {
    return res.status(401).send({error: 'you must log in'})
  }
  next(); //like done callback 
}
///middleware is function that modifies request