function Pagination(props) {
  const pageIndex = props.pageIndex;
  const pageCount = props.pageCount;
  const canPreviousPage = props.canPreviousPage;
  const canNextPage = props.canNextPage;
  const previousPage = props.previousPage;
  const nextPage = props.nextPage;
  const gotoPage = props.gotoPage;
  const pageNumber = 5;
  const indexOffset = Math.floor(pageNumber / 2);
  let startingIndex = Math.max(pageIndex - indexOffset, 0);
  startingIndex = Math.min(Math.max(pageCount - 5, 0), startingIndex);

  const pagination = [];

  pagination.push(
    <li className={canPreviousPage ? "page-item" : "page-item disabled"} key="prev"> <button type="button" className="page-link" onClick={previousPage}><span className="fe fe-chevron-left" /></button></li>
  )

  for (let i = startingIndex; i < Math.min(pageCount, startingIndex + pageNumber); i++) {
    const p = <li className={i === pageIndex ? "page-item active" : "page-item"} key={i}> <button type="button" className="page-link" onClick={() => gotoPage(i)}>{i + 1}</button></li>;
    pagination.push(p)
  }

  pagination.push(
    <li className={canNextPage ? "page-item" : "page-item disabled"} key="next"> <button type="button" className="page-link" onClick={nextPage}><span className="fe fe-chevron-right" /></button></li>
  )

  return pagination
}

export default Pagination;