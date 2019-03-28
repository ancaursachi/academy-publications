import { css } from 'styled-components'
import { get } from 'lodash'

const colors = {
  colorPrimary: '#4b5b82',
  colorSecondary: '#d46865',
  colorThird: '#3a2933',
}

const marginHelper = props => {
  const marginTop = css`
    margin-top: ${props => (get(props, 'mt') ? `${get(props, 'mt')}em` : '0m')};
  `
  const marginRight = css`
    margin-right: ${props =>
      get(props, 'mr') ? `${get(props, 'mr')}em` : '0m'};
  `
  const marginBottom = css`
    margin-bottom: ${props =>
      get(props, 'mb') ? `${get(props, 'mb')}em` : '0m'};
  `
  const marginLeft = css`
    margin-left: ${props =>
      get(props, 'ml') ? `${get(props, 'ml')}em` : '0m'};
  `

  return css`
    ${marginTop};
    ${marginRight};
    ${marginBottom};
    ${marginLeft};
  `
}

export const paddingHelper = props => {
  const paddingTop = css`
    padding-top: ${props =>
      get(props, 'pt') ? `${get(props, 'pt')}em` : '0m'};
  `
  const paddingRight = css`
    padding-right: ${props =>
      get(props, 'pr') ? `${get(props, 'pr')}em` : '0m'};
  `
  const paddingBottom = css`
    padding-bottom: ${props =>
      get(props, 'pb') ? `${get(props, 'pb')}em` : '0m'};
  `
  const paddingLeft = css`
    padding-left: ${props =>
      get(props, 'pl') ? `${get(props, 'pl')}em` : '0m'};
  `
  return css`
    ${paddingTop};
    ${paddingRight};
    ${paddingBottom};
    ${paddingLeft};
  `
}

const theme = {
  ...colors,
  marginHelper,
  paddingHelper,
}

export default theme
