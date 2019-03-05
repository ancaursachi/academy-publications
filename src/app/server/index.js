// const { ApolloServer, gql } = require('apollo-server-express')
// const MongoClient = require('mongodb').MongoClient

require('dotenv').config()
const cors = require('cors')
const express = require('express')

const bodyParser = require('body-parser')
const expressGraphQL = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('../../graphql/index')
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

const app = express()

// const schema = gql`
//   type Query {
//     user: User
//     users: [User]
//   }
//   type User {
//     id: String!
//     username: String!
//   }
// `
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressGraphQL({
    schema,
    graphiql: true,
  }),
)

// const resolvers = {
//   Query: {
//     user: (parent, args) => {
//       return users[0]
//     },
//     users: () => {
//       return users
//     },
//   },
// }

// const server = new ApolloServer({
//   typeDefs: schema,
//   resolvers,
// })

// server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 5000 }, () => {
  console.log('Apollo Server on http://localhost:5000/graphql')
})
