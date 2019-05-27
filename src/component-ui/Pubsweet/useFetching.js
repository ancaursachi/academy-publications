import { useState } from 'react'

const useFetching = () => {
  const [state, setState] = useState({
    isFetching: false,
    fetchingError: '',
  })

  const setFetching = value => {
    setState(s => ({
      isFetching: value,
      fetchingError: '',
    }))
  }

  const setError = fetchingError => {
    setState(s => ({
      isFetching: false,
      fetchingError,
    }))
  }

  return {
    setError,
    setFetching,
    isFetching: state.isFetching,
    fetchingError: state.fetchingError,
  }
}

export default useFetching
