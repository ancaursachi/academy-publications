import React from 'react'
import styled from 'styled-components'
import { th } from '../component-ui'
import { get } from 'lodash'
import { useQuery } from 'react-apollo-hooks'
import { queries } from '../qraphqlClient'

const PDFViewer = ({ match, history, ...rest }) => {
  const { manuscriptId } = match.params
  const { data, loading } = useQuery(queries.getManuscript, {
    variables: { _id: manuscriptId },
  })
  const manuscript = get(data, 'manuscript', null)
  const providerKey = get(manuscript, 'file.providerKey', null)

  console.log(providerKey)
  // const providerKey = get(file, 'providerKey', null)
  // const { data, loading } = useQuery(queries.getSignedUrl, {
  //   variables: { providerKey },
  // })
  return <Root {...rest}>aici va fi pdf</Root>
}

export default PDFViewer

// #region styles
const Root = styled.div`
  display: flex;
  font-family: 'Nunito';
  justify-content: center;
  flex-wrap: wrap;
  ${th.marginHelper};
  ${th.paddingHelper};
`
// #endregion
