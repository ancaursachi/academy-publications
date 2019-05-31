import React from 'react'
import styled from 'styled-components'
import th from './theme'

const StatusTag = ({ status }) => <Status>{status}</Status>

const Status = styled.div`
  background-color: ${th.colorWhite};
  padding: 2px 3px;
  border-radius: 4px;
  border: 1px solid ${th.colorBlueLight};
  font-size: 15px;
  color: ${th.colorBlueLight};
  white-space: nowrap;
`
export default StatusTag
