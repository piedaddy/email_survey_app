module.exports = (res, req, next) => {
  if(res.user.credits < 1) {
    return res.status(403).send({error: 'you gotta buy more credits'})
  }
  next();
}