import React from 'react';
import { LineChart } from 'davi-js'

// const style = {
//   height: 'calc(100% - 74px);',
//   padding: '0px 8px 8px 8px;',
//   position: 'relative;'
// }

export const Loading = () => (
  <LineChart
    showAxes={false}
    showLegend={false}
    showHorizontalGridLines={false}
    yMin={-1}
    yMax={1}
    data={[{ data: [{ x: 0, y: 0 }, { x: 1, y: 0 }] }]}
  />
)