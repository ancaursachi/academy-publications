import React, { useState } from 'react'
import styled from 'styled-components'
import { uploadFile } from '../qraphqlClient/mutations'
import { FilePicker, ActionLink, Icon, File } from '../component-ui'
import { useMutation } from 'react-apollo-hooks'
import { useFetching, Loader } from '../component-ui'

export const useUploadFile = () => {
  const [file, setFile] = useState()
  const { isFetching, setFetching } = useFetching()
  const useUploadMutation = useMutation(uploadFile)

  const onUploadFile = file => {
    setFetching(true)
    useUploadMutation({
      variables: { file, type: file.type, size: file.size },
    }).then(r => {
      setFile(r.data.uploadFile)
      setFetching(false)
    })
  }

  return { file, onUploadFile, isFetching }
}

const UploadFile = ({ uploadFile }) => {
  const { onUploadFile, file, isFetching } = useUploadFile()
  return (
    <Root>
      <FilePicker
        allowedFileExtensions={['pdf', 'docx', 'doc']}
        onUpload={onUploadFile}
      >
        <ActionLink fontSize="12px" fontWeight="bold" size="small">
          <Icon icon={'upload'} mr={0.5} />
          Upload File
        </ActionLink>
      </FilePicker>

      {isFetching && (
        <Wrapper>
          <Loader iconSize={1} />
        </Wrapper>
      )}

      {file && (
        <File
          mt={0.5}
          data-test-id="form-report-file-item-actions"
          file={file}
        />
      )}
    </Root>
  )
}
const Root = styled.div``

const Wrapper = styled.div`
  padding-left: 2.5em;
`

export default UploadFile
