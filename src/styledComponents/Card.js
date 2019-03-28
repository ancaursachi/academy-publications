import styled from 'styled-components'
import th from './theme'

const Card = styled.div`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'white'};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: ${props => (props.width ? `${props.width}em` : '25em')};
  height: ${props => (props.height ? `${props.height}em` : '25em')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '0px')};

  ${th.marginHelper}
  ${th.paddingHelper}
`

export default Card
