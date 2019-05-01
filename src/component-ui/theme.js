import { css } from 'styled-components'
import { get } from 'lodash'

const colors = {
  colorBlue: '#1c5367',
  colorBlueLight: '#3E6977',
  colorBlueGray: '#698996',
  colorOrange: '#da9f88',
  colorRed: '#A74143',
  colorGrey: '#5D656C',
  colorGreyLight: '#c1c1c1',
  colorBrick: '#BA6049',
  colorDark: '#222327',
  colorCrem: '#d4c098',
  colorCremLight: '#e1cda4',
  colorWhite: '#fff',
  colorGreenLight: '#77a598',
  colorBrownLight: 'rgba(168, 150, 129,0.7)',
  colorBackground: '#f2ede7',
  colorError: '#BA6049',
  colorYellowLight: '#fef9c7',
  colorYellow: '#fce181',
}

const marginHelper = props => {
  const marginTop = css`
    margin-top: ${props => (get(props, 'mt') ? `${props.mt}em` : '0em')};
  `
  const marginRight = css`
    margin-right: ${props => (get(props, 'mr') ? `${props.mr}em` : '0em')};
  `
  const marginBottom = css`
    margin-bottom: ${props => (get(props, 'mb') ? `${props.mb}em` : '0em')};
  `
  const marginLeft = css`
    margin-left: ${props => (get(props, 'ml') ? `${props.ml}em` : '0em')};
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
    padding-top: ${props => (get(props, 'pt') ? `${props.pt}em` : '0em')};
  `
  const paddingRight = css`
    padding-right: ${props => (get(props, 'pr') ? `${props.pr}em` : '0em')};
  `
  const paddingBottom = css`
    padding-bottom: ${props => (get(props, 'pb') ? `${props.pb}em` : '0em')};
  `
  const paddingLeft = css`
    padding-left: ${props => (get(props, 'pl') ? `${props.pl}em` : '0em')};
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
