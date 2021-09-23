import LineChart from '../charts/LineChart'
function MockLineChart(props) {
  const data = {
    labels: ['8/15', '8/16', '8/17', '8/18', '8/19', '8/20', '8/21', '8/22', '8/23', '8/24'], 
    datasets: [
      {
        labels: ['8/15', '8/16', '8/17', '8/18', '8/19', '8/20', '8/21', '8/22', '8/23', '8/24'], 
        data: ['11', '13', '14', '14', '14', '13', '13', '14', '16', '17'],
        borderColor: "#0275d8"
      },
      {
        labels: ['8/5', '8/6', '8/7', '8/8', '8/9', '8/10', '8/11', '8/12', '8/13', '8/14', '8/15', '8/16','8/17', '8/18', '8/19', '8/20', '8/21', '8/22', '8/23', '8/24'], 
        data: ['0', '3', '5', '5', '6', '7', '9', '12', '9', '9', '11', '13', '14', '14', '14', '13', '13', '14', '16', '17'],
        borderColor: "#0275d8",
        hidden: true,
      }
    ]
  }

  const id = 'mockLineChart'
  const tabs =
  <ul className="nav nav-tabs nav-tabs-sm card-header-tabs">
    <li className="nav-item" data-toggle="chart" data-target={"#" + id} data-trigger="click" data-action="toggle" data-dataset="0">
      <button className="nav-link active" data-bs-toggle="tab">
        Recent
      </button>
    </li>
    <li className="nav-item" data-toggle="chart" data-target={"#" + id} data-trigger="click" data-action="toggle" data-dataset="1">
      <button className="nav-link" data-bs-toggle="tab">
        All
      </button>
    </li>
  </ul>


  return <LineChart title='Recent Practices' data={data} tabs={tabs} lineColor="#47e5bc" id={id} height={props.height}/>
}

export default MockLineChart;
