import BarChart from '../charts/BarChart'
function MockBarChart(props) {
  const data = {
    labels: ['8/15', '8/16', '8/17', '8/18', '8/19', '8/20', '8/21', '8/22', '8/23', '8/24'], 
    datasets: [
      {
        data: ['1', '2', '1', '0', '5', '2', '3', '2', '5', '4'],
      }
    ]
  }
  return <BarChart title='Recent Practices' data={data}  height={props.height}/>
}

export default MockBarChart;