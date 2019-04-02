import { get } from 'lodash'
import withGQL from './withGQL'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

const useAuthentification = ({ email, password }, history, login) => {
  console.log('ajunge aici')
  return login({
    variables: {
      email,
      password,
    },
  })
    .then(({ data }) => {
      const token = get(data.login, 'token')
      const isToken = localStorage.getItem('authToken')
      if (!isToken) {
        localStorage.setItem('authToken', JSON.stringify(token))
        history.push('/dashboard')
        window.location.reload()
      }
    })
    .catch(error => alert(error))
}

export default compose(
  withRouter,
  withGQL,
)(useAuthentification)
