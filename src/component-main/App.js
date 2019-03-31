import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRight,
  faArrowLeft,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Routing } from '../component-main'
library.add(faArrowRight)
library.add(faArrowLeft)
library.add(faUserPlus)
library.add(faSignInAlt)

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
})

const App = props => {
  return (
    <ApolloProvider client={client}>
      <Routing />
    </ApolloProvider>
  )
}
export default App
