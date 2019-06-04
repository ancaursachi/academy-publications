import React from 'react'
import { get } from 'lodash'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { useQuery } from 'react-apollo-hooks'

import th from '../theme'
import { Icon, Loader } from '../../component-ui'
import { queries } from '../../qraphqlClient'

const parseFileSize = size => {
  const kbSize = size / 1000
  const mbSize = kbSize / 1000
  const gbSize = mbSize / 1000

  if (Math.floor(gbSize)) {
    return `${Math.floor(gbSize)} GB`
  } else if (Math.floor(mbSize)) {
    return `${Math.floor(mbSize)} MB`
  } else if (Math.floor(kbSize)) {
    return `${Math.floor(kbSize)} kB`
  }
  return `${size} bytes`
}
const File = ({ file, onClick = () => {}, history, ...rest }) => {
  const name = get(file, 'name', '')
  const size = parseFileSize(get(file, 'size'))
  const providerKey = get(file, 'providerKey', null)
  const { data, loading } = useQuery(queries.getSignedUrl, {
    variables: { providerKey },
  })

  if (loading) {
    return (
      <Wrapper>
        <Loader iconSize={1} />
      </Wrapper>
    )
  }

  const signedUrl = get(data, 'signedUrl')

  return (
    <Root {...rest}>
      <FileInfo>
        {name}
        <FileSize ml={2}>{size}</FileSize>
      </FileInfo>

      <Icon
        icon={'eye'}
        mr={0.5}
        ml={0.5}
        onClick={() => window.open(signedUrl)}
      />
    </Root>
  )
}

export default withRouter(File)

const Root = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 4px;
  display: flex;
  border: 1px solid #ccc;
  height: 40px;
  width: fit-content;
  white-space: nowrap;
  ${th.marginHelper}
  ${th.paddingHelper}
`

const FileInfo = styled.div`
  align-items: center;
  border-right: 1px solid #ccc;
  display: flex;
  height: inherit;
  flex: 1;
  justify-content: space-between;
  margin-left: 8px;
`

const FileSize = styled.span`
  font-weight: 700;
  margin: 0px 8px;
`
const Wrapper = styled.div`
  padding-left: 2.5em;
`
