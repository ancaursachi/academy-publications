import React from 'react'
import styled from 'styled-components'
import { Row } from '../component-ui'
import { Field } from 'formik'

import th from './theme'

const InputSelect = ({
  label,
  name,
  options,
  required,
  widthInput,
  type = 'text',
  error = null,
  ...props
}) => (
  <Root {...props}>
    <Label labelName={label} required={required} />

    <Select type={type} widthinput={widthInput} component="select" name={name}>
      {options.map((option, index) => (
        <Option key={index} value={option}>
          {renameSelectOption(option)}
        </Option>
      ))}
    </Select>

    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Root>
)

const renameSelectOption = option => {
  switch (option) {
    case 'articleType':
      return 'Article Type'
    case 'firstName':
      return 'First Name'
    case 'lastName':
      return 'Last Name'

    default:
      return option.charAt(0).toUpperCase() + option.slice(1)
  }
}

const Label = ({ labelName, required }) => (
  <Row justify={'flex-start'}>
    <StyledLabel>{labelName}</StyledLabel>
    {required && <Error>*</Error>}
  </Row>
)

const Root = styled.div`
  width: 100%;
  position: relative;
  ${th.marginHelper}
  ${th.paddingHelper}
`
const StyledLabel = styled.label`
  margin: 0;
`
const Select = styled(Field)`
  width: 100%
  height: 2.5em;
  padding: 0.5em 0.5em;
  margin: 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  background-color: white;
`
const ErrorMessage = styled.div`
  position: absolute;
  color: ${th.colorError};
  font-size: 0.8em;
`
const Error = styled.div`
  color: ${th.colorError};
  font-size: 0.8em;
`
const Option = styled.option``

export default InputSelect
