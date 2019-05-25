import React, { useState } from 'react'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'

const UploadFile = ({ uploadFile }) => {
  const [file, setFile] = useState()
  const handleChange = e => {
    setFile(e.target.files[0])
  }
  const onClick = () =>
    uploadFile({
      variables: {
        file,
        type: file.type,
        size: file.size,
      },
    })
  console.log({ file })
  return (
    <div>
      <input type="file" required onChange={handleChange} />
      <button onClick={onClick}>apasa</button>
    </div>
  )
}

export default compose(mutations)(UploadFile)
