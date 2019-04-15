import React from 'react'
import styled from 'styled-components'

const NotFoundPage = () => {
  return (
    <Root>
      <Text>This page doesn't exist.</Text>
    </Root>
  )
}

export default NotFoundPage

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Text = styled.div`
  font-size: 3em;
  margin-bottom: 2em;
  justify-items: center;
`
