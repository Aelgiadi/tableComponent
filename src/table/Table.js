// @flow

import { isValidElement, memo } from 'react';

import DefaultHeader from './Header';
import DefaultRow, { type RowProps } from './Row';
import SummaryRow, { isSummaryRow } from './SummaryRow';
import TitleRow, { isTitleRow } from './TitleRow';
import type { TColumn, TSortable } from './types';
import Banner from './Banner';
import Styles from './tableStyles.css';

export type TableProps<T, U, R> = {
  columns: Array<TColumn<T, U>>,
  data: Array<T>,
  className?: string,
  styleName?: TStyleName,
  style?: any,
  Row?: React$AbstractComponent<RowProps<T, U, R>, void>,
  header?: React$Node,
  footer?: React$Node,
  extraRowProps?: R,
};

const MemoDefaultRow: any = memo(DefaultRow);

export function Table<T, U: TSortable, R>({
  columns,
  data,
  className,
  style,
  Row = MemoDefaultRow,
  header = <DefaultHeader columns={columns} />,
  footer = false,
  extraRowProps,
}: TableProps<T, U, R>): React$Node {
  return (
    <>
      <Banner />
      <table styleName="Table" className={className} style={style}>
        {header}
        <tbody key={skipDiffWhenColumnsChange(columns)}>
          {data.map((datum, j) => {
            // Other tables may "cheat" and add react nodes to the data array.
            // In that case, render them without any additional processing.
            if (isValidElement(datum)) return (datum: any);

            let Component = Row;
            if (isTitleRow(datum)) Component = TitleRow;
            if (isSummaryRow(datum)) Component = SummaryRow;
            return (
              <Component
                // use an ID from the data if we have one and an index if not
                key={(datum: any)?.id || 'reactkey-' + j}
                datum={datum}
                columns={columns}
                {...(extraRowProps: any)}
              />
            );
          })}
        </tbody>
        {footer}
      </table>
    </>
  );
}

function skipDiffWhenColumnsChange<T>(columns: Array<TColumn<T>>): number {
  // If the columns change, skip the virtual DOM diff and just
  // rerender the whole table from scratch.
  // This ends up being more performant because virtual DOM diffing
  // adds overhead when we already know this change will fail a diff.
  //
  // This field gets assigned to the key prop because changing
  // the key prop causes the virtual DOM diff to be skipped.
  return columns.length;
}
