import { useCallback, useEffect, useState } from 'react';
// const filters = {
//   type_filter: '',
//   difficulty_filter: '',
//   completed_filter: '',
//   page_size_filter: '',
//   expiration: null,
// }

let timer;

// Expire after 2 hours;
const timeout = 1000 * 60 * 60 * 2;

function useTableFilterLocalStorage() {
  const filters = localStorage.getItem('filters')
  const [typeFilter, setTypeFilter] = useState(filters && filters['type_filter']);
  const [difficultyFilter, setDifficultyFilter] = useState(filters && filters['difficulty_filter']);
  const [completedFilter, setCompletedFilter] = useState(filters && filters['completed_filter']);
  const [pageSizeFilter, setPageSizeFilter] = useState(filters && filters['page_size_filter']);

  const removeFilterHandler = useCallback(() => {
    setTypeFilter(null);
    setDifficultyFilter(null);
    setCompletedFilter(null);
    setPageSizeFilter(null);
    localStorage.removeItem('filters');
    if (timer) {
      clearTimeout(timer);
    }
  }, []);

  const addTypeFilterHandler = (type) => {
    setTypeFilter(type);
    let filters = JSON.parse(localStorage.getItem('filters'));
    if (filters) {
      filters['type_filter'] = type;
      filters['expiration'] = new Date().getTime() + timeout;
    } else {
      filters = {
        type_filter: type,
        expiration: new Date().getTime() + timeout
      };
    }
    localStorage.setItem('filters', JSON.stringify(filters));
    timer = setTimeout(removeFilterHandler, calculateRemainingTime(filters));
  }

  const addDifficultyFilterHandler = (difficulty) => {
    setDifficultyFilter(difficulty);
    let filters = JSON.parse(localStorage.getItem('filters'));
    if (filters) {
      filters['difficulty_filter'] = difficulty;
      filters['expiration'] = new Date().getTime() + timeout;
    } else {
      filters = {
        difficulty_filter: difficulty,
        expiration: new Date().getTime() + timeout
      };
    }
    localStorage.setItem('filters', JSON.stringify(filters));
    timer = setTimeout(removeFilterHandler, calculateRemainingTime(filters));
  }

  const addCompletedFilterHandler = (completed) => {
    setCompletedFilter(completed);
    let filters = JSON.parse(localStorage.getItem('filters'));
    if (filters) {
      filters['completed_filter'] = completed;
      filters['expiration'] = new Date().getTime() + timeout;
    } else {
      filters = {
        completed_filter: completed,
        expiration: new Date().getTime() + timeout
      };
    }
    localStorage.setItem('filters', JSON.stringify(filters));
    timer = setTimeout(removeFilterHandler, calculateRemainingTime(filters));
  }

  const addPageSizeFilterHandler = (pageSize) => {
    setPageSizeFilter(pageSize);
    let filters = JSON.parse(localStorage.getItem('filters'));
    if (filters) {
      filters['page_size_filter'] = pageSize;
      filters['expiration'] = new Date().getTime() + timeout;
    } else {
      filters = {
        page_size_filter: pageSize,
        expiration: new Date().getTime() + timeout
      };
    }
    localStorage.setItem('filters', JSON.stringify(filters));
    timer = setTimeout(removeFilterHandler, calculateRemainingTime(filters));
  }

  useEffect(() => {
    const filters = JSON.parse(localStorage.getItem('filters'));
    if (filters) {
      timer = setTimeout(removeFilterHandler, calculateRemainingTime(filters))
      if (filters.type_filter) {
        setTypeFilter(filters.type_filter)
      }
      if (filters.difficulty_filter) {
        setDifficultyFilter(filters.difficulty_filter)
      }
      if (filters.completed_filter) {
        setCompletedFilter(filters.completed_filter)
      }
      if (filters.page_size_filter) {
        setPageSizeFilter(filters.page_size_filter)
      }
    }
  }, [typeFilter, difficultyFilter, completedFilter, pageSizeFilter, removeFilterHandler]);

  return {
    typeFilter: typeFilter,
    difficultyFilter: difficultyFilter,
    completedFilter: completedFilter,
    pageSizeFilter: pageSizeFilter,
    addTypeFilterHandler: addTypeFilterHandler,
    addDifficultyFilterHandler: addDifficultyFilterHandler,
    addCompletedFilterHandler: addCompletedFilterHandler,
    addPageSizeFilterHandler: addPageSizeFilterHandler,
    removeFilterHandler: removeFilterHandler
  }
};

export default useTableFilterLocalStorage;

const calculateRemainingTime = (filters) => {
  const exp = filters.expiration;
  const currentTime = new Date().getTime();
  // Add 1 minute as buffer zone.
  return exp - currentTime - 1000 * 60;
};
