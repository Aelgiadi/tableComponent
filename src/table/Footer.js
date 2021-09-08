// @flow

import type { TColumn } from './types';

type Props<T> = {
  columns: Array<TColumn<T>>,
  data: T[],
};

export default function DefaultFooter<T>({ columns }: Props<T>): React$Node {
  return (
    <tfoot>
      <tr>
        {columns.map((el, index) => (
          <th key={index}>{el.title}</th>
        ))}
      </tr>
    </tfoot>
  );
}
