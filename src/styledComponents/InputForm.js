import React from 'react'
import styled from 'styled-components'

const InputForm = ({ label, type = 'text' }) => (
  <Root>
    <Label>{label}</Label>
    <Input type={type} />
  </Root>
)

const Root = styled.div`
  margin: 1em 0em;
`
const Label = styled.label`
  margin: 0;
`
const Input = styled.input`
  width: 20em;
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
