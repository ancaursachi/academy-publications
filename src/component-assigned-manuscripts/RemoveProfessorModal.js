import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Button, th, Modal } from '../component-ui'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'
import { queries } from '../qraphqlClient'

const RemoveProfessorModal = ({ manuscript, removeEditorFromManuscript }) => {
  const { _id } = manuscript
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(!showModal)

  const handleReview = () => {
    handleShowModal()
    return removeEditorFromManuscript({
      variables: {
        id: _id,
      },
      refetchQueries: [
        {
          query: queries.getAssignedManuscripts,
        },
        {
          query: queries.getUnassignedManuscripts,
        },
      ],
    })
      .then(() => {})
      .catch(error => {
        alert(error.message)
      })
  }
  return (
    <Fragment>
      <ButtonStyled
        iconName={'times'}
        width={2}
        color={th.colorBrick}
        review
        onClick={handleShowModal}
      />
      <Modal
        showModal={showModal}
        handleShowModal={handleShowModal}
        title={'Do you want to be removed from this manuscript?'}
        buttonName={'Remove'}
        onClickSubmit={handleReview}
      />
    </Fragment>
  )
}

const ButtonStyled = styled(Button)`
  position: absolute;
  bottom: -5px;
  right: 15px;
`

export default compose(mutations)(RemoveProfessorModal)
