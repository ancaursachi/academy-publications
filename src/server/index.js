require('dotenv').config()
const schema = require('./graphql/schema')
const { ApolloServer } = require('apollo-server')

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
  // formatError: error => {
  //   console.log(error)
  //   return new Error('Internal server error')
  // },
})

server.listen({ port: 5000 }, () => {
  console.log('Apollo Server on http://localhost:5000/graphql')
})
