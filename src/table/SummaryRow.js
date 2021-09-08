// @flow

import DefaultCell from './Cell';
import { identity } from './Row';
import type { TColumn, TSortable } from './types';

import Styles from './tableStyles.css';

type Props<T, U> = {
  columns: Array<TColumn<T, U>>,
  datum: T,
};

export type TSummaryRow = {
  rowType: 'summary',
  [string]: any,
};

export default function SummaryRow<T, U: TSortable>({
  columns,
  datum,
}: Props<T, U>): React$Node {
  return (
    <tr styleName="SummaryRow">
      {columns.map((column, i) => {
        const render = column.render ?? identity;
        return (
          <DefaultCell key={i} rightAlign={column.rightAlign}>
            {render(column.get(datum), datum)}
          </DefaultCell>
        );
      })}
    </tr>
  );
}

export function createSummaryRow<T>(datum: T): TSummaryRow {
  return {
    rowType: 'summary',
    ...datum,
  };
}

export function isSummaryRow(datum: any): boolean {
  return (datum?.rowType ?? '') === 'summary';
}
