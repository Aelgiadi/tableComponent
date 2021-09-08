// @flow

import type { TColumn } from '../types';

export type TGroupedColumn<T, U> = {
  ...TColumn<T, U>,
  groupBy?: boolean,
  aggregate?: (U[], T[]) => any,
  renderAggregate?: (any, T) => React$Node,
};
