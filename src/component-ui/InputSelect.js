import React from 'react'
import styled from 'styled-components'

import th from './theme'

const InputSelect = ({
  label,
  type = 'text',
  widthInput,
  options,
  required,
  ...props
}) => (
  <Root {...props}>
    <Label>{label}</Label>
    <Select type={type} widthInput={widthInput} required>
      {options.map((option, index) => (
        <Option key={index} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  </Root>
)

const Root = styled.div`
  ${th.marginHelper}
  ${th.paddingHelper}
`
const Label = styled.label`
  margin: 0;
`
const Select = styled.select`
  width: ${props => (props.widthInput ? `${props.widthInput}em` : '19em')};
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
const Option = styled.option``

export default InputSelect
