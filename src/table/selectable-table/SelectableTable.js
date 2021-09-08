// @flow

import { memo } from 'react';
import type { TSortable } from '../types';
import { SortableTable, type SortableTableProps } from '../sortable-table';
import BannerAddition from '../BannerAddition';

import { SelectionsProvider } from './useSelections';
import type { TSelections } from './types';
import useSelectableColumns from './useSelectableColumns';
import Styles from './SelectableTable.css';

export type SelectableTableProps<T, U, R> = {
  ...SortableTableProps<T, U, R>,
  selection?: {
    selections: TSelections,
    setSelections: TSelections => mixed,
    isRowDisabled?: T => boolean,
  },
};

export function SelectableTable<T, U: TSortable, R>({
  selection,
  ...props
}: SelectableTableProps<T, U, R>): React$Node {
  const hasSelection = selection != null;
  const columns = useSelectableColumns(props.columns, props.data, hasSelection);
  if (selection == null) return <MemoSortableTable {...props} />;
  const selections = selection.selections;
  return (
    <SelectionsProvider {...selection}>
      <BannerAddition addition={<Selected count={selections.size} />}>
        <MemoSortableTable {...props} columns={columns} />
      </BannerAddition>
    </SelectionsProvider>
  );
}

const MemoSortableTable: React$AbstractComponent<
  SortableTableProps<any, any, any>,
  void,
> = memo(SortableTable);

function Selected({ count }: { count: ?number }) {
  if (!count) return null;
  return (
    <div styleName="Selected BannerAddition">
      {count.toLocaleString()} selected
    </div>
  );
}
