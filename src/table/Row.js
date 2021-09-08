// @flow

import DefaultCell from './Cell';

import type { TColumn, TSortable } from './types';

export type RowProps<T, U, R = {}> = {
  columns: Array<TColumn<T, U>>,
  datum: T,
  onClick?: (SyntheticEvent<HTMLElement>) => mixed,
  className?: string,
  style?: any,
  ...R,
};

export default function DefaultRow<T, U: TSortable, R>({
  columns,
  datum,
  onClick,
  className,
  style,
}: RowProps<T, U, R>): React$Node {
  return (
    <tr onClick={onClick} className={className} style={style}>
      {columns.map((column, i) => {
        const Cell = column.as ?? DefaultCell;
        const render = column.render ?? identity;
        return (
          <Cell
            key={i}
            className={resolveClassName(column, datum)}
            style={resolveStyle(column, datum)}
            rightAlign={column.rightAlign}
            datum={datum}
          >
            {render(column.get(datum), datum)}
          </Cell>
        );
      })}
    </tr>
  );
}

function resolveClassName<T, U: TSortable>(
  column: TColumn<T, U>,
  datum: T,
): ?string {
  let className = column.className;
  if (className == null) return className;
  if (typeof className === 'function') {
    className = className(column.get(datum), datum);
  }
  return className;
}

function resolveStyle<T, U: TSortable>(
  column: TColumn<T, U>,
  datum: T,
): ?{ ... } {
  let style = column.style;
  if (style == null) return style;
  if (typeof style === 'function') {
    style = style(column.get(datum), datum);
  }
  return style;
}

export function identity(x: TSortable, _: any): TSortable {
  if (typeof x === 'number') {
    const fixed = x.toFixed(2);
    if (fixed.endsWith('.00')) return fixed.slice(0, -3);
    return fixed;
  }
  return x;
}
