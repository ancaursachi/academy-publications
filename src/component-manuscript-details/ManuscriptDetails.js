import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'

const ManuscriptDetails = () => {
  return <Root>anca e draguta</Root>
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 18% 82%;
`

export default compose()(ManuscriptDetails)
