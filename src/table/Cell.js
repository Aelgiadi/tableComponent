// @flow

import Styles from './tableStyles.css';
import type { CellProps } from './types';

export default function DefaultCell<T>({
  className,
  children,
  colSpan = 1,
  rowSpan = 1,
  style,
  rightAlign,
}: CellProps<T>): React$Node {
  return (
    <td
      style={style}
      className={className}
      colSpan={colSpan === 1 ? undefined : colSpan}
      rowSpan={rowSpan === 1 ? undefined : rowSpan}
      styleName={{ DefaultCell: true, rightAlign }}
    >
      {children}
    </td>
  );
}
