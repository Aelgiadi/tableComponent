// @flow

import { useMemo } from 'react';

import type { TSortableColumn } from './types';
import { defaultComparator } from '/utils';

import { isTitleRow } from '../TitleRow';
import { isSummaryRow } from '../SummaryRow';
import type { TSortable } from '../';

export default function useSortedData<T, U: TSortable>(
  columns: Array<TSortableColumn<T, U>>,
  data: Array<T>,
  sortIndex: ?number,
  ascending: boolean,
  fallbackComparator?: (T, T) => number = () => 0,
): Array<T> {
  return useMemo(() => {
    if (sortIndex == null) return data;
    const sortColumn = columns[sortIndex];
    if (sortColumn == null) return data;
    return sortData(data, columns, sortColumn, ascending, fallbackComparator);
  }, [columns, data, sortIndex, ascending, fallbackComparator]);
}

export function sortData<T, U: TSortable>(
  data: Array<T>,
  columns: Array<TSortableColumn<T, U>>,
  sortColumn: TSortableColumn<T, U>,
  ascending: boolean,
  fallback?: (T, T) => number,
): Array<T> {
  let result = [];
  let aux = [];
  const commitAux = () => {
    if (aux.length > 0) {
      const sorted = sortRows(aux, columns, sortColumn, ascending, fallback);
      result = result.concat(sorted);
      aux = [];
    }
  };

  for (let i = 0; i < data.length; ++i) {
    const datum = data[i];
    if (isTitleRow(datum) || isSummaryRow(datum)) {
      commitAux();
      result.push(datum);
    } else {
      aux.push(datum);
    }
  }
  commitAux();
  return result;
}

export function sortRows<T, U: TSortable>(
  data: Array<T>,
  columns: Array<TSortableColumn<T, U>>,
  sortColumn: TSortableColumn<T, U>,
  ascending: boolean,
  fallbackComparator?: (T, T) => number = () => 0,
): Array<T> {
  const groupCompare = makeGroupComparator(columns, fallbackComparator);
  const compare = getComparator(sortColumn, fallbackComparator) || null;
  data = data.sort(function rowSortComparator(a, b) {
    return (
      groupCompare(a, b) ||
      compare?.(sortColumn.get(a), sortColumn.get(b), a, b) ||
      0
    );
  });
  return ascending ? data : data.reverse();
}

function getComparator<T, U: TSortable>(
  column: TSortableColumn<T, U>,
  fallbackComparator: (T, T) => number = () => 0,
): false | ((U, U, T, T) => number) {
  const comparator = column.compare ?? defaultComparator;
  if (comparator === false) return comparator;
  return (a, b, aa, bb) => {
    const result = comparator(a, b, aa, bb);
    if (result === 0) return fallbackComparator(aa, bb);
    return result;
  };
}

function makeGroupComparator<T, U: TSortable>(
  columns: Array<TSortableColumn<T, U>>,
  fallbackComparator: (T, T) => number,
): (T, T) => number {
  const groups = columns.filter(col => col.groupBy);
  const compares = groups.map(group =>
    getComparator(group, fallbackComparator),
  );
  return (a, b) => {
    for (let i = 0; i < groups.length; ++i) {
      const group = groups[i];
      const compare = compares[i];
      if (group && compare) {
        const diff = compare(group.get(a), group.get(b), a, b);
        if (diff !== 0) return diff;
      }
    }
    return 0;
  };
}
