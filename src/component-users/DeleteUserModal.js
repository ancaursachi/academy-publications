import React, { useState, Fragment } from 'react'
import { th, Button, Modal } from '../component-ui'
import { mutations } from '../qraphqlClient'
import { compose } from 'recompose'

const DeleteUserModal = ({ deleteUser, user }) => {
  const [error, setError] = useState('')
  const handleSetError = error => setError(error)

  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(!showModal)

  const handleDelete = () => {
    handleSetError('')
    handleShowModal()
  }

  const handleDeleteFinal = () => {
    return deleteUser({
      variables: {
        id: user._id,
      },
    })
      .then(() => {
        window.location.reload()
      })
      .catch(error => {
        handleSetError(error.message)
      })
  }
  return (
    <Fragment>
      <Button
        iconName={'trash-alt'}
        usersTable
        color={th.colorBrick}
        onClick={handleDelete}
      />
      <Modal
        showModal={showModal}
        handleShowModal={handleShowModal}
        title={'Are you sure you want to delete this manuscript?'}
        buttonName={'Delete'}
        onClickSubmit={handleDeleteFinal}
        error={error}
      />
    </Fragment>
  )
}
export default compose(mutations)(DeleteUserModal)
