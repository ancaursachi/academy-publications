import { get } from 'lodash'
import styled, { css } from 'styled-components'
import th from './theme'
const IconSize = props => {
  const iconSize = css`
    width: ${props => (get(props, 'iconSize') ? `${props.iconSize}em` : '3em')};
    height: ${props =>
      get(props, 'iconSize') ? `${props.iconSize}em` : '3em'};
  `
  return css`
    ${iconSize};
  `
}
const Loader = styled.div`
  border-radius: 100%;
  position: relative;
  :before,
  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 3px solid transparent;
    border-top-color: ${th.colorBlue};
  }
  :before {
    z-index: 100;
    animation: spin 1s infinite;
  }
  :after {
    border: 3px solid ${th.colorGreyLight};
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  ${IconSize};
`
export default Loader
