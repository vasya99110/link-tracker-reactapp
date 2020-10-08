import React from 'react'
import RadialBarChart from './RadialBarChart'

const GroupChart = (props) => {
  return (
    <div className="row">
      {props.datacharts.map(function(datachart, index){
        return <div className="col-md-4 text-center" key={index}>
                <div className="card">
                  <div className="card-body">
                    <RadialBarChart value={datachart.value} label={datachart.label===undefined ? '' :(datachart.label)} color={datachart.color} />
                    {datachart.headtitle!==undefined ? (
                    <h5 className="font-b m-t-10">{datachart.headtitle}</h5>
                    ) : '' }
                  </div>
                </div>
              </div>;
      })}
    </div>
  );
};
export default GroupChart;