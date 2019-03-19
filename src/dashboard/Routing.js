import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Header from '../Header'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    <Header />
  </ApolloProvider>
)

export default App
