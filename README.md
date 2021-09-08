# Modular Table Component

In the middle of 2020 I was tasked with creating a table component that is easily digestible and has the ability to be used in it's simplest form _(displaying rows of data)_ as well as handle complex use cases such as grouping, searching, sorting, and paging. By providing column configurations, the table determines how to do each use case. The only required props for the table component are the data set and a collection of columns.

## Goals

1.  Provide a condensed view of data that is easily scannable
2.  Design a component that is reusable and extendable

## Challenges

- Handling large datasets (> 50000 rows) in a performant way.

## Technologies Used

- React
- Flow
- PostCSS

```
Basic Column Config

type TSortable = void | null | boolean | number | string;

type TColumn<T, U: ?TSortable = *> = {
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
  // the return value from `get` is rendered directly by default.
  render?: (U, T) => React$Node,

  className?: string | ((U, T) => ?string),
  style?: { ... } | ((U, T) => { ... }),
  rightAlign?: boolean,

  as?: (CellProps<T>) => React$Node,
};
```
