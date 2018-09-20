const validKeys = ["dropbox", "insights"];

modules.exports = function(key) {
  return validKeys.includes(key);
}
