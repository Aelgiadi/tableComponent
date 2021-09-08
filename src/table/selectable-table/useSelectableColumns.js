// @flow

import { useMemo } from 'react';
import type { TSortable } from '../types';
import { type TSortableColumn } from '../sortable-table';
import { SelectAll, SelectOne } from './Selects';
import Styles from './SelectableTable.css';

export default function useSelectableColumns<T, U: TSortable>(
  columns: Array<TSortableColumn<T, U>>,
  data: Array<T>,
  hasSelection: boolean,
): Array<TSortableColumn<T, U>> {
  return useMemo(() => {
    if (!hasSelection) return columns;
    const selector: any = makeSelectionColumn((data: any));
    return [selector, ...columns];
  }, [columns, data, hasSelection]);
}

function makeSelectionColumn<T: { id: string }>(
  data: T[],
): TSortableColumn<T, string> {
  return {
    title: <SelectAll data={data} />,
    get: datum => {
      if (datum.id == null)
        throw new Error('data must have an `id` field for selection to work');
      return datum.id;
    },
    render: (id, datum) => <SelectOne id={id} datum={datum} />,
    className: Styles.SelectColumn,
    compare: false,
  };
}
