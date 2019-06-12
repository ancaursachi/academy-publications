import React from 'react'
import styled from 'styled-components'
import { th, Loader } from '../component-ui'
import { get } from 'lodash'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { DataLabel } from '../component-charts'

const searchArticleType = (lastVersionManuscripts, artType) => {
  if (!artType) {
    const lenghtMan = lastVersionManuscripts.filter(manuscript =>
      ['reject'].includes(manuscript.status),
    ).length
    return { [artType]: lenghtMan }
  }
  const lenghtMan = lastVersionManuscripts
    .filter(manuscript => ['reject'].includes(manuscript.status))
    .filter(m => [artType].includes(m.articleType)).length
  return { [artType]: lenghtMan }
}

const Charts = ({ ...rest }) => {
  const { data, loading } = useQuery(queries.getLastVersionManuscripts)
  const lastVersionManuscripts = get(data, 'lastVersionManuscripts', [])

  const ceva = searchArticleType(lastVersionManuscripts, 'Research article')
  const ceva2 = searchArticleType(lastVersionManuscripts, false)
  console.log(ceva)
  console.log({ ceva2 })
  if (!lastVersionManuscripts) {
    return (
      <RootLoader>
        <Loader iconSize={2} />
      </RootLoader>
    )
  }
  return (
    <Root {...rest}>
      <Column />
      <Column>
        <DataLabel title={'Manuscripts on the app'} />
      </Column>
      <Column />
    </Root>
  )
}
const Root = styled.div`
  overflow: scroll;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  font-family: 'Nunito';
  ${th.marginHelper};
  ${th.paddingHelper};
`
const Column = styled.div``
const RootLoader = styled.div`
  padding-top: 25px;
  display: flex;
  justify-content: center;
  font-family: 'Nunito';
`
export default Charts
