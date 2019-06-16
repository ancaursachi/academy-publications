import React from 'react'
import styled from 'styled-components'
import { DetailsCard, th } from '../../component-ui'

import { VersionsChart } from '../../component-charts'
const ActualManuscriptOverview = ({ submission, ...rest }) => {
  const dataVersion = submission.map(manuscript => ({
    x: manuscript.created,
    y: manuscript.version,
  }))
  return (
    <Root>
      <Wrapper>
        <Column />
        <DetailsCard>
          <Title>Overview</Title>
          <VersionsChart data={dataVersion} />
        </DetailsCard>
        <Column />
      </Wrapper>
    </Root>
  )
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;
`

const Root = styled.div`
  height: calc(100vh - 90px);
  padding-top: 50px;
  overflow: scroll;
  font-family: 'Nunito';
`
const Column = styled.div``

const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: ${th.colorBlueLight};
`
export default ActualManuscriptOverview
