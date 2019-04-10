const schema = require('./graphql/schema')
const { ApolloServer } = require('apollo-server')
const authorizationLogic = require('./authorization')
const { port, dbLink } = require('./config')

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
})

server.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`)
})
