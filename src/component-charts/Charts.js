import React from 'react'
import styled from 'styled-components'
import { th, Loader, Row } from '../component-ui'
import { get } from 'lodash'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { Custom, VersionsChart } from '../component-charts'

const CustomPie = (lastVersionManuscripts, type) => {
  const articles = []

  const angle1 = lastVersionManuscripts.filter(
    manuscript =>
      ['publish'].includes(manuscript.status) &&
      type.includes(manuscript.articleType),
  ).length
  angle1 &&
    articles.push({
      angle: angle1,
      label: `Published - ${angle1}`,
      color: '#84a577',
    })

  const angle2 = lastVersionManuscripts.filter(
    manuscript =>
      ['reject'].includes(manuscript.status) &&
      type.includes(manuscript.articleType),
  ).length

  angle2 &&
    articles.push({
      angle: angle2,
      label: `Rejected - ${angle2}`,
      color: '#BA6049',
    })

  const angle3 = lastVersionManuscripts.filter(
    manuscript =>
      !['publish', 'reject'].includes(manuscript.status) &&
      type.includes(manuscript.articleType),
  ).length

  angle3 &&
    articles.push({
      angle: angle3,
      label: `In review process - ${angle3}`,
      color: '#12939a',
    })

  return articles
}

const CustomPieAllTypes = lastVersionManuscripts => {
  const researchArticles = []

  let angle1 = lastVersionManuscripts.filter(manuscript =>
    ['publish'].includes(manuscript.status),
  ).length
  angle1 &&
    researchArticles.push({
      angle: angle1,
      label: `Published - ${angle1}`,
      color: '#84a577',
    })

  let angle2 = lastVersionManuscripts.filter(manuscript =>
    ['reject'].includes(manuscript.status),
  ).length
  angle2 &&
    researchArticles.push({
      angle: angle2,
      label: `Rejected - ${angle2}`,
      color: '#BA6049',
    })

  let angle3 = lastVersionManuscripts.filter(
    manuscript => !['publish', 'reject'].includes(manuscript.status),
  ).length
  angle3 &&
    researchArticles.push({
      angle: angle3,
      label: `In review process - ${angle3}`,
      color: '#12939a',
    })

  return researchArticles
}

const Charts = ({ ...rest }) => {
  const { data, loading } = useQuery(queries.getLastVersionManuscripts)
  const lastVersionManuscripts = get(data, 'lastVersionManuscripts', [])

  if (!lastVersionManuscripts && loading) {
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
        <TitlePage>Overview</TitlePage>
        <hr />
        <Row justify={'space-around'}>
          <Custom
            title={'All manuscripts on the app'}
            data={CustomPieAllTypes(lastVersionManuscripts)}
          />
          <Custom
            title={'Research Article'}
            data={CustomPie(lastVersionManuscripts, ['Research article'])}
          />
        </Row>
        <Row justify={'space-around'} mt={1}>
          <Custom
            title={'Review Article'}
            data={CustomPie(lastVersionManuscripts, ['Review article'])}
          />
          <Custom
            title={'Case Studies'}
            data={CustomPie(lastVersionManuscripts, ['Case studies'])}
          />
        </Row>
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
const TitlePage = styled.div`
  font-family: 'Nunito';
  font-size: 1.6em;
  font-weight: 600;
  width: 100%;
  color: ${th.colorBlue};
`

export default Charts
