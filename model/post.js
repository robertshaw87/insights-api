// Use the provided data
const DATA = require("./testData.json").data;
// Import helper utilities
const utils = require("../utility");

// Setup the export object
const posts = module.exports = {};

// Helper function that takes in an array of posts, a key to check, and options to check against the key
// returns a new array that contains only the posts that contain one of the options at the key checked
const filterData = (data, key, options) => {
  const params = {};
  options.split(",").forEach(elem => {
    // if we're filtering by country, we need to convert the country abbreviation to the actual name
    if (key === "country")
      elem = utils.getCountry(elem.toUpperCase());
    params[elem.toLowerCase()] = true;
  });
  // Filter by the provided key using the object we made from the filter options
  return data.filter(elem => {
    if (key !== "body")
      return params[elem[key].toLowerCase()];
    else {
      // If we're filtering by words contained in the body, we need to check every word to see if one of them exists
      let pass = true;
      let currBody = elem.body.toLowerCase();
      Object.keys(params).forEach(word => {
        if (!currBody.includes(word.toLocaleLowerCase()))
          pass = false;
      })
      return pass;
    }
  })
}

posts.getAll = options => {
  // Copy the data to preserve the original
  let returnData = [...DATA];

  // Check for sort by time option and use the compareTime utility function to sort
  switch (options.sort) {
    case "asc": 
      returnData.sort((post1,post2) => utils.compareTime(post1.time_stamp, post2.time_stamp));
      break;
    case "desc":
      returnData.sort((post1,post2) => (-1 * utils.compareTime(post1.time_stamp, post2.time_stamp)));
      break;
  }

  // Check for country filter, will return results that match any of the countries given
  if (typeof options.country === "string")
    returnData = filterData(returnData, "country", options.country)

  // Check for city filter, will return results that match any of the cities given
  if (typeof options.city === "string")
    returnData = filterData(returnData, "city", options.city)

  // Check for contains filter, will return results that match all of the terms given
  if (typeof options.contains === "string")
    returnData = filterData(returnData, "body", options.contains)
  

  // If an entry limit was defined, use it
  const maxEntries = isNaN(options.limit) ? DATA.length : options.limit;
  returnData.splice(maxEntries);

  // Return the modified data set
  return returnData;
}

posts.getAggregate = options => {
  // Copy the data to preserve the original and sort by ascending time
  let data = [...DATA].sort((post1,post2) => utils.compareTime(post1.time_stamp, post2.time_stamp));

  
}
