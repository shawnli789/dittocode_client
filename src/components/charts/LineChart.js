import { useEffect, useRef } from 'react';
import useChart from '../../hooks/use-chart';
import { Chart } from 'chart.js';

function LineChart(props) {
  const ref = useRef();
  const { toggleDataset } = useChart();

  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: 'line',
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
      data: props.data
    });
    return function cleanup() {
      chart.destroy();
    };
  }, [props.data])

  useEffect(() => {
    const toggles = document.querySelectorAll('[data-toggle="chart"]');
    toggles.forEach(function (toggle) {
      const event = toggle.dataset.trigger;
      toggle.addEventListener(event, function () {
        toggleDataset(toggle);
      });
    });
  }, [toggleDataset])
  
  
  return (
    <div className="card card-fill">
      <div className="card-header">
        <h4 className="card-header-title">
          {props.title}
        </h4>

        {props.tabs}
      </div>

      <div className="card-body">
        <div className="chart" style={{height: props.height}}>
          <canvas ref={ref} id={props.id} className="chart-canvas"></canvas>
        </div>
      </div>
    </div>
  );
}

export default LineChart;

