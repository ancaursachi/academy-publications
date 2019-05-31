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
    <Card
      borderRadius={'5px 5px 5px 5px'}
      width={45}
      height={10}
      mt={0.5}
      mb={0.5}
      pt={1}
      pr={1}
      pl={1}
      pb={1}
    >
      <Content>
        <Border>
          <Row>
            <Title>{title}</Title>
            <StatusTag status={status} />
          </Row>
          <ArticleType>{articleType}</ArticleType>
          <Abstract>Abstract: {abstract}</Abstract>
          <Row justify="flex-end" alignItems="flex-end" mt={0.5}>
            <Button
              iconName={'check'}
              decisionDash
              color={th.colorGreenLight}
              onClick={handleShowModal}
            />
          </Row>
        </Border>
      </Content>
      <Modal
        showModal={showModal}
        handleShowModal={handleShowModal}
        title={'Do you want to review this manuscript?'}
        buttonName={'Review'}
        onClickSubmit={handleReview}
      />
    </Card>
  )
}

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
  font-size: 0.8em;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${th.colorGrey};
`

export default compose(mutations)(ManuscriptCardUnassigned)
