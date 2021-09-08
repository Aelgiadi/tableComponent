// @flow

import { createContext, useContext } from 'react';
import { type TFilter, type TFilterValues } from '/filter-chips';
import type { TFilterableColumn } from './columnsFilter';

export type FilterProps = {
  // passed straight through to FilterChips
  filters: TFilter[],
  values: TFilterValues,
  onChange: TFilterValues => mixed,
  onCommit?: () => mixed,
  showAllFirstTime?: boolean,
  // pass these to save the column ordering and pins to the
  // database as a user pref
  columnsPrefName?: string,
  pinnedPrefName?: string,
};

type TFiltersContext<T> = {
  ...FilterProps,
  columns: Array<TFilterableColumn<T>>,
};

const FiltersContext = createContext<?TFiltersContext<any>>(null);

export function FiltersProvider<T>({
  children,
  ...filters
}: {
  children: React$Node,
  ...TFiltersContext<T>,
}): React$Node {
  return (
    <FiltersContext.Provider value={filters}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters<T>(): TFiltersContext<T> {
  const filters = useContext(FiltersContext);
  if (filters == null)
    throw new Error('Must render Filters inside a FilterableTable');
  return filters;
}
