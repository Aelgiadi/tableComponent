// @flow

import {
  FilterableTable as FilterableTableDefault,
  type FilterableTableProps,
} from './FilterableTable';
import type { TSortable } from '../types';
import Header from './Header';
import Title from './Title';
import Actions from './Actions';
import Filters from './Filters';

const FilterableTable: {
  [[call]]: <T, U: TSortable, R>(FilterableTableProps<T, U, R>) => React$Node,
  Header: typeof Header,
  Title: typeof Title,
  Actions: typeof Actions,
  Filters: typeof Filters,
} = FilterableTableDefault;
FilterableTable.Header = Header;
FilterableTable.Title = Title;
FilterableTable.Actions = Actions;
FilterableTable.Filters = Filters;
export { FilterableTable };

export type { TFilterableColumn } from './columnsFilter';
export * from './commonFilters';
