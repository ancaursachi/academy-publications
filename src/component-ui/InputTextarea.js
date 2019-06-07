import React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'

import th from './theme'
import { Row } from '../component-ui'

const InputTextarea = ({
  label,
  value,
  name,
  onChange,
  required,
  validate,
  error = null,
  heightinput = null,
  fontSize,
  type = 'text',
  ...props
}) => (
  <Root {...props}>
    <Label labelName={label} required={required} />
    <Textarea
      name={name}
      type={type}
      heightinput={heightinput}
      value={value}
      fontSize={fontSize}
      onChange={onChange}
      validate={validate}
      component="textarea"
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
  position: relative;
  ${th.marginHelper}
  ${th.paddingHelper}
`
const StyledLabel = styled.label`
  margin: 0;
`
const Textarea = styled(Field)`
  width: 100%;
  min-height: ${props =>
    props.heightinput ? `${props.heightinput}em` : '5em'};
  max-height: ${props =>
    props.heightinput ? `${props.heightinput}em` : '5em'};
  padding: 0.5em 0.5em;
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : 'inherit')};
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
export default InputTextarea
