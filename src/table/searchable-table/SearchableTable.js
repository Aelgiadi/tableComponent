// @flow

import { useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';

import {
  SelectableTable,
  type SelectableTableProps,
} from '../selectable-table';
import { type TSortableColumn } from '../sortable-table';
import type { TSortable } from '../types';
import { defaultPageSize } from '../paged-table';
import Search from './Search';
import Styles from './SearchableTable.css';
import BannerAddition from '../BannerAddition';

export type TSearchableColumn<T, U> = {
  ...TSortableColumn<T, U>,
  search?: (string, U, T) => boolean,
};

export type SearchableTableProps<T, U, R> = {
  ...SelectableTableProps<T, U, R>,
  columns: Array<TSearchableColumn<T, U>>,
  searchable?: boolean | 'whenPaging',
};

export function SearchableTable<T, U: TSortable, R>({
  columns,
  data,
  searchable = 'whenPaging',
  pageSize = defaultPageSize,
  ...props
}: SearchableTableProps<T, U, R>): React$Node {
  const [term, setTerm] = useState('');
  const searched = useSearched(term, data, columns);

  let canSearch = searchable === true;
  if (searchable === 'whenPaging' && data.length > pageSize) {
    canSearch = true;
  }
  const banner = canSearch && (
    <Search
      count={data.length * columns.length}
      value={term}
      onChange={setTerm}
      disabled={data.length === 0}
    />
  );

  return (
    <BannerAddition addition={banner}>
      <SelectableTable
        {...props}
        data={searched}
        columns={toSortableColumns(columns)}
        pageSize={pageSize}
      />
      {data.length > 0 && searched.length === 0 && <NoMatches />}
    </BannerAddition>
  );
}

function toSortableColumns<T, U: TSortable>(
  columns: Array<TSearchableColumn<T, U>>,
): Array<TSortableColumn<T, U>> {
  return (columns: any);
}

function useSearched<T, U: TSortable>(
  term: string,
  data: T[],
  columns: Array<TSearchableColumn<T, U>>,
): T[] {
  return useMemo(() => search(term, data, columns), [term, data, columns]);
}

function search<T, U: TSortable>(
  term: string,
  data: T[],
  columns: Array<TSearchableColumn<T, U>>,
): T[] {
  term = term.trim().toLowerCase();
  if (!term) return data;
  return data.filter(datum => {
    return columns.some(col => {
      const search = col.search ?? defaultSearch(col);
      return search(term, col.get(datum), datum);
    });
  });
}

function defaultSearch<T, U: TSortable>(
  col: TSearchableColumn<T, U>,
): (term: string, d: U, datum: T) => boolean {
  const identity = (_, __) => _;
  return function checkTerm(term, d, datum) {
    const render = col.render ?? identity;
    try {
      const string: string = renderToString(render(d, datum));
      return string.toLowerCase().includes(term);
    } catch (err) {
      console.warn(
        'tried to search, but got error; falling back. This may result in an inaccurate search. To fix this problem, add a search function to the column or fix the error.',
        col,
        err,
      );
      const string = d?.toString().toLowerCase();
      return string?.includes(term) || false;
    }
  };
}

function NoMatches() {
  return <div styleName="NoMatches">No search matches</div>;
}
