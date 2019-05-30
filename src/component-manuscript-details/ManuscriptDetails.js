import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { th, Card } from '../component-ui'

const ManuscriptDetails = ({ match, ...rest }) => {
  const { submissionId } = match.params
  console.log(submissionId)
  return (
    <Root {...rest}>
      <Card
        borderRadius={'5px 5px 5px 5px'}
        pt={1}
        pr={1}
        pl={1}
        pb={1}
        width={45}
        height={10}
      >
        <Title>Aici e title</Title>
      </Card>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  font-family: 'Nunito';
  justify-content: center;

  ${th.marginHelper};
  ${th.paddingHelper};
`
const Title = styled.div`
  font-size: 18px;
`

export default compose()(ManuscriptDetails)
