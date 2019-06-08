import React from 'react'
import { th, Button } from '../../component-ui'
import styled from 'styled-components'

const ChangePage = ({
  currentManuscript,
  totalManuscripts,
  setCurrentManuscript,
}) => {
  const goToPrevPage = () =>
    currentManuscript > 1 && setCurrentManuscript(currentManuscript - 1)
  const goToNextPage = () =>
    currentManuscript < totalManuscripts &&
    setCurrentManuscript(currentManuscript + 1)
  return (
    <ChangeVersion>
      {currentManuscript > 1 && (
        <Button
          mt={1}
          iconLeft
          underline
          name="Prev"
          color={th.colorGrey}
          iconName={'arrow-left'}
          onClick={goToPrevPage}
        />
      )}
      <DisplayCurrentVersion>Version {currentManuscript}</DisplayCurrentVersion>
      {currentManuscript < totalManuscripts && (
        <Button
          mt={1}
          iconRight
          underline
          name="Next"
          color={th.colorGrey}
          iconName={'arrow-right'}
          onClick={goToNextPage}
        />
      )}
    </ChangeVersion>
  )
}
export default ChangePage

const ChangeVersion = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1em;
  font-family: 'Nunito';
`
const DisplayCurrentVersion = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: 800;
  font-family: 'Nunito';
  margin: 16px 11px 0px;
  background-color: ${th.colorWhite};
  padding: 2px 3px;
  border-radius: 4px;
  border: 1px solid ${th.colorBlueLight};
  font-size: 15px;
  color: ${th.colorBlueLight};
  white-space: nowrap;
`
