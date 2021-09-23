function SummaryCard(props) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row align-items-center gx-0">

          <div className="col">
            <h6 className="text-uppercase text-muted mb-2">
              {props.title}
            </h6>
            <span className="h2 mb-0">
              {props.data}
            </span>
          </div>

          <div className="col-auto">
            {props.icon}
          </div>

        </div>
      </div>
    </div>
  );
}

export default SummaryCard;