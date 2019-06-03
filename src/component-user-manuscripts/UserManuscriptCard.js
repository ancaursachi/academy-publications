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
    <StyledCard
      borderRadius={'5px 5px 5px 5px'}
      width={45}
      height={10}
      mt={0.5}
      mb={0.5}
      pt={1}
      pr={0.5}
      pl={0.5}
      pb={1}
    >
      <ButtonCard onClick={handleReview}>
        <Content>
          <Border>
            <Row>
              <Title>{title ? title : 'Draft'}</Title>
              <StatusTag status={status} />
            </Row>
            <ArticleType>{articleType}</ArticleType>
            <Abstract>{abstract ? `Abstract: ${abstract}` : ''}</Abstract>
          </Border>
        </Content>
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
`
const RowStyled = styled(Row)`
  position: absolute;
  right: 37px;
  bottom: 2px;
`
const Content = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-wrap: wrap;
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
`
const Abstract = styled.div`
  font-size: 0.8em;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${th.colorGrey};
`

export default compose(mutations)(UserManuscriptCard)
