const schema = require('./graphql/schema')
const authorizationLogic = require('./authorization')
const { port, dbLink } = require('./config')
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
