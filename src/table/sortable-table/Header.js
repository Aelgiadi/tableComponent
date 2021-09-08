// @flow

import { isValidElement, useLayoutEffect, useState } from 'react';

import Icon from '/icon';
import Sticker from '/sticker';
import type { TSortableColumn } from './types';
import type { TColumn } from '../types';
import HeaderHelp from '../HeaderHelp';

import Styles from './sortableTableStyles.css';
import TableStyles from '../tableStyles.css';

type Props<T> = {
  columns: Array<TSortableColumn<T>>,
  sortedData: Array<T>,
  onSort: number => void,
  sortAscending: boolean,
  sortIndex: ?number,
};

export default function SortingHeader<T>(props: Props<T>): React$Node {
  return (
    <Sticker>
      <thead styleName="SortingHeader" className={TableStyles.Header}>
        <tr>
          {props.columns.map((col, i) => (
            <SortableCell key={i} column={col} index={i} {...props} />
          ))}
        </tr>
      </thead>
    </Sticker>
  );
}

function SortableCell<T>({
  column,
  columns,
  sortedData,
  index,
  onSort,
  sortIndex,
  sortAscending,
}: {
  column: TSortableColumn<T>,
  columns: Array<TSortableColumn<T>>,
  sortedData: Array<T>,
  index: number,
  onSort: number => void,
  sortIndex: ?number,
  sortAscending: boolean,
}) {
  const [loading, sort] = useSort(sortedData);
  return (
    <Cell column={column} onClick={() => sort(() => onSort(index))}>
      <div styleName="SortingHeaderCell">
        {loading && <LoadingIcon />}
        {!loading && sortIndex === index && (
          <SortIcon ascending={sortAscending} />
        )}
        {isValidElement(column.title) && column.title}
        {isValidElement(column.title) || <span>{column.title}</span>}
        {column.help && (
          <HeaderHelp columns={toColumns(columns)} columnIndex={index} />
        )}
      </div>
    </Cell>
  );
}

// Beyond this threshold, the UI "freezes" for a moment while sorting.
// We want to show a spinner in this case to indicate that someting is
// happening.
const heuristicForExpensiveSortingThreshold = 5 * 1000;

function useSort<T>(sortedData: T[]): [boolean, (() => void) => void] {
  const [loading, setLoading] = useState(false);
  const sort = callback => {
    if (sortedData.length > heuristicForExpensiveSortingThreshold) {
      setLoading(true);
      setTimeout(callback, 100);
    } else {
      callback();
    }
  };
  useLayoutEffect(() => setLoading(false), [sortedData]);
  return [loading, sort];
}

function Cell<T>({
  children,
  column,
  onClick,
}: {
  children: React$Node,
  column: TSortableColumn<T>,
  onClick: TFunction,
}) {
  const sortable = column.compare !== false;
  return (
    <th
      className={column.className}
      styleName={{ sortable, rightAlign: column.rightAlign }}
      onClick={sortable ? onClick : undefined}
      role={sortable ? 'button' : undefined}
    >
      {children}
    </th>
  );
}

function SortIcon({ ascending }: { ascending: boolean }) {
  return (
    <Icon styleName="SortingHeaderSortIcon">
      {ascending ? 'arrow_upward' : 'arrow_downward'}
    </Icon>
  );
}

function LoadingIcon() {
  return <Icon styleName="SortingHeaderSortIcon">axc_progress</Icon>;
}

function toColumns<T>(columns: Array<TSortableColumn<T>>): Array<TColumn<T>> {
  // we know better than flow here
  return (columns: any);
}
