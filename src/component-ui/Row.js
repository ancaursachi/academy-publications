import styled from 'styled-components'
import th from './theme'

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${props =>
    props.justify ? props.justify : 'space-between'};
  align-items: ${props => (props.align ? props.align : 'center')};
  ${th.marginHelper}
  ${th.paddingHelper}
`

export default Row
