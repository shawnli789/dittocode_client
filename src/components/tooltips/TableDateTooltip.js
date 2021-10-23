import ReactTooltip from "react-tooltip";
import { convertUTCToLocal } from "../../utils/helper";


function TableDateTooltip(props) {
  const tooltip = <div className="overflow-auto container" style={{ maxHeight: "200px" }}>
    <div className="row mb-2">
      <div className="col">
        Total Practices: {props.totalPractices && props.totalPractices.length}
      </div>
    </div>

    {props.totalPractices && props.totalPractices.map((practice, index) => {
      const practiceDate = convertUTCToLocal(practice.created_at);
      const dateString = practiceDate.getFullYear() + "-" + (practiceDate.getMonth() + 1) + "-" + practiceDate.getDate();
      return (
        <div className="row" key={index}>
          <div className="col-9">
            {dateString}
          </div>
          <div className="col-3">
            {practice.completed ? <span className="fe fe-check-circle text-success"> </span> : <span className="fe fe-circle text-warning"> </span>}
          </div>
        </div>);
    })}

  </div>

  return (
    <div>
      <button className="btn bg-transparent border-0 shadow-none p-0 text-body"
        data-tip
        data-for={props.id}> {props.children} </button>
      <ReactTooltip
        id={props.id}
        type='dark'
        effect='solid'
        place="right"
        textColor=''
        backgroundColor=''
        delayHide={80}
      >
        {tooltip}
      </ReactTooltip>
    </div>

  );
}

export default TableDateTooltip;

