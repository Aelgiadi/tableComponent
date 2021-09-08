// @flow

import { useMemo } from 'react';

import type { TFilterValues, TMultiselectFilterValue } from '/filter-chips';

import {
  SearchableTable,
  type SearchableTableProps,
} from '../searchable-table';
import { useEnabledColumns } from './columnsFilter';
import type { TFilterableColumn } from './columnsFilter';
import useFilterValues from './useFilterValues';
import type { TSortable } from '../types';
import Styles from './filterableTable.css';
import { BannerContext } from '../BannerAddition';
import { FiltersProvider, type FilterProps } from './FiltersProvider';
import Header from './Header';
import Filters from './Filters';
import Actions from './Actions';

export type FilterableTableProps<T, U, R> = {
  ...SearchableTableProps<T, U, R>,
  columns: Array<TFilterableColumn<T, U>>,
  filters: FilterProps,

  children?: React$Node,

  // @deprecated optional title for the table
  title?: React$Node,
  // @deprecated optional actions to display inline with filters
  actions?: React$Node,
};

export function FilterableTable<T, U: TSortable, R>({
  // these two are deprecated
  actions,
  title,

  className,
  children,
  columns,
  data,
  filters,
  style,
  ...rest
}: FilterableTableProps<T, U, R>): React$Node {
  const [values, onChange] = useFilterValues(
    filters.values,
    filters.onChange,
    columns,
    filters.columnsPrefName,
  );

  return (
    <div className={className} style={style} styleName="FilterableTable">
      <FiltersProvider
        {...filters}
        values={values}
        onChange={onChange}
        columns={columns}
      >
        <BannerContext.Provider value={[]}>
          {children ?? (
            <Header>
              {title}
              <Filters />
              <Actions>{actions ?? null}</Actions>
            </Header>
          )}
        </BannerContext.Provider>
      </FiltersProvider>

      <SearchableTable
        data={data}
        columns={useEnabledColumns(columns, useColumnValues(values))}
        {...rest}
      />
    </div>
  );
}

function useColumnValues(values: TFilterValues): TMultiselectFilterValue {
  const columns = values.columns;
  return useMemo(() => {
    if (Array.isArray(columns)) return columns;
    return [columns];
  }, [columns]);
}
