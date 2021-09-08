// @flow

import SortingHeader from './Header';
import useSortState from './useSortState';
import useSortedData from './useSortedData';

import type { TSortableColumn } from './types';
import type { TSortable } from '../index';
import type { TGroupedColumn } from '../grouped-table';
import { PagedTable, type PagedTableProps } from '../paged-table';

export type { TSortableColumn };
export { SortingHeader };

export type SortableTableProps<T, U, R> = {
  ...PagedTableProps<T, U, R>,
  columns: Array<TSortableColumn<T, U>>,
  fallbackComparator?: (T, T) => number,
};

export function SortableTable<T, U: TSortable, R>({
  columns,
  data,
  header,
  fallbackComparator = () => 0,
  ...rest
}: SortableTableProps<T, U, R>): React$Node {
  const [sortIndex, sortAscending, sort] = useSortState(columns);
  const sortedData = useSortedData(
    columns,
    data,
    sortIndex,
    sortAscending,
    fallbackComparator,
  );
  header = header ?? (
    <SortingHeader
      columns={columns}
      onSort={sort}
      sortedData={sortedData}
      sortIndex={sortIndex}
      sortAscending={sortAscending}
    />
  );
  return (
    <PagedTable
      columns={toGroupedColumns(columns)}
      data={sortedData}
      header={header}
      {...rest}
    />
  );
}

function toGroupedColumns<T, U: TSortable>(
  columns: Array<TSortableColumn<T, U>>,
): Array<TGroupedColumn<T, U>> {
  return columns.map(
    ({ initialSort: _, initialSortAscending: __, compare: ___, ...column }) =>
      column,
  );
}
