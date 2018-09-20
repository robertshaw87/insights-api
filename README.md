# Insights API
Customer Sentiment API

#### This API provides data regarding customer sentiment towards Dropbox. You can use this API to retrieve individual customer posts or access statistical aggregration for the posts.

## Table of Contents

1. Reading the Documentation
2. [Access Tokens](#access-tokens)
3. Customer Postings
4. Statistical Aggregates
5. [Starting the Server](#starting-the-server)
6. [Technologies Used](#technologies-used)
7. [Author](#author)

<hr>

## Access Tokens
* You can access the API using either the key `dropbox` or the key `insights`
* You 

<hr>

## Starting the Server
1. You must have [Node.js](https://nodejs.org/en/) installed on your machine in order to run this server
    * Remember to install the Node Package Manager!
2. Once you have `Node.js` is installed, navigate inside the `server` folder using your terminal
3. Inside the server folder, run `node server.js` in order to start the server.
    * If the server started successfully, you should be able to see a message saying
    > Server listening on 3000
4. You are now ready to start making queries to the API.
    * Because this is a local server, the base URL is `http://localhost:3000/` so a query would look something like 
    > http://localhost:3000/api/posts/?key=dropbox

<hr>

## Technologies Used
* Javascript
* [Node.js](https://nodejs.org/en/) - Server Environment
* [Node Package Manager](https://www.npmjs.com/) - Package Manager for Node
* [Express.js](https://expressjs.com/) - Server Framework
* [Moment.js](https://www.npmjs.com/package/moment) - Time Calculations and Parsing

<hr>

## Author
* Robert Shaw - [robertshaw87](https://github.com/robertshaw87)