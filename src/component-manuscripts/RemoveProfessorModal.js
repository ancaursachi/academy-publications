import React, { Fragment, useState } from 'react'
import { Button, th, Modal } from '../component-ui'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'
import { queries } from '../qraphqlClient'

const RemoveProfessorModal = ({ manuscript, removeEditorFromManuscript }) => {
  const { _id, submissionId } = manuscript
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
          query: queries.getManuscripts,
        },
        {
          query: queries.getSubmission,
          variables: { submissionId },
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
        iconName={'times'}
        width={10}
        name={'Remove Professor'}
        color={th.colorGrey}
        decisionAdmin
        onClick={handleShowModal}
      />
      <Modal
        showModal={showModal}
        handleShowModal={handleShowModal}
        title={'Do you want to remove professor from this manuscript?'}
        buttonName={'Remove'}
        onClickSubmit={handleReview}
      />
    </Fragment>
  )
}

export default compose(mutations)(RemoveProfessorModal)
