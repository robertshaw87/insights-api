## Starting the Server

1. You must have [Node.js](https://nodejs.org/en/) installed on your machine in order to run this server
    * Remember to install the Node Package Manager!
2. Once you have `Node.js` is installed, navigate inside the `server` folder using your terminal
3. Inside the server folder, run `npm install` followed by `node server.js` in order to start the server.
    * If the server started successfully, you should be able to see a message saying
        > Server listening on 3000
4. You are now ready to start making queries to the API.
    * Because this is a local server, the base URL is `http://localhost:3000/` so a query would look something like 
        > http://localhost:3000/api/posts/?key=dropbox
