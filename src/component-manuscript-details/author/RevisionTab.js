import React from 'react'
import styled from 'styled-components'
import { th, Loader } from '../../component-ui'
import { RevisionManuscriptCard } from '..'
const RevisionTab = ({
  submission,
  totalManuscripts,
  currentManuscript,
  setCurrentManuscript,
  ...rest
}) => {
  const manuscript = submission[currentManuscript - 1]

  return (
    <Root {...rest}>
      <Wrapper>
        <Column />
        {!manuscript ? (
          <RootLoader {...rest}>
            <Loader iconSize={2} />
          </RootLoader>
        ) : (
          <Container>
            <RevisionManuscriptCard manuscript={manuscript} mb={2} />
          </Container>
        )}
        <Column />
      </Wrapper>
    </Root>
  )
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
  margin-top: 1em;
`

const Root = styled.div`
  overflow: scroll;
  height: calc(100vh - 90px);
  font-family: 'Nunito';

  ${th.marginHelper};
  ${th.paddingHelper};
`
const Container = styled.div``
const Column = styled.div``

const RootLoader = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Nunito';
  ${th.marginHelper};
  ${th.paddingHelper};
`
export default RevisionTab
