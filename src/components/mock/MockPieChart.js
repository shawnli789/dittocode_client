import PieChart from '../charts/PieChart'
function MockPieChart(props) {

  const colors = ["#ff928b", "#fec3a6", "#efe9ae", "#cdeac0", "#628395", "#6d72c3"]
  const data = {
    labels: ['Array', 'String', 'Trees', 'Hash Table', 'Recursion', 'Other'],
    datasets: [
      {
        data: [1, 2, 3, 2, 1, 4],
        backgroundColor: colors,
      }
    ]
  }
   return <PieChart title='Difficulty' data = { data } dataTarget="#mockPieChart" legendId="mockPieChart" height={props.height}/>
}

export default MockPieChart;