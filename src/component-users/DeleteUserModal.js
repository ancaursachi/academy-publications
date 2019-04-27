import React, { useState, Fragment } from 'react'
import { th, Button, Modal, ModalError } from '../component-ui'
import { mutations } from '../qraphqlClient'
import { compose } from 'recompose'
import styled from 'styled-components'

const DeleteUserModal = ({ deleteUser, user }) => {
  const [error, setError] = useState('')
  const handleSetError = error => setError(error)

  const [showModalError, setShowModalError] = useState(false)
  const handleShowModalError = () => setShowModalError(!showModalError)

  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(!showModal)

  const handleDelete = () => {
    handleSetError('')
    handleShowModal()
  }
  const handleDeleteFinal = () => {
    handleShowModal()
    return deleteUser({
      variables: {
        id: user._id,
      },
    })
      .then(() => {
        window.location.reload()
      })
      .catch(error => {
        handleShowModalError()
        handleSetError(error.message)
      })
  }
  return (
    <Fragment>
      <Root>
        <Button
          iconName={'trash-alt'}
          usersTable
          color={th.colorBrick}
          onClick={handleDelete}
        />
      </Root>
      <Modal
        showModal={showModal}
        handleShowModal={handleShowModal}
        title={'Are you sure you want to delete this manuscript?'}
        buttonName={'Delete'}
        onClickSubmit={handleDeleteFinal}
        error={error}
      />
      <ModalError
        handleShowModal={handleShowModalError}
        showModal={showModalError}
        error={error}
      />
    </Fragment>
  )
}

const Root = styled.div`
  display: flex;
  align-self: center;
`
export default compose(mutations)(DeleteUserModal)
