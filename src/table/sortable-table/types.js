// @flow

import type { TGroupedColumn } from '../grouped-table';

export type TSortableColumn<T, U = *> = {
  ...TGroupedColumn<T, U>,

  // comparison function for the sort operation. If a comparison
  // function is not provided, a default comparator is used. To
  // disable sorting for this column, pass false.
  compare?: false | ((U, U, T, T) => number),

  // set to true to make this column the sort column after the table
  // initializes
  initialSort?: boolean,
  initialSortAscending?: boolean,
};
