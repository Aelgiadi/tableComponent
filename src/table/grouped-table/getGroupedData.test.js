// @flow
/* eslint-env jest */

import { getGroupedData, flattenGroupData } from './getGroupedData';

describe('no grouping', () => {
  const columnA = { title: 'A', get: d => d.a };
  const columnB = { title: 'B', get: d => d.b };

  test('empty', () => {
    const data = [];
    const columns = [columnA, columnB];
    expect(getGroupedData(data, columns)).toEqual([]);
  });

  test('basic', () => {
    const data = [
      { a: 1, b: -1 },
      { a: 2, b: -2 },
      { a: 3, b: -3 },
    ];
    const columns = [columnA, columnB];
    expect(getGroupedData(data, columns)).toEqual(data);
  });
});

describe('one group', () => {
  const columnA = { title: 'A', get: d => d.a, groupBy: true };
  const columnB = { title: 'B', get: d => d.b };

  test('empty', () => {
    const data = [];
    const columns = [columnA, columnB];
    expect(getGroupedData(data, columns)).toEqual([]);
  });

  test('basic', () => {
    const data = [
      { a: 1, b: 'a' },
      { a: 1, b: 'b' },
      { a: 1, b: 'c' },
      { a: 2, b: 'a' },
      { a: 2, b: 'b' },
    ];
    const columns = [columnA, columnB];
    expect(getGroupedData(data, columns)).toEqual([
      [
        { a: 1, b: 'a' },
        { a: 1, b: 'b' },
        { a: 1, b: 'c' },
      ],
      [
        { a: 2, b: 'a' },
        { a: 2, b: 'b' },
      ],
    ]);
  });
});

describe('two groups', () => {
  const columnA = { title: 'A', get: d => d.a, groupBy: true };
  const columnB = { title: 'B', get: d => d.b, groupBy: true };
  const columnC = { title: 'B', get: d => d.c };

  test('empty', () => {
    const data = [];
    const columns = [columnA, columnB, columnC];
    expect(getGroupedData(data, columns)).toEqual([]);
  });

  test('basic', () => {
    const data = [
      { a: 1, b: 'a', c: false },
      { a: 1, b: 'a', c: true },
      { a: 1, b: 'b', c: true },
      { a: 2, b: 'a', c: true },
      { a: 2, b: 'b', c: false },
    ];
    const columns = [columnA, columnB];
    // prettier-ignore
    expect(getGroupedData(data, columns)).toEqual([
      [
        [
          { a: 1, b: 'a', c: false },
          { a: 1, b: 'a', c: true },
        ],
        [
          { a: 1, b: 'b', c: true },
        ],
      ],
      [
        [
          { a: 2, b: 'a', c: true },
        ],
        [
          { a: 2, b: 'b', c: false },
        ],
      ],
    ]);
  });
});

describe('flattenGroupData', () => {
  expect(
    flattenGroupData(
      [
        // prettier-ignore
        [
          [
            { a: 1, b: 'a', c: false },
            { a: 1, b: 'a', c: true },
          ],
          [
            { a: 1, b: 'b', c: true },
          ],
        ],
        // prettier-ignore
        [
          [
            { a: 2, b: 'a', c: true },
          ],
          [
            { a: 2, b: 'b', c: false },
          ],
        ],
      ],
      (group, flattened) => 'group span ' + (flattened.length + 1),
    ),
  ).toEqual([
    'group span 6',
    'group span 3',
    { a: 1, b: 'a', c: false },
    { a: 1, b: 'a', c: true },
    'group span 2',
    { a: 1, b: 'b', c: true },

    'group span 5',
    'group span 2',
    { a: 2, b: 'a', c: true },
    'group span 2',
    { a: 2, b: 'b', c: false },
  ]);
});
