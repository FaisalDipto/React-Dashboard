import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, StackingColumnSeries, Tooltip, Legend, Category } from '@syncfusion/ej2-react-charts';
import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/dummy'; // Import your series data

const Stacked = ({ width, height }) => {
  console.log('stackedCustomSeries:', stackedCustomSeries);
  const Output2 = (
    <ChartComponent
      width={width}
      height={height}
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      chartArea={{ border: { width: 0 }}}
      tooltip={{ enable: true }}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
      <SeriesCollectionDirective>
        {stackedCustomSeries.map((item, index) => {
          console.log(`dataSource for series ${index}:`, item.dataSource);
          return <SeriesDirective key={index} dataSource={item.dataSource} xName={item.xName} yName={item.yName} type={item.type} background={item.background} name={item.name}/>;
          })
        }
      </SeriesCollectionDirective>
    </ChartComponent>
  )

  return Output2;
}

export default Stacked;
