import React from 'react'
import { get } from 'lodash'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { Icon } from '../../component-ui'
import th from '../theme'

const parseFileSize = file => {
  const size = get(file, 'size')
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
const File = ({ file, history, ...rest }) => {
  const fileSize = parseFileSize(file)
  console.log(file)
  return (
    <Root {...rest}>
      <FileInfo>
        {file.filename}
        <FileSize ml={2}>{fileSize}</FileSize>
      </FileInfo>

      <Icon
        icon={'eye'}
        mr={0.5}
        ml={0.5}
        onClick={() => console.log('am apasat aici')}
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
  position: relative;
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
