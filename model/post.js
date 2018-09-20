// Use the provided data
const DATA = require("./testData.json").data;
// Import helper utilities
const utils = require("../utility");
// Import moment.js for time conversions
const moment = require("moment");


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
    if (elem)
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

// Returns all the posts in the database, filtered and sorted by the provided options
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


// Returns the statistical aggregations for the data, with restrictions as defined by the options
posts.getAggregate = options => {
  // Copy the data to preserve the original and sort by ascending time
  let statData = [...DATA].sort((post1,post2) => utils.compareTime(post1.time_stamp, post2.time_stamp));
  // Instantiate the return object
  let stats = {
    relevance_score: {},
    sentiment_score: {}
  }
  // Check if the user specified a start or stop date
  if (options.start_date || options.stop_date) {
    // If the start or stop date exist, convert them to the same format as the timestamp
    const start_date = options.start_date && moment(options.start_date, "YYYYMMDD").format("MM/DD/YYYY HH:mm:ss");
    const stop_date = options.stop_date && moment(options.stop_date, "YYYYMMDD").format("MM/DD/YYYY HH:mm:ss");

    // Remove all the elements that occur before the start_date or after the stop_date
    statData = statData.filter(elem => {
      if (start_date && (utils.compareTime(elem.time_stamp, start_date, "day") === -1)){
        return false;
      }
        
      if (stop_date && (utils.compareTime(stop_date, elem.time_stamp, "day") === -1))
        return false;
      return true;
    })
  }

  // Check if the user specified a time granularity
  // Averaging all the values for each score within the time granularity before finding statistical aggregations
  if (options.granularity === "hour" || options.granularity === "day" || options.granularity === "week") {
    // Create an object to keep track of the values for the current granularity segment
    let currGrain = {};
    // Create a new array to contain the values generated from the granularity
    let newData = [];
    // Iterate through the data set
    statData.forEach((elem, i) => {
      // For the first element of the set, populate the current granularity object
      if (i === 0) {
        currGrain = {
          granularityRef: elem.time_stamp,
          numElements: 1,
          relevance_score: parseFloat(elem.relevance_score),
          sentiment_score: parseFloat(elem.sentiment_score)
        }
      // If it's not the first element, check if the current element is within the same granularity as the current object
      } else if (utils.sameTime(currGrain.granularityRef, elem.time_stamp, options.granularity)) {
        // If it is, add the relevance and sentiment scores to the object and increment the count of number of elements it's combining
        currGrain.numElements++;
        currGrain.relevance_score += parseFloat(elem.relevance_score);
        currGrain.sentiment_score += parseFloat(elem.sentiment_score);
      // If the current element is within a new granularity segment
      } else {
        // Push the average relevance score and sentiment score from the previous granularity segment into the new array
        newData.push({
          relevance_score: parseFloat((currGrain.relevance_score / currGrain.numElements).toPrecision(6)),
          sentiment_score: parseFloat((currGrain.sentiment_score / currGrain.numElements).toPrecision(6)),
        })
        // Reset the granularity object with the data for the new element
        currGrain = {
          granularityRef: elem.time_stamp,
          numElements: 1,
          relevance_score: parseFloat(elem.relevance_score),
          sentiment_score: parseFloat(elem.sentiment_score)
        }
      }
      // If we've reached the end of the array, add the data for the current granularity object into the new array
      if (i === statData.length - 1) {
        newData.push({
          relevance_score: parseFloat((currGrain.relevance_score / currGrain.numElements).toPrecision(6)),
          sentiment_score: parseFloat((currGrain.sentiment_score / currGrain.numElements).toPrecision(6)),
        })
      }
    });
    // Set the new array to be the array we operate on
    statData = newData;
  }

  if (options.median === "true") {
  // find the median for the relevance_score
  stats["relevance_score"].median = utils.statistics.median(statData, "relevance_score")
  // Find the median for the sentiment_score
  stats["sentiment_score"].median = utils.statistics.median(statData, "sentiment_score")
  }
  if (options.mode === "true") {
  // find the mode for the relevance_score
  stats["relevance_score"].mode = utils.statistics.mode(statData, "relevance_score")
  // Find the mode for the sentiment_score
  stats["sentiment_score"].mode = utils.statistics.mode(statData, "sentiment_score")
  }
  if (options.range === "true") {
  // find the range for the relevance_score
  stats["relevance_score"].range = utils.statistics.range(statData, "relevance_score")
  // Find the range for the sentiment_score
  stats["sentiment_score"].range = utils.statistics.range(statData, "sentiment_score")
  }

  // find the mean for the relevance_score
  stats["relevance_score"].mean = utils.statistics.mean(statData, "relevance_score")
  // Find the mean for the sentiment_score
  stats["sentiment_score"].mean = utils.statistics.mean(statData, "sentiment_score")


  // Return the object containing the statistical aggregations for the relevance and sentiments scores
  return stats;
}
