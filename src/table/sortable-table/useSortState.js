// @flow

import { useState, useEffect } from 'react';

import type { TSortableColumn } from './types';

export default function useSortState<T>(
  columns: Array<TSortableColumn<T>>,
): [number | null, boolean, (number) => void] {
  let [index, setIndex] = useState<?number>(() => getInitialIndex(columns));
  if (!isColumnComparable(columns, index)) index = null;
  const [ascending, setAscending] = useState<boolean>(() =>
    index == null ? true : columns[index]?.initialSortAscending ?? true,
  );

  useEffect(() => {
    if (!isColumnComparable(columns, index)) {
      setIndex(null);
    }
  }, [columns, index]);

  const sort = newIndex => {
    if (newIndex === index) {
      setAscending(!ascending);
    } else {
      setAscending(true);
      setIndex(newIndex);
    }
  };

  return [index ?? null, ascending, sort];
}

function isColumnComparable<T>(
  columns: Array<TSortableColumn<T>>,
  index: ?number,
): boolean {
  if (index == null || columns[index] == null) return false;
  return columns[index].compare !== false;
}

function getInitialIndex<T>(columns: Array<TSortableColumn<T>>): ?number {
  const index = columns.findIndex(c => c.initialSort && c.compare !== false);
  if (index < 0) return null;
  return index;
}
