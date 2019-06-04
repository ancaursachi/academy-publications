import React, { useState } from 'react'
import { Card, Row, th, Button, Modal, StatusTag } from '../component-ui'
import styled from 'styled-components'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'
import { queries } from '../qraphqlClient'

const ManuscriptCardUnassigned = ({
  manuscript: { _id, title, abstract, articleType, status },
  addEditorOnManuscript,
}) => {
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(!showModal)

  const handleReview = () => {
    handleShowModal()
    return addEditorOnManuscript({
      variables: {
        id: _id,
      },
      refetchQueries: [
        {
          query: queries.getUnassignedManuscripts,
        },
        {
          query: queries.getAssignedManuscripts,
        },
      ],
    })
      .then(() => {})
      .catch(error => {
        alert(error.message)
      })
  }

  return (
    <StyledCard>
      <Border>
        <Row>
          <Title>{title}</Title>
          <StatusTag status={status} />
        </Row>
        <ArticleType>{articleType}</ArticleType>
        <Abstract>{abstract}</Abstract>
        <RowStyled justify="flex-end" alignItems="flex-end">
          <Button
            iconName={'check'}
            reviewManuscript
            color={th.colorGreenLight}
            onClick={handleShowModal}
          />
        </RowStyled>
      </Border>
      <Modal
        showModal={showModal}
        handleShowModal={handleShowModal}
        title={'Do you want to review this manuscript?'}
        buttonName={'Review'}
        onClickSubmit={handleReview}
      />
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  position: relative;
  border-radius: 5px;
  font-family: 'Nunito';
  padding: 1em;
  margin: 1em 0em;
`
const RowStyled = styled(Row)`
  position: relative;
`

const Border = styled.div`
  height: 100%;
  width: 100%;
  border-style: solid;
  border-color: ${th.colorCremLight};
  border-width: 1px;
  border-radius: 5px;
  padding: 1em;
`
const Title = styled.div`
  font-size: 1.3em;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${th.colorBlue};
`
const ArticleType = styled.div`
  font-size: 0.9em;
  padding-bottom: 0.7em;
`

const Abstract = styled.div`
  font-size: 14px;
  width: 100%;
`

export default compose(mutations)(ManuscriptCardUnassigned)
