import React from 'react'
import styled from 'styled-components'

const DetailsCard = ({ children }) => {
  return (
    <Card>
      <WrapperCard>{children}</WrapperCard>
    </Card>
  )
}

const Card = styled.div`
  border-radius: 3px;
  box-shadow: 0 1px 2px 1px rgba(125, 125, 125, 0.3);
  padding: 1em;
  background-color: #f8f9f9;
  font-family: 'Nunito';
  height: fit-content;
  width: 50em;
`
const WrapperCard = styled.div`
  border-radius: 3px;
  border: solid 1px #e7e7e7;
  padding: 1.5em;
  background-color: white;
`

export default DetailsCard
