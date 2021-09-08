// @flow

import Sticker from '/sticker';

import { identity } from '../Row';
import DefaultCell from '../Cell';

import type { TSortable } from '../types';
import type { TGroupedColumn } from './types';
import Styles from '../tableStyles.css';

type Props<T, U> = {
  columns: Array<TGroupedColumn<T, U>>,
  data: Array<T>,
  extraRows?: number,
  depth: number,
  level: number,
};

export default function GroupRow<T, U: TSortable>({
  columns,
  data,
  extraRows = 0,
  depth,
  level,
}: Props<T, U>): React$Node {
  let currentGroupDepth = -1;
  return (
    <tr styleName={{ GroupRow: true, [`GroupRow--${level}`]: true }}>
      {columns.map((column, i) => {
        const { as: Cell = DefaultCell, groupBy } = column;
        if (groupBy) {
          currentGroupDepth = currentGroupDepth + 1;
          if (currentGroupDepth < depth) return null;
        }

        const isGroup = groupBy && currentGroupDepth === depth;
        let rendered = null;
        if (isGroup) {
          rendered = <GroupByColumn column={column} data={data} />;
        } else if (column.aggregate != null) {
          rendered = <AggregatedColumn column={column} data={data} />;
        }
        const span = data.length + 1 + extraRows;
        return (
          <Cell
            key={i}
            rightAlign={column.rightAlign}
            rowSpan={isGroup ? span : 1}
          >
            {rendered}
          </Cell>
        );
      })}
    </tr>
  );
}

function GroupByColumn<T, U: TSortable>({
  column,
  data,
}: {
  column: TGroupedColumn<T, U>,
  data: T[],
}) {
  const { render = identity } = column;
  return (
    <Sticker top={calculateTop}>
      <div>{render(column.get(data[0]), data[0])}</div>
    </Sticker>
  );
}

function AggregatedColumn<T, U: TSortable>({
  column,
  data,
}: {
  column: TGroupedColumn<T, U>,
  data: T[],
}): React$Node {
  const { aggregate, get } = column;
  if (aggregate == null) return null;
  const render = column.renderAggregate ?? column.render ?? identity;
  return render(aggregate(data.map(get), data), data[0]) ?? null;
}

function calculateTop(node: HTMLElement) {
  // if we are inside a table with a sticky header, stick the group headings too
  const head = node.closest('table')?.querySelector('th');
  if (head == null) return 0;
  if (head.style.position !== 'sticky') return 0;
  const top = parseInt(head.style.top);
  if (!top) return 0;
  return top + head.clientHeight + 4;
}
