export const typeOptions = [
  { value: 'algorithms', label: 'Algorithms' },
  { value: 'database', label: 'Database' },
  { value: 'shell', label: 'Shell' },
  { value: 'concurrency', label: 'Concurrency' }
]

export const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
]

export const completedOptions = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
]

export const timeSpentOptions = [
  { value: '< 15 mins', label: '< 15 mins' },
  { value: '15 mins ~ 30 mins', label: '15 mins ~ 30 mins' },
  { value: '30 mins ~ 1 hour', label: '30 mins ~ 1 hour' },
  { value: '1 hour ~ 2 hours', label: '1 hour ~ 2 hours' },
  { value: '> 2 hours', label: '> 2 hours' }
]

export const pageSizeOptions = [
  { value: '10', label: 'Show 10' },
  { value: '25', label: 'Show 25' },
  { value: '50', label: 'Show 50' },
  { value: '100', label: 'Show 100' },
]

const tags = ["Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Depth - First Search",
  "Sorting",
  "Greedy",
  "Breadth - First Search",
  "Tree",
  "Database",
  "Binary Tree",
  "Binary Search",
  "Matrix",
  "Two Pointers",
  "Bit Manipulation",
  "Stack",
  "Design",
  "Heap(Priority Queue)",
  "Backtracking",
  "Graph",
  "Simulation",
  "Sliding Window",
  "Prefix Sum",
  "Linked List",
  "Union Find",
  "Counting",
  "Recursion",
  "Binary Search Tree",
  "Trie",
  "Monotonic Stack",
  "Divide and Conquer",
  "Ordered Set",
  "Queue",
  "Bitmask",
  "Memoization",
  "Geometry",
  "Game Theory",
  "Segment Tree",
  "Hash Function",
  "Interactive",
  "Topological Sort",
  "String Matching",
  "Enumeration",
  "Data Stream",
  "Binary Indexed Tree",
  "Randomized",
  "Rolling Hash",
  "Shortest Path",
  "Combinatorics",
  "Iterator",
  "Concurrency",
  "Monotonic Queue",
  "Brainteaser",
  "Probability and Statistics",
  "Number Theory",
  "Doubly - Linked List",
  "Merge Sort",
  "Bucket Sort",
  "Minimum Spanning Tree",
  "Counting Sort",
  "Quickselect",
  "Shell",
  "Suffix Array",
  "Line Sweep",
  "Reservoir Sampling",
  "Strongly Connected Component",
  "Eulerian Circuit",
  "Radix Sort",
  "Rejection Sampling",
  "Biconnected Component"]

export const tagsOptions = tags.map((t) => {
  return {
    value: t.toLowerCase(),
    label: t
  }
})