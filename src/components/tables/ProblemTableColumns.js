import { useMemo } from "react";
import TableDateTooltip from "../tooltips/TableDateTooltip";
function ProblemTableColumns(modalHandleShow) {
  const columns = useMemo(
    () => [
      {
        Header: 'status',
        accessor: 'completed',
        width: 60,
        filter: completedFilterFn,
        Cell: (props) => {
          const completed = props.value ? <span className="fe fe-check-circle text-success" /> : <span className="fe fe-circle text-warning" />
          return completed;
        },
        sortType: (a) => {
          if (a.original.completed) return 1;
          return -1;
        }
      },
      {
        Header: 'Problem',
        accessor: 'title',
        filter: typeFilterFn,
        Cell: (props) => {
          const titleValue = props.number.toString() + ". " + props.value;
          const title = props.url ? <a href={props.url}> {titleValue}</a> : String(titleValue);
          return title;
        }
      },
      {
        Header: 'tags',
        accessor: 'tags',
        disableSortBy: true,
        Cell: (props) => {
          const tags = props.value.split(',');
          return tags.map((t, index) => {
            t = t.trim();
            return <span key={index} className="badge rounded-pill bg-light">{t}</span>;
          })
        }
      },
      {
        Header: 'difficulty',
        accessor: 'difficulty',
        width: 100,
        Cell: (props) => {
          let color;
          if (props.value === 'hard') {
            color = "text-danger";
          } else if (props.value === 'medium') {
            color = "text-warning";
          } else if (props.value === 'easy') {
            color = "text-success";
          }
          return <span className={color}>{props.value}</span>;
        }
      },
      {
        Header: 'last practice',
        accessor: 'lastPractice',
        width: 100,
        Cell: (props) => {
          if (props.dataMap) {
            const key = props.number + ". " + props.title;
            const totalPractices = props.dataMap.get(key);

            // sort the practices from newest to oldest
            totalPractices.sort((a, b) => {
              const time_a = new Date(a.created_at).getTime();
              const time_b = new Date(b.created_at).getTime();
              if (time_a < time_b) return 1;
              return -1;
            })

            const listMark = totalPractices.length > 1 ? <span className="fe fe-list mx-2" /> : <span className="fe fe-list d-none" />
            const dateElement = totalPractices.length > 1 ? <TableDateTooltip id={key} totalPractices={totalPractices}> {props.value}{listMark}</TableDateTooltip> : props.value
            return dateElement
          }
          return null;
        },
        sortType: (a, b,) => {
          const time_a = new Date(a.original.created_at).getTime();
          const time_b = new Date(b.original.created_at).getTime();
          if (time_a > time_b) return 1;
          if (time_a < time_b) return -1;
          return 0;
        }
      },
      {
        Header: '',
        accessor: 'id',
        width: 20,
        disableSortBy: true,
        Cell: (props) => {
          return <button className="fe fe-trash bg-transparent border-0" onClick={() => modalHandleShow(props.value)} />;
        }
      },
    ],
    [modalHandleShow]
  )

  // Add autoRemove to custom filter function, so that when the filtered value is empty, remove the filter
  completedFilterFn.autoRemove = val => val === '';
  typeFilterFn.autoRemove = val => val === '';
  return columns;
}

// Custom completed filter
const completedFilterFn = (rows, id, val) => {
  return rows.filter(row => {
    return row.original.completed === val;
  })
}

// Custom type filter, used on title column because there is no type column.
const typeFilterFn = (rows, id, val) => {
  return rows.filter(row => {
    return row.original.type === val;
  })
}

export default ProblemTableColumns;