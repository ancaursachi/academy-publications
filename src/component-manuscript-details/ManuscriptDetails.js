import React, { useEffect } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { get, last } from 'lodash'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { th, Loader, File } from '../component-ui'
const ManuscriptDetails = ({ match, ...rest }) => {
  const { submissionId } = match.params
  const { data, loading } = useQuery(queries.getSubmission, {
    variables: { submissionId },
  })
  console.log(data)
  if (loading) {
    return (
      <Root {...rest}>
        <Loader />
      </Root>
    )
  }

  const manuscript = last(get(data, 'getSubmission', []))
  const file = {
    filename: get(manuscript, 'filename'),
    size: get(manuscript, 'size'),
    url: get(manuscript, 'url'),
  }
  return (
    <Root {...rest}>
      {manuscript && (
        <Card pt={2} pr={2} pl={2} pb={2}>
          <Title>{get(manuscript, 'title')}</Title>
          <ArticleType>{get(manuscript, 'articleType')}</ArticleType>
          <AbstractLabel>Abstract</AbstractLabel>
          <Abstract>{get(manuscript, 'abstract')}</Abstract>
          <AbstractLabel>File</AbstractLabel>
          <File file={file} />
        </Card>
      )}
    </Root>
  )
}
const Card = styled.div`
  background-color: white;
  font-family: 'Nunito';
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '0px')};
  height: fit-content;
  width: 40px;
  width: 50em;
  ${th.marginHelper}
  ${th.paddingHelper}
`
const Root = styled.div`
  display: flex;
  font-family: 'Nunito';
  justify-content: center;

  ${th.marginHelper};
  ${th.paddingHelper};
`
const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${th.colorBrick};
`
const ArticleType = styled.div`
  padding: 7px 0px;
  font-size: 16px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  color: ${th.colorGrey};
  text-overflow: ellipsis;
`
const Abstract = styled.div`
  font-size: 16px;
  padding: 0px 0px 16px;
`
const AbstractLabel = styled.div`
  font-size: 17px;
  font-weight: 600;
  padding: 16px 0px 0px;
`

export default compose()(ManuscriptDetails)
