import React from 'react';
import { SparklineComponent, Inject, SparklineTooltip } from '@syncfusion/ej2-react-charts';

const SparkLine = ({ id, height, width, color, data, type, currentColor }) => {
  // Map the data to transform each object to the expected format
  const formattedData = data.map(item => ({ x: item.x, y: item.yval }));
console.log("Inside Sparkline: ", width);
console.log("Inside Sparkline Data:",  data);
  const Output = (
    <SparklineComponent
      id={id}
      height={height}
      width={width}
      lineWidth={1}
      valueType="Numeric"
      fill={color}
      border={{ color: currentColor, width: 2 }}
      dataSource={formattedData}
      xName="x"
      yName="y"
      type={type}
      tooltipSettings={{
        visible: true,
        format: '${x} : ${y}',
        trackLineSettings: {
          visible: true,
        }
      }}
    >
      <Inject services={[SparklineTooltip]} />
    </SparklineComponent>
  );
  console.log("Output: ", Output);
  return Output;
}

export default SparkLine;
