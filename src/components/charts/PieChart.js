import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import useChart from '../../hooks/use-chart';

function PieChart(props) {
  const ref = useRef();
  const legendRef = useRef();
  const { toggleLegend } = useChart();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: 'doughnut',
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (value) {
                if (props.data.values) {
                  let sum = 0;
                  for (const v of props.data.values) {
                    sum += v;
                  }
                  return (value.parsed / sum * 100).toFixed(2) + " %"
                }
              }
            },
          },
        },
      },
      data: props.data
    });
    toggleLegend(ref.current)
    return function cleanup() {
      chart.destroy();
    };
  }, [toggleLegend, props.data, props.backgroundColor])


  return (
    <div className="card card-fill">
      <div className="card-header">
        <h4 className="card-header-title">
          {props.title}
        </h4>
      </div>

      <div className="card-body">
        <div className="chart chart-appended" style={{height: props.height}}>
          <canvas ref={ref} className="chart-canvas" data-toggle="legend" data-target={props.dataTarget}></canvas>
        </div>
        <div ref={legendRef} id={props.legendId} className="chart-legend" />
      </div>
    </div>
  );

}

export default PieChart;