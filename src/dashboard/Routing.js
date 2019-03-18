import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Header from '../Header'
// import MainPage from './MainPage'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    <Header />
    {/* <MainPage /> */}
  </ApolloProvider>
)

export default App
