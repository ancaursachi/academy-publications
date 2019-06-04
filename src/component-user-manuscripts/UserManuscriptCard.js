import React from 'react'
import { Card, Row, th, StatusTag } from '../component-ui'
import styled from 'styled-components'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'
import { DeleteUserManuscript } from '../component-user-manuscripts'

const UserManuscriptCard = ({ manuscript, history }) => {
  const { _id, title, articleType, abstract, status, submissionId } = manuscript

  const handleReview = () => {
    if (status.toLowerCase() === 'draft')
      history.push(`/submission/${submissionId}/${_id}`)
    else {
      history.push(`/manuscriptsDetails/${submissionId}`)
    }
  }

  return (
    <StyledCard>
      <ButtonCard onClick={handleReview}>
        <Border>
          <Row>
            <Title>{title ? title : 'Draft'}</Title>
            <StatusTag status={status} />
          </Row>
          <ArticleType>{articleType}</ArticleType>
          <Abstract>{abstract ? `Abstract: ${abstract}` : ''}</Abstract>
        </Border>
      </ButtonCard>
      <RowStyled justify="flex-end" alignItems="flex-end">
        {status.toLowerCase() === 'submitted' && (
          <DeleteUserManuscript manuscript={manuscript} />
        )}
      </RowStyled>
    </StyledCard>
  )
}
const StyledCard = styled(Card)`
  position: relative;
  font-family: 'Nunito';
  padding: 0.5em;
  border-radius: 5px;
  margin: 1em 0em;
`
const RowStyled = styled(Row)`
  position: absolute;
  right: 37px;
  bottom: 2px;
`
const Border = styled.div`
  height: 100%;
  width: 100%;
  border-style: solid;
  border-color: ${th.colorCremLight};
  border-width: 1px;
  border-radius: 5px 5px 5px 5px;
  padding: 1em;
`
const Title = styled.div`
  font-size: 1.3em;
  width: 100%;
  color: ${th.colorBlue};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const ArticleType = styled.div`
  font-size: 0.9em;
  padding-bottom: 0.7em;
`
const ButtonCard = styled.button`
  height: 100%;
  width: 100%;
  text-align: initial;
  background-color: transparent;
  border: none;
  text-decoration: none;
  :focus {
    outline: none;
  }
  padding: 0.5em;
`
const Abstract = styled.div`
  font-size: 14px;
  width: 100%;
`

export default compose(mutations)(UserManuscriptCard)
