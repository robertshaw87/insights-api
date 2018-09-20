const validKeys = ["dropbox", "insights"];

// Checks if the api key passed to this function is a valid key
module.exports = function(key) {
  return validKeys.includes(key);
}
