const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

module.exports = () => {
  passport.use(new LocalStrategy());
};
