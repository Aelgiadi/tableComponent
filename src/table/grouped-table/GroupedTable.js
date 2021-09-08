// @flow

import { memo, useMemo } from 'react';
import memoize from 'lodash/memoize';

import { Table, type TableProps } from '../Table';
import type { TColumn, TSortable } from '../types';
import DefaultRow from '../Row';
import GroupRow from './GroupRow';
import type { TGroupedColumn } from './types';
import { getGroupedData, flattenGroupData } from './getGroupedData';

export type GroupedTableProps<T, U, R> = {
  ...TableProps<T, U, R>,
  columns: Array<TGroupedColumn<T, U>>,
};

export function GroupedTable<T, U: TSortable, R>({
  columns,
  data,
  Row,
  ...props
}: GroupedTableProps<T, U, R>): React$Node {
  const groups = columns.filter(col => col.groupBy).length;
  return (
    <Table
      {...props}
      columns={toNonGroupedColumns(columns)}
      data={useGroupedRows(data, columns)}
      Row={groups > 0 ? UngroupedRow(Row) : Row}
    />
  );
}

function useGroupedRows<T, U: TSortable>(
  data: T[],
  columns: Array<TGroupedColumn<T, U>>,
) {
  return useMemo(() => {
    const groups = columns.filter(col => col.groupBy).length;
    const grouped = getGroupedData(data, columns);
    const flattened = flattenGroupData(grouped, (group, subgroups, depth) => {
      return (
        <GroupRow
          key={Math.random()}
          data={group}
          columns={columns}
          extraRows={subgroups.length - group.length}
          level={groups - depth}
          depth={depth}
        />
      );
    });
    return flattened;
  }, [data, columns]);
}

// The row definition received by the regular Table component excludes
// any of the grouping rows, which are handled specially by the GroupedTable.
const MemoDefaultRow: any = memo(DefaultRow);
const UngroupedRow: any = memoize((Row = MemoDefaultRow) => {
  return function UngroupedRow({ columns, ...props }) {
    return (
      <Row
        {...props}
        columns={toNonGroupedColumns(columns.filter(c => !c.groupBy))}
      />
    );
  };
});

function toNonGroupedColumns<T, U: TSortable>(
  columns: Array<TGroupedColumn<T, U>>,
): Array<TColumn<T, U>> {
  return (columns: any);
}
