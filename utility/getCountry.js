const COUNTRIES = require("./countries.json");

module.exports = function(abrev) {
  return COUNTRIES[abrev];
}