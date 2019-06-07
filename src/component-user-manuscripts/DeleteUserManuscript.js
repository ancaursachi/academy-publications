import React, { Fragment, useState } from 'react'
import { Button, th, Modal } from '../component-ui'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'
import { queries } from '../qraphqlClient'

const DeleteUserManuscript = ({ manuscript, deleteManuscript }) => {
  const { submissionId } = manuscript
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(!showModal)

  const handleReview = () => {
    handleShowModal()
    return deleteManuscript({
      variables: {
        submissionId,
      },
      refetchQueries: [
        {
          query: queries.getUserManuscripts,
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
      <Button
        width={1}
        decisionAdmin
        iconName={'trash-alt'}
        color={th.colorBrick}
        onClick={handleShowModal}
      />
      <Modal
        showModal={showModal}
        handleShowModal={handleShowModal}
        title={'Do you want to delete this manuscript?'}
        buttonName={'Delete'}
        onClickSubmit={handleReview}
      />
    </Fragment>
  )
}

export default compose(mutations)(DeleteUserManuscript)
