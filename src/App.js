import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRight,
  faArrowLeft,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'

import { AuthentificationPage } from './component-authentification'
import { th } from './component-ui'

library.add(faArrowRight)
library.add(faArrowLeft)
library.add(faUserPlus)
library.add(faSignInAlt)

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    <Root>
      <AuthentificationPage />
    </Root>
  </ApolloProvider>
)

const Root = styled.div`
  background-color: ${th.colorBackground};
  width: 100%;
  height: 100%;
`

export default App
