import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './App.css'
import QueryUsers from './QueryUsers'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
})
const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app</h2>
      <QueryUsers />
    </div>
  </ApolloProvider>
)

export default App
