import React from 'react'
import styled from 'styled-components'
import th from './theme'

const InputForm = ({
  label,
  type = 'text',
  widthInput,
  required,
  ...props
}) => (
  <Root {...props}>
    <Label>{label}</Label>
    <Input type={type} widthInput={widthInput} required />
  </Root>
)

const Root = styled.div`
  ${th.marginHelper}
  ${th.paddingHelper}
`
const Label = styled.label`
  margin: 0;
`
const Input = styled.input`
  width: ${props => (props.widthInput ? `${props.widthInput}em` : '20em')};
  height: 2.5em;
  padding: 0.5em 0.5em;
  margin: 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
`
export default InputForm
