import TableCard from '../cards/TableCard'
function MockProblemTable(props) {
  const p1 = {
    completed: true,
    title: 'Two Sum',
    type: 'Algorithm',
    number: '1',
    tags:'Hash Table',
    difficulty: 'easy',
    lastPractice: '9 minutes ago'
  }
  const p2 = {
    completed: false,
    title: 'Subsets',
    type: 'Algorithm',
    number: '2',
    tags:'Recursion, Array',
    difficulty: 'medium',
    lastPractice: '5 hours ago'
  }
  const p3 = {
    completed: true,
    title: 'Join',
    type: 'Database',
    number: '3',
    tags:'Database',
    difficulty: 'hard',
    lastPractice: '4 days ago'
  }
  const p4 = {
    completed: false,
    title: 'Candy',
    type: 'Algorithm',
    number: '4',
    tags:'Backtracking',
    difficulty: 'hard',
    lastPractice: '1 week ago'
  }
  const data = [p1, p2, p3, p4];
  return (
    <TableCard data={data} title='Problems' minHeight={props.minHeight}/>
  )
}

export default MockProblemTable;