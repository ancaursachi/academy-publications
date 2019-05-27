import React, { useState, useEffect } from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import * as anca from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { mutations } from '../qraphqlClient'

const UploadFile = ({ uploadFile }) => {
  const [file, setFile] = useState()
  const handleChange = e => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    if (!file) return
    uploadFile({
      variables: {
        file,
        type: file.type,
        size: file.size,
      },
    })
  }, [file])

  return (
    <Root>
      <input type="file" required onChange={handleChange} />
    </Root>
  )
}

export default compose(mutations)(UploadFile)
const Root = styled.div`
  height: calc(${th('gridUnit')} * 16);
`
