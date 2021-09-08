// @flow

export type TSortable = void | null | boolean | number | string;

export type TColumn<T, U: ?TSortable = *> = {
  // title of the column, to appear in the header
  title: React$Node,

  // Given the data element, get the value that this column cares about.
  // The return value is passed to other functions, such as render.
  //
  // @example simple getter
  // transaction => transaction.clientId
  //
  // @example complex transformation
  // row => formatPhoneNumber(row.areaCode, row.phoneNumber)
  get: T => U,

  // help text that appears when you hover the column
  help?: React$Node,

  // Given the return value from `get`, render a React node. If not provided,
  // the return value from `get` is rendered directly.
  render?: (U, T) => React$Node,

  className?: string | ((U, T) => ?string),
  style?: { ... } | ((U, T) => { ... }),
  rightAlign?: boolean,

  as?: (CellProps<T>) => React$Node,
};

export type CellProps<T> = {
  children?: React$Node,
  className?: ?string,
  styleName?: string,
  colSpan?: number,
  rowSpan?: number,
  datum?: T,
  rightAlign?: boolean,
  style?: ?{ ... },
};
