import React from 'react'
import { Card, Button, Row } from '../../component-ui'
import styled from 'styled-components'
import th from '../theme'

const ModalComponent = ({
  user,
  showModal,
  handleShowModal,
  component: Component,
}) => {
  return (
    <Wrapper showModal={showModal}>
      <Root showModal={showModal} top="20%">
        <Card
          borderRadius={'5px 5px 5px 5px'}
          pt={0.5}
          pr={0.5}
          pl={1.5}
          pb={5.5}
          width={26}
          height={23}
        >
          <CloseItem>
            <Button
              iconName={'times'}
              decisionDash
              onClick={handleShowModal}
              color={th.colorGrey}
            />
          </CloseItem>

          <Component
            user={user}
            handleShowModal={handleShowModal}
            showModal={showModal}
          />

          {/* <Row mt={0.5}>
            <Button name="Close" underline onClick={handleShowModal} />
            <Button
              name={buttonSubmitName || 'Review'}
              underline
              iconName={'arrow-right'}
              mr={1.5}
              onClick={onClickSubmit}
            />
          </Row> */}
        </Card>
      </Root>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  display: ${props => (props.showModal ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
`
const Root = styled.div`
  z-index: 5;
  font-size: 1.2em;
  position: fixed;
  display: ${props => (props.showModal ? 'block' : 'none')};
  background-color: ${th.colorWhite};
  border-radius: 5px;
  left: 33%;
  top: ${props => (props.top ? props.top : '35%')};
`

const CloseItem = styled.div`
  width: 100;
  display: flex;
  justify-content: flex-end;
`

export default ModalComponent
