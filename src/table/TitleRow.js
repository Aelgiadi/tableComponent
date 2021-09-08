// @flow

import DefaultCell from './Cell';
import type { TColumn } from './types';

import Styles from './tableStyles.css';

type Props<T> = {
  columns: Array<TColumn<T>>,
  datum: any,
};

export type TTitleRow = {
  rowType: 'title',
  title: string,
};

export default function TitleRow<T>({ columns, datum }: Props<T>): React$Node {
  return (
    <tr styleName="TitleRow">
      <DefaultCell colSpan={columns.length}>{datum?.title ?? ''}</DefaultCell>
    </tr>
  );
}

export function createTitleRow(title: string): TTitleRow {
  return {
    rowType: 'title',
    title: title,
  };
}

export function isTitleRow(datum: any): boolean {
  return (datum?.rowType ?? '') === 'title';
}
