import React from 'react'
import styled from 'styled-components'
import '../../node_modules/react-vis/dist/style.css'
import { RadialChart } from 'react-vis'

const Custom = ({ data, title }) => {
  return (
    !!data.length && (
      <Root>
        <Label>{title}</Label>
        <RadialChart
          data={data}
          width={300}
          height={300}
          colorType="literal"
          showLabels={true}
          labelsStyle={{ color: 'white', fontSize: 14 }}
          animation
        />
      </Root>
    )
  )
}
const Root = styled.div``
const Label = styled.div`
  display: flex;
  justify-content: center;
  font-size: 21px;
  /* font-weight: 600; */
  /* font-size: 18px; */
  font-weight: 600;
  padding: 16px 0px 0px;
`
export default Custom
