// @flow

import { useState, useCallback, useMemo } from 'react';
import type { TFilterValues } from '/filter-chips';

import type { TFilterableColumn } from './columnsFilter';
import saveColumns from './saveColumns';
import type { TSortable } from '../';

type TColumns = string[];

export default function useFilterValues<T, U: TSortable>(
  values: TFilterValues,
  onChange: TFilterValues => mixed,
  allColumns: Array<TFilterableColumn<T, U>>,
  columnsPrefName?: string,
): [TFilterValues, (TFilterValues) => void] {
  const [columns, setColumns] = useColumns(allColumns, columnsPrefName);

  const change = useCallback(
    ({ columns, ...values }) => {
      setColumns(columns ?? []);
      onChange((values: any));
    },
    [onChange, setColumns],
  );

  const result = useMemo(() => ({ ...values, columns }), [values, columns]);
  return [(result: any), change];
}

function useColumns<T>(
  allColumns: Array<TFilterableColumn<T>>,
  columnsPrefName?: string,
): $Call<typeof useState, TColumns> {
  const [columns, setColumns] = useState<TColumns>(() => {
    const prefColumns = getColumnsFromGlobalUserPref(columnsPrefName);
    if (prefColumns.length > 0) return prefColumns;
    return allColumns.map(col => col.id).filter(Boolean);
  });

  const set = useCallback(
    newColumns =>
      setColumns(oldColumns => {
        if (typeof newColumns === 'function') {
          newColumns = newColumns(oldColumns);
        }
        if (!Array.isArray(newColumns)) {
          newColumns = [newColumns];
        }
        if (oldColumns !== newColumns && columnsPrefName) {
          saveColumns(columnsPrefName, newColumns);
        }
        return (newColumns: any);
      }),
    [columnsPrefName],
  );

  return [columns, set];
}

function getColumnsFromGlobalUserPref(prefName: ?string): TColumns {
  const columns = (global.axiscarePrefs ?? {})[prefName];
  if (!Array.isArray(columns)) return [];
  return columns;
}
