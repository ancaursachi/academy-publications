import React, { useState, Fragment } from 'react'
import { Button, ModalComponent } from '../component-ui'
import { mutations } from '../qraphqlClient'
import { compose } from 'recompose'
import styled from 'styled-components'
import { EditUser } from '../component-users'

const EditUserModal = ({ user }) => {
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(!showModal)

  return (
    <Fragment>
      <Root>
        <Button iconName={'pencil-alt'} usersTable onClick={handleShowModal} />
      </Root>
      <ModalComponent
        showModal={showModal}
        handleShowModal={handleShowModal}
        user={user}
        component={EditUser}
      />
    </Fragment>
  )
}
const Root = styled.div`
  display: flex;
  align-self: center;
`
export default compose(mutations)(EditUserModal)
