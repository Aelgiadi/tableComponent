// @flow

import { useState, useLayoutEffect } from 'react';

import type { TableProps, TSortable } from '../index';
import { GroupedTable, type TGroupedColumn } from '../grouped-table';
import PagingControls from './PagingControls';
import Styles from './pagedTable.css';
import BannerAddition from '../BannerAddition';

export const defaultPageSize = 500;

export type PagedTableProps<T, U, R> = {
  ...TableProps<T, U, R>,
  columns: Array<TGroupedColumn<T, U>>,
  pageSize?: number,
};

export function PagedTable<T, U: TSortable, R>({
  pageSize = defaultPageSize,
  ...rest
}: PagedTableProps<T, U, R>): React$Node {
  const allData = rest.data;
  const [pagedData, page, setPage] = usePagedData(allData, pageSize);
  const paging = (
    <PagingControls
      page={page}
      setPage={setPage}
      pageSize={pageSize}
      data={allData}
    />
  );

  return (
    <BannerAddition addition={paging}>
      <GroupedTable {...rest} data={pagedData} />
      {pageSize > 50 && allData.length > 50 && (
        <div styleName="BottomPagingControls">{paging}</div>
      )}
    </BannerAddition>
  );
}

function usePagedData<T>(
  data: T[],
  pageSize: number,
): [T[], number, (number) => void] {
  const [page, setPage] = useState(0);
  const pageCount = getPageCount(data, pageSize);
  const set = value => setPage(constrain(value, pageCount - 1));
  useLayoutEffect(
    () => setPage(p => constrain(p, pageCount - 1)),
    [data.length, pageCount],
  );
  const start = page * pageSize;
  const slicedData =
    pageSize >= data.length ? data : data.slice(start, start + pageSize);
  return [slicedData, page, set];
}

function getPageCount(data: Array<any>, pageSize: number) {
  return Math.ceil(data.length / pageSize);
}

function constrain(what: number, max: number, min: number = 0) {
  if (what < min) return min;
  if (what > max) return max;
  return what;
}
