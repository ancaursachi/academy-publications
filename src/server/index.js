const schema = require('./graphql/schema')
const { ApolloServer } = require('apollo-server')
const authorizationLogic = require('./authorization')
const { port, dbLink } = require('./config')
const playground = require('./playground')
const cors = require('cors')
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

server.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`)
})
