const fetch = require('node-fetch');

async function fetchData() {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=motivational&maxLength=50');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json(); // Convert the response to JSON
    return data; // Return the JSON data
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Re-throw the error so it can be handled where fetchData is called
  }
}

module.exports = { fetchData };
