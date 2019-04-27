import React, { useState, Fragment } from 'react'
import { th, Button, Modal } from '../component-ui'
import { mutations } from '../qraphqlClient'
import { compose } from 'recompose'
import styled from 'styled-components'

const EditUserModal = ({ user }) => {
  const [error, setError] = useState('')
  const handleSetError = error => setError(error)

  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(!showModal)

  const handleEdit = user => {
    handleSetError('')
    handleShowModal()
  }
  return (
    <Fragment>
      <Root>
        <Button iconName={'pencil-alt'} usersTable onClick={handleEdit} />
      </Root>
      <Modal
        showModal={showModal}
        handleShowModal={handleShowModal}
        title={'Are you sure you want to edit this manuscript?'}
        buttonName={'Edit'}
        // onClickSubmit={handleDeleteFinal}
        error={error}
      />
    </Fragment>
  )
}
const Root = styled.div`
  display: flex;
  align-self: center;
`
export default compose(mutations)(EditUserModal)
