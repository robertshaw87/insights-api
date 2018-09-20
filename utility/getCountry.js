const COUNTRIES = require("./countries.json");

// Given a country's two letter abbreviation, returns the full name of the country
module.exports = function(abrev) {
  return COUNTRIES[abrev.toUpperCase()];
}