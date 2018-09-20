module.exports = statistics = {};


// Takes in an array of posts and the key to find the mean of
statistics.mean = (array, field) => {
  // Finds the sum of the values of the key within the array
  const arrSum = array.reduce((sum, elem) => sum + parseFloat(elem[field]), 0);
  // Divide the sum by the number of elements in the array for the mean
  return parseFloat((arrSum / array.length).toPrecision(6));
}

// Takes in an array of posts and the key to find the median value of
statistics.median = (array, field) => {
  // Sort the array in ascending order by the value of the key
  array.sort((post1,post2) => post1[field] - post2[field])
  // If the array does not contain an even number of elements, return the middle element
  if (array.length % 2 !== 0)
    return array[Math.floor(array.length / 2)][field];
  // If the array does contain an even number of elements, return the average of the two middle elements
  else {
    const value1 = array[Math.floor((array.length-1) / 2)][field];
    const value2 = array[array.length / 2][field];
    return parseFloat(((value1 + value2)/2).toPrecision(6))
  }
}

// Takes in an array of posts and the key to find the mode of
// The mode is returned as either a value or an array of values if there's more than one mode
statistics.mode = (array, field) => {
  // Use an array to keep track of the mode by default
  let mode = [];
  // The value with the most occurances starts off occuring 0 times
  let mostOccurances = 0;
  // This object will keep track of how many times each value has occurred
  let counter = {};
  // Iterate through the array
  array.forEach(elem => {
    // If we've never encountered the value before, instantiate it at 0
    if (!counter[elem[field]]){
      counter[elem[field]] = 0
    }
    // Increment the number of occurances of the current value in the object
    let currOccurances = counter[elem[field]] + 1;
    counter[elem[field]] = currOccurances;
    // If the number of occurances of the current value is greater than the most number of occurances so far
    if (currOccurances > mostOccurances) {
      // Set the most number of occurances to the current number
      mostOccurances = currOccurances;
      // Reset mode to only contain the current value
      mode = [elem[field]];
    // If the number of occurances of the current value is equal to the most number of occurances so far
    } else if (currOccurances === mostOccurances) {
      // Add the current value to the mode output array
      mode.push(elem[field]);
    }
  });
  // If there's more than one element in the array, return the array; otherwise, return only the value
  return mode.length > 1 ? mode : mode[0];
}

// Takes in an array of posts and the key to find the range of
// Range is returned as an array of two elements: the smallest value and the largest value
statistics.range = (array, field) => {
  // Store the lowest value in the first element of the array and the highest value in the second element
  const range = [array[0][field],array[0][field]];
  // Iterate through the array to find the lowest and highest values and store them in the range array
  array.forEach(elem => {
    range[0] = Math.min(elem[field], range[0]);
    range[1] = Math.max(elem[field], range[1]);
  })
  // Return the range array that now contains the lowest value at the 0 index and the highest value at the 1 index
  return range;
}
