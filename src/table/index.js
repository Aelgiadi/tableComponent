// @flow

import DefaultRow from './Row';
import DefaultCell from './Cell';
import Limit from './limit';
import { Table as DefaultTable, type TableProps } from './Table';
import type { TSortable } from './types';
import BannerAddition from './BannerAddition';

const Table: {
  [[call]]: <T, U: TSortable, R>(TableProps<T, U, R>) => React$Node,
  Limit: typeof Limit,
  BannerAddition: typeof BannerAddition,
} = DefaultTable;
Table.Limit = Limit;
Table.BannerAddition = BannerAddition;
export { Table };

export type { TableProps } from './Table';
export { DefaultRow, DefaultCell };
export type { RowProps } from './Row';
export type { TColumn, TSortable } from './types';
export { SortableTable } from './sortable-table';
export type { TSortableColumn } from './sortable-table';
export * from './filterable-table';
export { ShowMore, defaultShowMoreWidth } from './ShowMore';
export * from './WindowLoader';
