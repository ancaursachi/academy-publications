require('dotenv').config()
const schema = require('./graphql/schema')
const { ApolloServer } = require('apollo-server')
const authorizationLogic = require('./authorization')

//conect to database
const mongoose = require('mongoose')
const dbUserAdmin = 'admin'
const dbPassAdmin = 'admin16'
const db = `mongodb://${dbUserAdmin}:${dbPassAdmin}@ds243041.mlab.com:43041/academy-db`
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
server.listen({ port: 5000 }, () => {
  console.log('Apollo Server on http://localhost:5000/graphql')
})
