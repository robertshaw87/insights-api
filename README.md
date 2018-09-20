# Insights API
Customer Sentiment API

#### This API provides data regarding customer sentiment towards Dropbox. You can use this API to retrieve individual customer posts or access statistical aggregration for the posts.

## Table of Contents

1. Reading the Documentation
2. [Access Tokens](#access-tokens)
3. [Customer Postings](#customer-postings)
4. Statistical Aggregates
5. [Starting the Server](#starting-the-server)
6. [Technologies Used](#technologies-used)
7. [Author](#author)

<hr>

## Access Tokens

* You can access the API using either the temporary keys `dropbox` or `insights`
* This key must be passed into any API call as a query under the key `key`
    * For example, if you making a call to the Customer Postings API route on your local server, the query URL would be
        > http://localhost:3000/api/posts/?key=dropbox
* If you do not have a valid key, you will not be able to access either API

<hr>

## Customer Postings

* This API route serves up an array of individual posts by users along with the meta information for each post.
* The base URL for this API is
    > http://localhost:3000/api/posts/

* You will have to add an API key to the query parameters in order to be able to access the API

* The API will return an array of postings that match the query parameters provided

> http://localhost:3000/api/posts/?key=dropbox&length=3

```javascript
[
    {
      "body": "Aenean id massa ex. Curabitur euismod erat scelerisque nibh ornare ultricies.",
      "city": "Houston",
      "company": "Apple",
      "country": "United States of America",
      "id": 1,
      "relevance_score": 0.99,
      "sector": "Technology",
      "sentiment_score": 1.05,
      "time_stamp": "7/30/2018 17:12:57"
    }, 
    {
      "body": "Curabitur et tortor semper, laoreet ligula eu, porta orci.",
      "city": "Portland",
      "company": "Toyota",
      "country": "United States of America",
      "id": 2,
      "relevance_score": 0.16,
      "sector": "Automotive",
      "sentiment_score": 2.43,
      "time_stamp": "7/30/2018 15:39:21"
    }, 
    {
      "body": "Sed vel vulputate turpis, sit amet iaculis lorem. Vestibulum tempor dapibus tellus id commodo.",
      "city": "Dallas",
      "company": "AT&T",
      "country": "United States of America",
      "id": 3,
      "relevance_score": 0.23,
      "sector": "Telecom",
      "sentiment_score": 3.95,
      "time_stamp": "7/30/2018 4:22:33"
    }
]
```

* There are several valid query parameters for this API route
    1. Given no parameters, this route will return all the posts in the database ordered by the post ID.

    2. The `length` parameter takes in an integer and limits the number of results to that number
        > http://localhost:3000/api/posts/?key=dropbox&length=20

    3. The `sort` parameter is looking for either the string "asc" or the string "desc" and will sort the results in terms of ascending or descending time that the posts were created.
        > http://localhost:3000/api/posts/?key=dropbox&sort=desc

    4. The `country` parameter is looking for the two character abbreviation for the country to filter by.
        * If you wish to see the results for more than one country, seperate the abbreviations with commas
        > http://localhost:3000/api/posts/?key=dropbox&country=us

        > http://localhost:3000/api/posts/?key=dropbox&country=ca,fr
        
        * This returns all the posts originating from those countries
            * If you included more than one country in the query, it will return the posts from all the countries mentioned in the query

        * You can find a comprehensive list of 2 character abbreviations for countries here: [https://www.nationsonline.org/oneworld/country_code_list.htm](https://www.nationsonline.org/oneworld/country_code_list.htm)

        * The abbreviations for countries with data in the database are:

            Country | Abbreviation
            --- | ---
            Austria | AT
            Canada | CA
            Chile | CL
            France | FR
            Germany | DE
            Ireland | IE
            Japan | JP
            Mexico | MX
            Portugal | PT
            South Africa | ZA
            Sweden | SE
            United Kingdom | GB
            United States of America | US

    5. The `city` parameter filters the results by the specified cities
        * If you wish to see the results for more than one city, seperate the city names with commas
            > http://localhost:3000/api/posts/?key=dropbox&city=new york

            > http://localhost:3000/api/posts/?key=dropbox&city=phoenix,london

        * This returns all the posts originating from those cities
            * If you included more than one city in the query, it will return the posts from all the cities mentioned in the query

    6. The `contains` parameter searches the body of the post and flters the results by 

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