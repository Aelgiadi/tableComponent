// @flow
/* eslint-env jest */

import toNumber from 'lodash/toNumber';

import {
  stringCompare,
  numberCompare,
  booleanCompare,
  dateCompare,
} from '/utils';

import { sortData, sortRows } from '../useSortedData';
import { createTitleRow } from '../../TitleRow';
import { createSummaryRow } from '../../SummaryRow';

const booleanColumn = {
  title: 'date',
  compare: (a, b) => booleanCompare(a, b),
  get: (data: any) => data.boolean,
};
const dateColumn = {
  title: 'date',
  compare: (a, b) => dateCompare(a, b),
  get: (data: any) => data.date,
};
const numberColumn = {
  title: 'number',
  compare: (a, b) => numberCompare(toNumber(a), toNumber(b)),
  get: (data: any) => data.number,
};
const stringColumn = {
  title: 'string',
  compare: (a, b) => stringCompare(a, b),
  get: (data: any) => data.string,
};

describe('sortRows', () => {
  let actual = [];
  let expected = [];
  const rows = [
    { date: '2020-09-01 09:00:00', number: 99, string: 'abc', boolean: false },
    { date: '2020-09-03 09:00:00', number: 300, string: 'mno', boolean: true },
    { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
    { date: '2020-09-07 09:00:00', number: 999, string: 'ghi', boolean: false },
    { date: '2020-09-05 09:00:00', number: 23, string: 'vwx', boolean: false },
    { date: '2020-09-09 09:00:00', number: 68, string: 'bcd', boolean: false },
    { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
    { date: '2020-09-02 09:00:00', number: 125, string: 'pqr', boolean: false },
    { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
    { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
  ];

  it('should work for a boolean comparator', () => {
    // ascending order
    actual = sortRows(rows, [booleanColumn], booleanColumn, true);
    expected = [
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // descending order
    actual = sortRows(rows, [booleanColumn], booleanColumn, false);
    expected = [
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
    ];
    expect(actual).toEqual(expected);
  });

  it('should work for a date comparator', () => {
    // ascending order
    actual = sortRows(rows, [dateColumn], dateColumn, true);
    expected = [
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
    ];
    expect(actual).toEqual(expected);

    // descending order
    actual = sortRows(rows, [dateColumn], dateColumn, false);
    expected = [
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);
  });

  it('should work for a number comparator', () => {
    // ascending order
    actual = sortRows(rows, [numberColumn], numberColumn, true);
    expected = [
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // descending order
    actual = sortRows(rows, [numberColumn], numberColumn, false);
    expected = [
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
    ];
    expect(actual).toEqual(expected);
  });

  it('should work for a string comparator', () => {
    // ascending order
    actual = sortRows(rows, [stringColumn], stringColumn, true);
    expected = [
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
    ];
    expect(actual).toEqual(expected);

    // descending order
    actual = sortRows(rows, [stringColumn], stringColumn, false);
    expected = [
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);
  });
});

describe('sortData', () => {
  let actual = [];
  let expected = [];
  let rows = [];

  it('should work only for default rows', () => {
    rows = [
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
    ];

    // boolean comparator | ascending order
    actual = sortData(rows, [booleanColumn], booleanColumn, true);
    expected = [
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // boolean comparator | descending order
    actual = sortData(rows, [booleanColumn], booleanColumn, false);
    expected = [
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
    ];
    expect(actual).toEqual(expected);

    // date comparator | ascending order
    actual = sortData(rows, [dateColumn], dateColumn, true);
    expected = [
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
    ];
    expect(actual).toEqual(expected);

    // date comparator | descending order
    actual = sortData(rows, [dateColumn], dateColumn, false);
    expected = [
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // number comparator | ascending order
    actual = sortData(rows, [numberColumn], numberColumn, true);
    expected = [
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // number comparator | descending order
    actual = sortData(rows, [numberColumn], numberColumn, false);
    expected = [
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
    ];
    expect(actual).toEqual(expected);

    // string comparator | ascending order
    actual = sortData(rows, [stringColumn], stringColumn, true);
    expected = [
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // string comparator | descending order
    actual = sortData(rows, [stringColumn], stringColumn, false);
    expected = [
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);
  });

  it('should work for default rows and summary rows', () => {
    rows = [
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createSummaryRow({ number: 402 }),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      createSummaryRow({ number: 1022 }),
    ];

    // boolean comparator | ascending order
    actual = sortData(rows, [booleanColumn], booleanColumn, true);
    expected = [
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createSummaryRow({ number: 402 }),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      createSummaryRow({ number: 1022 }),
    ];
    expect(actual).toEqual(expected);

    // boolean comparator | descending order
    actual = sortData(rows, [booleanColumn], booleanColumn, false);
    expected = [
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      createSummaryRow({ number: 402 }),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      createSummaryRow({ number: 1022 }),
    ];
    expect(actual).toEqual(expected);

    // date comparator | ascending order
    actual = sortData(rows, [dateColumn], dateColumn, true);
    expected = [
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      createSummaryRow({ number: 402 }),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      createSummaryRow({ number: 1022 }),
    ];
    expect(actual).toEqual(expected);

    // date comparator | descending order
    actual = sortData(rows, [dateColumn], dateColumn, false);
    expected = [
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createSummaryRow({ number: 402 }),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      createSummaryRow({ number: 1022 }),
    ];
    expect(actual).toEqual(expected);

    // number comparator | ascending order
    actual = sortData(rows, [numberColumn], numberColumn, true);
    expected = [
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      createSummaryRow({ number: 402 }),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      createSummaryRow({ number: 1022 }),
    ];
    expect(actual).toEqual(expected);

    // number comparator | descending order
    actual = sortData(rows, [numberColumn], numberColumn, false);
    expected = [
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-10 09:00:00',
        number: 3,
        string: 'stu',
        boolean: true,
      },
      createSummaryRow({ number: 402 }),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      createSummaryRow({ number: 1022 }),
    ];
    expect(actual).toEqual(expected);

    // string comparator | ascending order
    actual = sortData(rows, [stringColumn], stringColumn, true);
    expected = [
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createSummaryRow({ number: 402 }),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      createSummaryRow({ number: 1022 }),
    ];
    expect(actual).toEqual(expected);

    // string comparator | descending order
    actual = sortData(rows, [stringColumn], stringColumn, false);
    expected = [
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createSummaryRow({ number: 402 }),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      createSummaryRow({ number: 1022 }),
    ];
    expect(actual).toEqual(expected);
  });

  it('should work for default rows and title rows', () => {
    rows = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createTitleRow('Title 2'),
      createTitleRow('Title 3'),
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createTitleRow('Title 4'),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
    ];

    // boolean comparator | ascending order
    actual = sortData(rows, [booleanColumn], booleanColumn, true);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createTitleRow('Title 2'),
      createTitleRow('Title 3'),
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createTitleRow('Title 4'),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // boolean comparator | descending order
    actual = sortData(rows, [booleanColumn], booleanColumn, false);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createTitleRow('Title 2'),
      createTitleRow('Title 3'),
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      createTitleRow('Title 4'),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // date comparator | ascending order
    actual = sortData(rows, [dateColumn], dateColumn, true);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createTitleRow('Title 2'),
      createTitleRow('Title 3'),
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createTitleRow('Title 4'),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // date comparator | descending order
    actual = sortData(rows, [dateColumn], dateColumn, false);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createTitleRow('Title 2'),
      createTitleRow('Title 3'),
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      createTitleRow('Title 4'),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // number comparator | ascending order
    actual = sortData(rows, [numberColumn], numberColumn, true);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createTitleRow('Title 2'),
      createTitleRow('Title 3'),
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      createTitleRow('Title 4'),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // number comparator | descending order
    actual = sortData(rows, [numberColumn], numberColumn, false);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createTitleRow('Title 2'),
      createTitleRow('Title 3'),
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createTitleRow('Title 4'),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // string comparator | ascending order
    actual = sortData(rows, [stringColumn], stringColumn, true);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createTitleRow('Title 2'),
      createTitleRow('Title 3'),
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createTitleRow('Title 4'),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);

    // string comparator | descending order
    actual = sortData(rows, [stringColumn], stringColumn, false);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createTitleRow('Title 2'),
      createTitleRow('Title 3'),
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      createTitleRow('Title 4'),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
    ];
    expect(actual).toEqual(expected);
  });

  it('should work for default rows, summary rows and title rows', () => {
    rows = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createSummaryRow({ number: 402 }),
      createTitleRow('Title 2'),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      createSummaryRow({ number: 1090 }),
      createTitleRow('Title 3'),
      createSummaryRow({ number: 0 }),
      createTitleRow('Title 4'),
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      createSummaryRow({ number: 210 }),
      createTitleRow('Title 5'),
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      createSummaryRow({ number: 7 }),
    ];

    // boolean comparator | ascending order
    actual = sortData(rows, [booleanColumn], booleanColumn, true);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createSummaryRow({ number: 402 }),
      createTitleRow('Title 2'),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      createSummaryRow({ number: 1090 }),
      createTitleRow('Title 3'),
      createSummaryRow({ number: 0 }),
      createTitleRow('Title 4'),
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      createSummaryRow({ number: 210 }),
      createTitleRow('Title 5'),
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      createSummaryRow({ number: 7 }),
    ];
    expect(actual).toEqual(expected);

    // boolean comparator | descending order
    actual = sortData(rows, [booleanColumn], booleanColumn, false);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      createSummaryRow({ number: 402 }),
      createTitleRow('Title 2'),
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      createSummaryRow({ number: 1090 }),
      createTitleRow('Title 3'),
      createSummaryRow({ number: 0 }),
      createTitleRow('Title 4'),
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      createSummaryRow({ number: 210 }),
      createTitleRow('Title 5'),
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      createSummaryRow({ number: 7 }),
    ];
    expect(actual).toEqual(expected);

    // date comparator | ascending order
    actual = sortData(rows, [dateColumn], dateColumn, true);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createSummaryRow({ number: 402 }),
      createTitleRow('Title 2'),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      createSummaryRow({ number: 1090 }),
      createTitleRow('Title 3'),
      createSummaryRow({ number: 0 }),
      createTitleRow('Title 4'),
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      createSummaryRow({ number: 210 }),
      createTitleRow('Title 5'),
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      createSummaryRow({ number: 7 }),
    ];
    expect(actual).toEqual(expected);

    // date comparator | descending order
    actual = sortData(rows, [dateColumn], dateColumn, false);
    expected = [
      createTitleRow('Title 1'),
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createSummaryRow({ number: 402 }),
      createTitleRow('Title 2'),
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      createSummaryRow({ number: 1090 }),
      createTitleRow('Title 3'),
      createSummaryRow({ number: 0 }),
      createTitleRow('Title 4'),
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      createSummaryRow({ number: 210 }),
      createTitleRow('Title 5'),
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      createSummaryRow({ number: 7 }),
    ];
    expect(actual).toEqual(expected);

    // number comparator | ascending order
    actual = sortData(rows, [numberColumn], numberColumn, true);
    expected = [
      createTitleRow('Title 1'),
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      createSummaryRow({ number: 402 }),
      createTitleRow('Title 2'),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      createSummaryRow({ number: 1090 }),
      createTitleRow('Title 3'),
      createSummaryRow({ number: 0 }),
      createTitleRow('Title 4'),
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      createSummaryRow({ number: 210 }),
      createTitleRow('Title 5'),
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      createSummaryRow({ number: 7 }),
    ];
    expect(actual).toEqual(expected);

    // number comparator | descending order
    actual = sortData(rows, [numberColumn], numberColumn, false);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createSummaryRow({ number: 402 }),
      createTitleRow('Title 2'),
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      createSummaryRow({ number: 1090 }),
      createTitleRow('Title 3'),
      createSummaryRow({ number: 0 }),
      createTitleRow('Title 4'),
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      createSummaryRow({ number: 210 }),
      createTitleRow('Title 5'),
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      createSummaryRow({ number: 7 }),
    ];
    expect(actual).toEqual(expected);

    // string comparator | ascending order
    actual = sortData(rows, [stringColumn], stringColumn, true);
    expected = [
      createTitleRow('Title 1'),
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      createSummaryRow({ number: 402 }),
      createTitleRow('Title 2'),
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      createSummaryRow({ number: 1090 }),
      createTitleRow('Title 3'),
      createSummaryRow({ number: 0 }),
      createTitleRow('Title 4'),
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      createSummaryRow({ number: 210 }),
      createTitleRow('Title 5'),
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      createSummaryRow({ number: 7 }),
    ];
    expect(actual).toEqual(expected);

    // string comparator | descending order
    actual = sortData(rows, [stringColumn], stringColumn, false);
    expected = [
      createTitleRow('Title 1'),
      { date: '2020-09-10 09:00:00', number: 3, string: 'stu', boolean: true },
      {
        date: '2020-09-03 09:00:00',
        number: 300,
        string: 'mno',
        boolean: true,
      },
      {
        date: '2020-09-01 09:00:00',
        number: 99,
        string: 'abc',
        boolean: false,
      },
      createSummaryRow({ number: 402 }),
      createTitleRow('Title 2'),
      {
        date: '2020-09-05 09:00:00',
        number: 23,
        string: 'vwx',
        boolean: false,
      },
      {
        date: '2020-09-07 09:00:00',
        number: 999,
        string: 'ghi',
        boolean: false,
      },
      {
        date: '2020-09-09 09:00:00',
        number: 68,
        string: 'bcd',
        boolean: false,
      },
      createSummaryRow({ number: 1090 }),
      createTitleRow('Title 3'),
      createSummaryRow({ number: 0 }),
      createTitleRow('Title 4'),
      {
        date: '2020-09-02 09:00:00',
        number: 125,
        string: 'pqr',
        boolean: false,
      },
      { date: '2020-09-08 09:00:00', number: 40, string: 'jkl', boolean: true },
      { date: '2020-09-06 09:00:00', number: 45, string: 'def', boolean: true },
      createSummaryRow({ number: 210 }),
      createTitleRow('Title 5'),
      { date: '2020-09-04 09:00:00', number: 7, string: 'yza', boolean: true },
      createSummaryRow({ number: 7 }),
    ];
    expect(actual).toEqual(expected);
  });
});

describe('grouping', () => {
  it('works ascending', () => {
    const columnA = { title: 'A', get: datum => datum.a, groupBy: true };
    const columnB = { title: 'B', get: datum => datum.b, groupBy: true };
    const columnC = { title: 'C', get: datum => datum.c };
    const columnD = { title: 'D', get: datum => datum.d, initialSort: true };
    const columns = [columnA, columnB, columnC, columnD];

    const data = [
      { a: 1, b: 2, c: 3, d: 5 },
      { a: 1, b: 2, c: 3, d: 4 },
      { a: 1, b: 3, c: 3, d: 3 },
      { a: 2, b: 3, c: 3, d: 2 },
      { a: 2, b: 3, c: 3, d: 1 },
    ];
    const expected = [
      { a: 1, b: 2, c: 3, d: 4 },
      { a: 1, b: 2, c: 3, d: 5 },
      { a: 1, b: 3, c: 3, d: 3 },
      { a: 2, b: 3, c: 3, d: 1 },
      { a: 2, b: 3, c: 3, d: 2 },
    ];

    expect(sortRows(data, columns, columnD, true)).toEqual(expected);
  });

  it('works descending', () => {
    const columnA = { title: 'A', get: datum => datum.a, groupBy: true };
    const columnB = { title: 'B', get: datum => datum.b, groupBy: true };
    const columnC = { title: 'C', get: datum => datum.c };
    const columnD = { title: 'D', get: datum => datum.d, initialSort: true };
    const columns = [columnA, columnB, columnC, columnD];

    const data = [
      { a: 1, b: 2, c: 3, d: 5 },
      { a: 1, b: 2, c: 3, d: 4 },
      { a: 1, b: 3, c: 3, d: 3 },
      { a: 2, b: 3, c: 3, d: 2 },
      { a: 2, b: 3, c: 3, d: 1 },
    ];
    const expected = [
      { a: 1, b: 2, c: 3, d: 4 },
      { a: 1, b: 2, c: 3, d: 5 },
      { a: 1, b: 3, c: 3, d: 3 },
      { a: 2, b: 3, c: 3, d: 1 },
      { a: 2, b: 3, c: 3, d: 2 },
    ].reverse();

    expect(sortRows(data, columns, columnD, false)).toEqual(expected);
  });
});
