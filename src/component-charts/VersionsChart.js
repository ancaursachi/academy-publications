import React from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineMarkSeries,
} from 'react-vis'
import '../../node_modules/react-vis/dist/style.css'

const VersionsChart = ({ data }) => {
  return (
    <XYPlot xType="time" width={300} height={300}>
      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis title="Date" />
      <YAxis title="Version" />
      <LineMarkSeries data={data} curve={'curveMonotoneX'} />
    </XYPlot>
  )
}
export default VersionsChart
