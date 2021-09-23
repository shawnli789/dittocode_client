import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

function BarChart(props) {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: 'bar',
      options: {
        scales: {
          y: {
            ticks: {
              stepSize: 2,
              callback: function (val) {
                return val;
              },
            },
          },
        },
      },
      data: props.data,
    });
    return function cleanup() {
      chart.destroy();
    };

  })

  return (
    <div className="card card-fill">
      <div className="card-header">
        <h4 className="card-header-title">
          {props.title}
        </h4>
      </div>

      <div className="card-body">
        <div className="chart"  style={{height: props.height}}>
          <canvas ref={ref} className="chart-canvas"></canvas>
        </div>
      </div>
    </div>
  );
}

export default BarChart;

