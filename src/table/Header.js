// @flow

import Sticker from '/sticker';
import type { TColumn } from './types';
import Styles from './tableStyles.css';
import HeaderHelp from './HeaderHelp';

export type Props<T> = {
  columns: Array<TColumn<T>>,
};

export default function DefaultHeader<T>({ columns }: Props<T>): React$Node {
  return (
    <Sticker>
      <thead styleName="Header">
        <tr>
          {columns.map((col, i) => (
            <th
              key={i}
              className={col.className}
              styleName={{ rightAlign: col.rightAlign }}
            >
              <div styleName="HeaderCell">
                <span>{col.title}</span>
                {col.help && <HeaderHelp columns={columns} columnIndex={i} />}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    </Sticker>
  );
}
