import styled from 'styled-components'
import CanvasJSReact from '../lib/canvasjs.react'
import React from 'react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const Pie = ({ title, data }) => {
  console.log(data)
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: title,
    },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}',
        dataPoints: data,
      },
    ],
  }
  return (
    <Root>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </Root>
  )
}

const Root = styled.div``
export default Pie
