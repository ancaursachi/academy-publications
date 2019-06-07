import React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'

import th from './theme'
import { Row } from '.'

const InputCheckBox = ({
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
    <Input
      name={name}
      type="checkbox"
      value={value}
      checked={value}
      onChange={onChange}
    />
    <Label labelName={label} required={required} />
  </Root>
)

const Label = ({ labelName, required }) => (
  <Row justify={'flex-start'}>
    <StyledLabel>{renameLabel(labelName)}</StyledLabel>
  </Row>
)

const renameLabel = label => {
  switch (label) {
    case 'public':
      return ' I agree to make public this manuscript after peer review'
    default:
      return label.charAt(0).toUpperCase() + label.slice(1)
  }
}

const Root = styled.div`
  display: flex;
  width: 100%;
  ${th.marginHelper}
  ${th.paddingHelper}
`
const StyledLabel = styled.label`
  margin: 0;
  margin-left: 10px;
`
const Input = styled(Field)`
  margin-top: 3px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
`

export default InputCheckBox
