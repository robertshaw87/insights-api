# Insights API
Customer Sentiment API

#### This API provides data regarding customer sentiment towards Dropbox. You can use this API to retrieve individual customer posts or access statistical aggregration for the posts.

## Table of Contents

1. [Reading the Documentation](#reading-the-documentation)
2. [Access Tokens](#access-tokens)
3. [Customer Postings](#customer-postings)
4. [Statistical Aggregates](#statistical-aggregates)
5. [Starting the Server](#starting-the-server)
6. [Technologies Used](#technologies-used)
7. [Author](#author)

<hr>

## Reading the Documentation

[Back to top](#insights-api)

* This documentation is grouped by endpoint
    * Each endpoint URL only accepts the GET method
    * The API has specific functions at these URLs that can be further refined with query parameters
        * There is a table of query parameters and their expected values at the start of each section with further explanation within the section.
        * Query parameters are added to the end of the base URL with query string encoding.
            * A `?` after the URL denotes the start of inputting query parameters and each parameter is assigned a value with the `=` sign.
            * Multiple query parameters can be used in one API call by seperating the query value pairs with the `&` sign.
            > http://localhost:3000/api/posts/?key=dropbox&length=20&sort=desc
        * Query Parameters are optional and are completely optional

<hr>

## Access Tokens

[Back to top](#insights-api)

* You can access the API using either the temporary keys `dropbox` or `insights`
* This key must be passed into any API call as a query under the key `key`
    * For example, if you making a call to the Customer Postings API route on your local server, the query URL would be
        > http://localhost:3000/api/posts/?key=dropbox
* If you do not have a valid key, you will not be able to access either API

<hr>

## Customer Postings

[Back to top](#insights-api)

> http://localhost:3000/api/posts/

Query Parameter | Expected Value
--- | ---
length | integer - number of results to return
sort | string - "asc" or "desc" order by time stamp
country | string - 2 character country abbreviation, seperated by commas
city | string - city name, seperated by commas
contains | string - words to search for in the body, seperated by commas

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

    6. The `contains` parameter searches the body of the post and flters the results by the words provided
        * If you wish to further narrow down your results, you can add multiple words to search for. Unlike the searches in the city, a posting will only be returned if it contains all the words included in the query

            > http://localhost:3000/api/posts/?key=dropbox&contains=sollicitudin,lobortis

<hr>

## Statistical Aggregates

[Back to top](#insights-api)

> http://localhost:3000/api/posts/aggregate/

Query Parameter | Expected Value
--- | ---
median | boolean - display the median scores
mode | boolean - display the mode scores, array if there are multiple modes
range | boolean - display the range of scores as an array, first element is lowest and second is highest
start_date | string - date in YYYYMMDD format to start evaluation
stop_date | string - date in YYYYMMDD format to start evaluation
granularity | string - "week", "day", or "hour" to specify time spans to group postings into

* This API route serves up an object containing statistical aggregation for both the relevence and sentiment score
    * The base URL for this API is
        > http://localhost:3000/api/posts/aggregate/
    * By default, this object will contain the statistical mean of all the relevance_scores and the statistical mean of all the sentiment_scores upon arrival.
        > http://localhost:3000/api/posts/aggregate/?key=dropbox

        ```javascript
        {
          "relevance_score": {
            "mean": 0.33975
          },
          "sentiment_score": {
            "mean": 0.10203
          }
        }
        ```

* There are several valid query parameters for this API route
    1. Given no parameters other than the API key, this route will simply return the mean for the relevance and sentiment scores

    2. the `median`, `mode`, and `range` query parameters all take in a boolean. If any are set to true, it will return the corresponding value for both relevance_scores and sentiment_cards
        * The median will return the middle score if the posts were to be arranged in order by their corresponding score. If there are two posts in the middle, the median will be the average of the score for those two posts.
        * The mode will return a single score if there is one mode and an array of scores if there are more than one
        * The range will return an array where the first number is the lower bound of the dataset and the second number is the upper bound of the dataset (both are inclusive)
            > http://localhost:3000/api/posts/aggregate/?key=dropbox&median=true&mode=true&range=true

            ```javascript
            {
              "relevance_score": {
                "median": 0.26,
                "mode": 0,
                "range": [
                  0,
                  0.99
                ],
                "mean": 0.33975
              },
              "sentiment_score": {
                "median": 0.105,
                "mode": [
                  2.25,
                  3.9
                ],
                "range": [
                  -4.98,
                  4.99
                ],
                "mean": 0.10203
              }
            }
            ```

    3. You can limit the time period upon which the statistical aggregation is calculated by specifying a `start_date` and a `stop_date` in the query
        * The date must be specified in `YYYYMMDD` format
        * If a `start_date` is not specified, the aggregation will include all the posts starting from the oldest
        * If a `stop_date` is not specified, the aggregation will include all the posts until the most recent post

            >http://localhost:3000/api/posts/aggregate/?key=dropbox&start_date=20180528&stop_date=20180702

            ```javascript
            {
              "relevance_score": {
                  "mean": 0.335368
              },
                "sentiment_score": {
                  "mean": -0.226397
              }
            }
            ```

    4. You can choose to limit the time granularity of the statistical aggregation with the `granularity` query
        * `week`, `day`, and `hour` are the only valid values to this query.
        * This limits the number of individual scores we're using for the data aggregation
            * It first averages together all the sentiment scores and the relevance scores from each week, day, or hour depending upon the query before calculating the statistical aggregation with the new grouped dataset
            > http://localhost:3000/api/posts/aggregate/?key=dropbox&granularity=week

            ```javascript
            {
              "relevance_score": {
                "mean": 0.342497
              },
              "sentiment_score": {
                "mean": 0.160439
              }
            }
            ```

<hr>

## Starting the Server

[Back to top](#insights-api)

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
