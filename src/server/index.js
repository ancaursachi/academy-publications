const schema = require('./graphql/schema')
const authorizationLogic = require('./authorization')
const { port, dbLink, textGearsUrl, textGearsApiKey } = require('./config')
const playground = require('./playground')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const express = require('express')

//conect to database
const mongoose = require('mongoose')
const db = dbLink
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

const server = new ApolloServer({
  schema,
  context: authorizationLogic(),
  introspection: true,
  playground: playground(),
  cors: true,
})

const app = express()
server.applyMiddleware({ app })

app.use(
  cors({
    origin: `http://localhost:1000/graphql`,
    optionsSuccessStatus: 200,
  }),
)

app.listen({ port }, () =>
  console.log(`Apollo Server on http://localhost:${port}/graphql`),
)

app.get('/hello', function(req, res) {
  res.send('Buna anca')
})

var pdfUtil = require('pdf-to-text');
var pdf_path = "C:\\Users\\xRicochet\\Downloads\\ATT91571.pdf";

pdfUtil.info(pdf_path, function(err, info) {
    if (err) throw(err);
    console.log(info);
});

//option to extract text from page 0 to 10
var option = {from: 0, to: 1};

pdfUtil.pdfToText(pdf_path, option, function(err, data) {
    if (err) throw(err);
    // console.log(data); //print text
});

const textGearsComputedUrl = `${textGearsUrl}I%20is%20engineer&key=${textGearsApiKey}`;
console.log(textGearsComputedUrl);
const https = require('https');

https.get(textGearsComputedUrl, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).errors);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});