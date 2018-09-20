const validKeys = ["dropbox", "insights"];

module.exports = function(key) {
  return validKeys.includes(key);
}
