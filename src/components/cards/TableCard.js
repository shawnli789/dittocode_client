function TableCard(props) {
  const tableRows = props.data && props.data.map((d, index) => {
    let color;
    if (d.difficulty === 'hard') {
      color = "text-danger";
    } else if (d.difficulty === 'medium') {
      color = "text-warning";
    } else if (d.difficulty === 'easy') {
      color = "text-success";
    }
    const titleValue = d.number.toString() + ". " + d.title;
    const title = d.url ? <a href={d.url}> {titleValue}</a> : String(titleValue);
    const tagsArray = d.tags.split(',');
    const tags = tagsArray.map((t, index) => {
      t = t.trim();
      return <span key={index} className="badge rounded-pill bg-light">{t}</span>;
    })
    return (<tr key={index}>
      <td>{d.completed ? <span className="fe fe-check-circle text-success" /> : <span className="fe fe-circle text-warning" />}</td>
      <td>{title}</td>
      <td>{d.type}</td>
      <td>{tags}</td>
      <td className={color}>{d.difficulty}</td>
      <td>{d.lastPractice}</td>
    </tr>)
  })
  
  return (
    <div className="card">
      <div className="card-header">
        <div className="row align-items-center">
          <div className="col">
            <h4 className="card-header-title">
              {props.title}
            </h4>
          </div>
        </div>
      </div>

      <div className="table-responsive" style={{minHeight: props.minHeight}}>
        <table className="table table-sm card-table">
          <thead>
            <tr>
              <th className="text-muted">Status</th>
              <th className="text-muted">Problem</th>
              <th className="text-muted">Type</th>
              <th className="text-muted">Tags</th>
              <th className="text-muted">Difficulty</th>
              <th className="text-muted" style={{whiteSpace: 'nowrap'}}>Last Practice</th>
            </tr>
          </thead>
          <tbody className="list">
            {tableRows}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default TableCard;