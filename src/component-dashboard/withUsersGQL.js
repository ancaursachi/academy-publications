import { compose, withProps } from 'recompose'
import { get } from 'lodash'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const getUsers = gql`
  query {
    users {
      _id
      username
    }
  }
`
export default compose(
  graphql(getUsers),
  withProps(({ data }) => ({
    users: get(data, 'users', []),
  })),
)
