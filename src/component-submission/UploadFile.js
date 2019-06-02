import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { uploadFile } from '../qraphqlClient/mutations'
import { FilePicker, ActionLink, Icon, File } from '../component-ui'
import { useMutation } from 'react-apollo-hooks'
import { useFetching, Loader, th, Row } from '../component-ui'

const useUploadFile = () => {
  const [updatedFile, setFile] = useState()
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

  return { updatedFile, onUploadFile, isFetching }
}

const UploadFile = ({ history, match, currentFile, setFile, file }) => {
  const { onUploadFile, updatedFile, isFetching } = useUploadFile()
  const actualFile = file ? file : currentFile

  useEffect(() => {
    if (!updatedFile) return
    setFile(updatedFile)
  }, [updatedFile])

  return (
    <Root>
      <FilePicker
        allowedFileExtensions={['pdf']}
        onUpload={file => onUploadFile(file)}
      >
        <ActionLink fontSize="12px" fontWeight="bold" size="small">
          <Row justify={'flex-start'}>
            <Icon icon={'upload'} mr={0.5} />
            Upload File <Error>*</Error>
          </Row>
        </ActionLink>
      </FilePicker>

      {isFetching && (
        <Wrapper>
          <Loader iconSize={1} />
        </Wrapper>
      )}

      {actualFile && (
        <File
          mt={0.5}
          data-test-id="form-report-file-item-actions"
          file={actualFile}
        />
      )}
    </Root>
  )
}
const Root = styled.div``

const Wrapper = styled.div`
  padding-left: 2.5em;
`
const Error = styled.div`
  color: ${th.colorError};
  font-size: 0.8em;
`
export default UploadFile
