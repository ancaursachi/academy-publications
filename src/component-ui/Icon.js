import React from 'react'
import styled from 'styled-components'
import th from './theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Icon = ({ icon, color, onClick = () => {}, ...rest }) => (
  <StyledIcon icon={icon} color={color} {...rest} onClick={onClick} />
)

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  ${th.marginHelper};
  ${th.paddingHelper};
`
export default Icon
