function authenticate(req, res, next) {
  try {
    if (req.session.user) {
      console.log("authenticated");
      //res.status(200).send("authenticated");
      next();
    } else {
      throw res.status(403).send("unauthorized");
    }
  } catch (err) {
    next(err);
  }
}
module.exports = { authenticate };
