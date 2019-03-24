import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, th } from '../styledComponents'
import { Login, Intro, Register } from '../authentification'

const AuthentificationPage = () => {
  const [logInPage, setLogInPage] = useState(true)
  function handleChangePage() {
    setLogInPage(!logInPage)
  }
  return (
    <Root>
      <Card
        backgroundColor={th.colorPrimary}
        width={20}
        borderRadius={'5px 0px 0px 5px'}
      >
        <Intro />
      </Card>
      {logInPage ? (
        <Card borderRadius={'0px 5px 5px 0px'}>
          <Login handleChangePage={handleChangePage} />
        </Card>
      ) : (
        <Card borderRadius={'0px 5px 5px 0px'}>
          <Register handleChangePage={handleChangePage} />
        </Card>
      )}
    </Root>
  )
}

export default AuthentificationPage

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
