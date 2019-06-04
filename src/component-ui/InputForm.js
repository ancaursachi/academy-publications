import React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'

import th from './theme'
import { Row } from '../component-ui'

const InputForm = ({
  label,
  value,
  name,
  onChange,
  required,
  validate,
  error = null,
  widthInput = null,
  type = 'text',
  ...props
}) => (
  <Root {...props}>
    <Label labelName={label} required={required} />
    <Input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      validate={validate}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Root>
)

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
const Input = styled(Field)`
  width: 100%;
  height: 2.5em;
  padding: 0.5em 0.5em;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
`

const Error = styled.div`
  color: ${th.colorError};
  font-size: 0.8em;
`
const ErrorMessage = styled.div`
  position: absolute;
  color: ${th.colorError};
  font-size: 0.8em;
`
export default InputForm
