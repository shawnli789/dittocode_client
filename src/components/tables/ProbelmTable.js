import { useMemo, useEffect, useState, useCallback, Fragment } from "react";
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter, useFlexLayout, useExpanded } from 'react-table'

import ProblemTableColumns from "./ProblemTableColumns";
import Pagination from "./Pagination";
import ProblemTableFilters from "./ProblemTableFilters";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import useAxiosInstance from "../../hooks/use-axios-instance";


function ProblemTable(props) {
  // Table States
  const [data, setData] = useState([]);
  const [dataMap, setDataMap] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);
  const [modalItem, setModalItem] = useState(null);
  const [show, setShow] = useState(false);
  let {getProblems, deleteProblem} = useAxiosInstance();

  // Load data and reload if item gets deleted
  useEffect(() => {
    getProblems()
      .then(function ([problemsLatestPractices, problemsMap]) {
        setData(problemsLatestPractices);
        setDataMap(problemsMap);
      }).catch(function (err) {
        alert(err)
      });
  }, [deletedItem, getProblems]);

  // Modal close handler
  const handleClose = (() => {
    setShow(false);
  });

  // Modal open handler
  const handleShow = useCallback((id) => {
    setModalItem(id)
    setShow(true);
  }, []);

  // Item delete handler
  const deleteHandler = ((id) => {
    deleteProblem(id)
      .then(function () {
        setDeletedItem(id)
        handleClose()
      }).catch(function (error) {
        alert(error)
      });
  });

  const columns = ProblemTableColumns(handleShow)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: useMemo(() => [
          {
            id: 'lastPractice',
            desc: true
          }
        ], []),
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useFlexLayout,
  )

  const { globalFilter } = state;
  const statusColumn = headerGroups[0].headers[0];
  const titleColumn = headerGroups[0].headers[1];
  const difficultyColumn = headerGroups[0].headers[3];
  const shouldShowPagination = pageCount > 1;

  return (
    <Fragment>
      <ProblemTableFilters
        statusColumn={statusColumn}
        titleColumn={titleColumn}
        difficultyColumn={difficultyColumn}
        setPageSize={setPageSize}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        data={data}
      />

      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className={column.disableSortBy ? "text-muted" : "text-muted sortColumn"}{...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  let params = {};
                  //Pass additional params to title column
                  if (cell.column.id === 'title') {
                    params = { url: row.original.url, completed: row.original.completed, number: row.original.number }
                    //Pass additional params to lastPractice column
                  } else if (cell.column.id === 'lastPractice') {
                    params = { number: row.original.number, title: row.original.title, dataMap: dataMap }
                  }
                  return <td {...cell.getCellProps()}>{cell.render('Cell', params)}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>


      <div className="pagination justify-content-center pb-4">
        {shouldShowPagination && <Pagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          nextPage={nextPage}
          gotoPage={gotoPage}
        />}

      </div>

      <DeleteConfirmationModal
        show={show}
        handleClose={handleClose}
        deleteHandler={() => deleteHandler(modalItem)}
        title="Are you sure?"
        body="This will delete the most recent practice record of this problem."
      />

    </Fragment>
  );
}

export default ProblemTable


