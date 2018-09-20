module.exports = {
  // Checks if the api key passed to this function is a valid key (No hashing function for now)
  checkKey: require("./checkKey.js"),
  // Given two times in string form, returns -1 if time1 is before time2 or 1 if time2 is before than time1
  compareTime: require("./compareTime.js"),
  // Given two times and a granularity, returns true if the two times are within the same time granularity
  sameTime: require("./sameTime.js"),
  // Given a country's two letter abbreviation, returns the full name of the country
  getCountry: require("./getCountry.js")
}
