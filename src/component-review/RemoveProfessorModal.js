import React, { Fragment, useState } from 'react'
import { Button, th, Modal } from '../component-ui'

const RemoveProfessorModal = ({ manuscript }) => {
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(!showModal)

  const handleReview = () => {
    handleShowModal()
  }
  return (
    <Fragment>
      <Button
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

export default RemoveProfessorModal
