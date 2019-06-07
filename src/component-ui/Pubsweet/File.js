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
      <WrapperFile>
        <FileInfo>
          <FileName>{name}</FileName>
          <FileSize ml={2}>{size}</FileSize>
        </FileInfo>

        <IconStyle>
          <Icon
            icon={'eye'}
            mr={0.5}
            ml={0.5}
            onClick={() => window.open(signedUrl)}
          />
        </IconStyle>
      </WrapperFile>
    </Root>
  )
}

export default withRouter(File)

const IconStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const WrapperFile = styled.div`
  display: grid;
  grid-template-columns: 85% 15%;
`

const Root = styled.div`
  width: fit-content;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  display: flex;
  border: 1px solid #ccc;
  height: 40px;
  /* width: 50%; */

  ${th.marginHelper}
  ${th.paddingHelper}
`

const FileInfo = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  align-items: center;
  border-right: 1px solid #ccc;
  display: flex;
  height: inherit;
  white-space: nowrap;
  flex: 1;
  justify-content: space-between;
  margin-left: 8px;
`
const FileName = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const FileSize = styled.span`
  font-weight: 700;
  margin: 0px 8px;
`
const Wrapper = styled.div`
  padding-left: 2.5em;
`
