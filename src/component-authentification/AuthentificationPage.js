import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, th } from '../component-ui'
import { Login, Intro, SignUp } from '../component-authentification'

const AuthentificationPage = () => {
  const [logInPage, setLogInPage] = useState(true)

  const handleChangePage = () => {
    setLogInPage(!logInPage)
  }

  return (
    <Root>
      <Card
        backgroundColor={th.colorPrimary}
        width={20}
        borderRadius={'5px 0px 0px 5px'}
        pl={2}
        pr={2}
      >
        <Intro />
      </Card>

      {logInPage ? (
        <Card borderRadius={'0px 5px 5px 0px'} pl={2.5} pr={2} pt={2.5}>
          <Login handleChangePage={handleChangePage} />
        </Card>
      ) : (
        <Card borderRadius={'0px 5px 5px 0px'} pl={2} pr={2} pt={2} pb={2}>
          <SignUp handleChangePage={handleChangePage} />
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
