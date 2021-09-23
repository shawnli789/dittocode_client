import { Fragment, useEffect, useRef, useState } from "react";
import SelectFilter from "../filters/SelectFilter";
import GlobalFilter from "../filters/GlobalFilter";
import { typeOptions, difficultyOptions, completedOptions, pageSizeOptions } from "../../utils/options";
import useTableFilterLocalStorage from "../../hooks/use-table-filter-local-storage";

const typeDefaultOption = { value: '', label: 'Type' };
const difficultyDefaultOption = { value: '', label: 'Diffilcty' };
const completedDefaultOption = { value: '', label: 'Completed' };
const pageSizeDefaultOption = { value: '25', label: 'Show 25' };

function ProblemTableFilters(props) {
  
  const typeRef = useRef();
  const difficultyRef = useRef();
  const completedRef = useRef();
  const pageSizeRef = useRef();
  const titleColumn = props.titleColumn;
  const difficultyColumn = props.difficultyColumn;
  const statusColumn = props.statusColumn;
  const setPageSize = props.setPageSize;
  const setGlobalFilter = props.setGlobalFilter;
  const data = props.data;

  const {
    typeFilter,
    difficultyFilter,
    completedFilter,
    pageSizeFilter,
    addTypeFilterHandler,
    addDifficultyFilterHandler,
    addCompletedFilterHandler,
    addPageSizeFilterHandler,
    removeFilterHandler
  } = useTableFilterLocalStorage();

  useEffect(() => {
    const typeValue = typeFilter != null ? typeFilter : typeDefaultOption.value;
    const difficultyValue = difficultyFilter != null ? difficultyFilter : difficultyDefaultOption.value;
    const completedValue = completedFilter != null ? completedFilter : completedDefaultOption.value;
    const pageSizeValue = pageSizeFilter != null ? pageSizeFilter : pageSizeDefaultOption.value;

    titleColumn.setFilter(typeValue);
    difficultyColumn.setFilter(difficultyValue);
    statusColumn.setFilter(completedValue);
    setPageSize(pageSizeValue);

  }, [titleColumn,
    difficultyColumn,
    statusColumn,
    setPageSize,
    typeFilter,
    difficultyFilter,
    completedFilter,
    pageSizeFilter,
    data]);

  const [selectTypeOption, setSelectTypeOption] = useState(typeDefaultOption);
  const [selectDifficultyOption, setSelectDifficultyOption] = useState(difficultyDefaultOption);
  const [selectPageSizeOption, setSelectPageSizeOption] = useState(pageSizeDefaultOption);
  const [selectCompletedOption, setSelectCompletedOption] = useState(completedDefaultOption);

  useEffect(() => {
    if (typeFilter != null) {
      setSelectTypeOption({ value: typeFilter, label: typeFilter === '' ? 'Type' : capitalizeFirstLetter(typeFilter)});
    } else {
      setSelectTypeOption(typeDefaultOption);
    }

    if (difficultyFilter != null) {
      setSelectDifficultyOption({ value: difficultyFilter, label: difficultyFilter === '' ? 'Difficulty' : capitalizeFirstLetter(difficultyFilter)});
    } else {
      setSelectDifficultyOption(difficultyDefaultOption);
    }

    if (pageSizeFilter != null) {
      setSelectPageSizeOption({ value: pageSizeFilter, label: "Show " + pageSizeFilter });
    } else {
      setSelectPageSizeOption(pageSizeDefaultOption);
    }

    if (completedFilter === true) {
      setSelectCompletedOption({ value: true, label: 'Yes' });
    } else if (completedFilter === false) {
      setSelectCompletedOption({ value: false, label: 'No' });
    } else {
      setSelectCompletedOption(completedDefaultOption);
    }
  }, [typeFilter, 
    difficultyFilter, 
    pageSizeFilter, 
    completedFilter])

  const resetFilters = () => {
    removeFilterHandler();
    setSelectTypeOption(typeDefaultOption);
    setSelectDifficultyOption(difficultyDefaultOption);
    setSelectCompletedOption(completedDefaultOption);
    setSelectPageSizeOption(pageSizeDefaultOption);
  }

  return (
    <Fragment>
      <div className="row row-cols-auto">
        <div className="col-2 align-self-end">
          <SelectFilter
            options={[{ value: '', label: 'Type' }, ...typeOptions]}
            defaultValue={typeDefaultOption}
            value={selectTypeOption}
            onChange={(e) => {
              titleColumn.setFilter(e.value);
              addTypeFilterHandler(e.value);
            }}
            innerRef={typeRef}
          />
        </div>

        <div className="col-2 align-self-end">
          <SelectFilter
            options={[{ value: '', label: 'Diffilcty' }, ...difficultyOptions]}
            defaultValue={difficultyDefaultOption}
            value={selectDifficultyOption}
            onChange={(e) => {
              difficultyColumn.setFilter(e.value);
              addDifficultyFilterHandler(e.value);
            }}
            innerRef={difficultyRef}
          />
        </div>
        <div className="col-2 align-self-end">
          <SelectFilter
            options={[{ value: '', label: 'Completed' }, ...completedOptions]}
            defaultValue={completedDefaultOption}
            value={selectCompletedOption}
            onChange={(e) => {
              statusColumn.setFilter(e.value);
              addCompletedFilterHandler(e.value);
            }}
            innerRef={completedRef}
          />
        </div>
        <div className="col-2 align-self-end">
          <SelectFilter
            options={pageSizeOptions}
            defaultValue={pageSizeDefaultOption}
            value={selectPageSizeOption}
            onChange={(e) => {
              setPageSize(Number(e.value));
              addPageSizeFilterHandler(Number(e.value));
            }}
            innerRef={pageSizeRef}
          />
        </div>
        <div className="col-2 align-self-end">
          <GlobalFilter
            filter={props.globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="col-2 align-self-end text-end">
          <button type="button" className="btn btn-outline-primary btn-sm text-nowrap lift" style= {{height: "34px"}} onClick={resetFilters}>Clear All Filters</button>
        </div>
      </div>
    </Fragment>
  );
}

export default ProblemTableFilters;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


