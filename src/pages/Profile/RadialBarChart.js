import React from 'react'
import Chart from 'react-apexcharts'

const RadialBarChart = (props) => {
  return (
    <div className="radial-bar-chart">
      <Chart options={{
          plotOptions: {
            radialBar: {
                hollow: {
                    size: props.value+'%',
                }
            },
          },
          stroke: {
              lineCap: "round"
          },
          labels: [props.label===undefined ? '' :(props.label)],
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "vertical",
              gradientToColors: [props.color],
              stops: [0, 100]
            }
          },
        }} series={[props.value]} type="radialBar" height={props.height}
      />
    </div>
  );
};
// Specifies the default values for props:
RadialBarChart.defaultProps = {
  height: '380',
  color: '#87D4F9'
};
export default RadialBarChart;