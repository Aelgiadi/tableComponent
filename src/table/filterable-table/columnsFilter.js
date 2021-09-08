// @flow

import { useMemo } from 'react';
import type { TMultiselectFilter, TOption } from '/filter-chips';
import type { TSearchableColumn } from '../searchable-table';
import type { TSortable } from '../types';

export type TFilterableColumn<T, U = *> = {
  ...TSearchableColumn<T, U>,
  id: ?string,
};

export function makeColumnsFilter<T>(
  columns: Array<TFilterableColumn<T>>,
): TMultiselectFilter {
  const options = getColumnsOptions(columns);
  return {
    id: 'columns',
    type: 'multiselect',
    label: 'Columns',
    options: options,
    isSorted: true,
    summarize(selected) {
      if (selected.length === 0) return 'All';
      if (selected.length === options.length) return 'All';
      return `${selected.length} / ${options.length}`;
    },
  };
}

function getColumnsOptions<T>(columns: Array<TFilterableColumn<T>>): TOption[] {
  if (__DEV__) assertUniqueColumnIds(columns);

  const map: { [string]: string } = {};
  for (const col of columns) {
    const { id, title } = col;
    if (id != null) {
      if (typeof title === 'string') {
        map[id] = title;
      }
    }
  }

  return columns
    .map(c => c.id)
    .filter(Boolean)
    .map(id => ({
      label: map[id] ?? '',
      value: id,
    }))
    .filter(op => op.label);
}

function assertUniqueColumnIds<T>(columns: Array<TFilterableColumn<T>>) {
  const ids = columns.map(c => c.id).filter(Boolean);
  const found = new Set();
  for (const id of ids) {
    if (found.has(id)) {
      throw new Error(`duplicate column id: ${id}  column ids must be unique`);
    }
    found.add(id);
  }
}

function toSearchableColumn<T, U: TSortable>(
  column: TFilterableColumn<T, U>,
): TSearchableColumn<T, U> {
  const { id: _, ...rest } = column;
  return rest;
}

export function useEnabledColumns<T, U: TSortable>(
  columns: Array<TFilterableColumn<T, U>>,
  enabledColumns?: string[] = [],
): Array<TSearchableColumn<T, U>> {
  return useMemo(() => {
    let filteredColumns = columns;
    if (enabledColumns.length > 0) {
      const enabled = new Set(enabledColumns);
      filteredColumns = filteredColumns.filter(
        col => enabled.has(col.id) || col.id == null,
      );
    }
    return filteredColumns.map(toSearchableColumn);
  }, [columns, enabledColumns]);
}
