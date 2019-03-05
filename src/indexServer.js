const cors = require('cors')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const app = express()
app.use(cors())

const schema = gql`
  type Query {
    user: User
    users: [User]
  }
  type User {
    id: String!
    username: String!
  }
`
const resolvers = {
  Query: {
    user: (parent, args) => {
      return users[0]
    },
    users: () => {
      return users
    },
  },
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

let users = [
  {
    id: '1',
    username: 'Robin Wieruch',
  },
  {
    id: '2',
    username: 'Dave Davids',
  },
]

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 5000 }, () => {
  console.log('Apollo Server on http://localhost:5000/graphql')
})
