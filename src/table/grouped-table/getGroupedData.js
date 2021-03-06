// @flow

import type { TSortable } from '../types';
import type { TGroupedColumn } from './types';

type TGrouped<T> = Array<T | TGrouped<T>>;

/**
 * Returns an array of data organized by groups.
 *
 * This function will perform a recursive grouping operation if specified
 * by the column definitions. If the columns group 3 times, then the
 * data structure returned by this function will be a 3-level array.
 *
 * @example
 * Take the following array:
 * [
 *   { a: 1, b: 'hello', c: true },
 *   { a: 1, b: 'hello', c: true },
 *   { a: 2, b: 'world', c: true },
 *   { a: 2, b: 'hello', c: true },
 *   { a: 2, b: 'world', c: false },
 * ]
 * If we group by a, then b, we'll get...
 * [
 *   // group for a: 1
 *   [
 *     // group for b: 'hello'
 *     [
 *       { a: 1, b: 'hello', c: true },
 *       { a: 1, b: 'hello', c: true },
 *     ],
 *   ],
 *   // group for a: 2
 *   [
 *     // group for b: 'hello'
 *     [
 *       { a: 2, b: 'hello', c: true },
 *     ],
 *     // group for b: 'world'
 *     [
 *       { a: 2, b: 'world', c: true },
 *       { a: 2, b: 'world', c: false },
 *     ]
 *   ]
 * ]
 */
export function getGroupedData<T, U: TSortable>(
  data: Array<T>,
  columns: Array<TGroupedColumn<T, U>>,
): TGrouped<T> {
  // recursion stopping conditions
  if (data.length === 0) return [];
  if (columns.length === 0) return (data: any);
  const column = columns[0];
  if (!column?.groupBy) return getGroupedData(data, columns.slice(1));

  const result = [];
  let aux = [data[0]];
  const commitAux = () => {
    result.push(getGroupedData(aux, columns.slice(1)));
    aux = [];
  };

  let prev = column.get(data[0]);
  for (let i = 1; i < data.length; ++i) {
    const current = column.get(data[i]);
    if (current !== prev) {
      commitAux();
      prev = current;
    }
    aux.push(data[i]);
  }
  commitAux();
  return result;
}

/**
 * Flattens out a grouped data structure (typically generated by getGroupedData)
 * with an opportunity to add a header to each group.
 *
 * @param {*} grouped  the data structure
 * @param {*} head     function that generates a group heading
 * @param {*} depth    current recursion depth (don't pass this in)
 */
export function flattenGroupData(
  grouped: any,
  head: any,
  depth: number = 0,
): any {
  if (!containsArray(grouped)) return grouped;
  return grouped.flatMap(group => {
    const flattened = flattenGroupData(group, head, depth + 1);
    const heading = head(group.flat(10), flattened, depth);
    return [heading, ...flattened];
  });
}

function containsArray(arr) {
  return arr.some(a => Array.isArray(a));
}
