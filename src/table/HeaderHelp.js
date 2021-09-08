// @flow

import Icon from '/icon';
import type { TColumn } from './types';
import Styles from './HeaderHelp.css';

type Props<T> = {
  columns: Array<TColumn<T>>,
  columnIndex: number,
};

export default function HeaderHelp<T>({
  columns,
  columnIndex,
}: Props<T>): React$Node {
  return (
    <>
      <HelpIcon />
      <HelpDialog columns={columns} columnIndex={columnIndex} />
    </>
  );
}

function HelpIcon() {
  return <Icon styleName="HeaderHelpIcon">help_outline</Icon>;
}

function HelpDialog<T>({
  columns,
  columnIndex,
}: {
  columns: Array<TColumn<T>>,
  columnIndex: number,
}) {
  const column = columns[columnIndex];
  return (
    <div
      styleName={{
        HeaderHelp: true,
        'HeaderHelp--right': columnIndex > 5,
      }}
    >
      {column.help}
      <BackgroundIcon />
    </div>
  );
}

function BackgroundIcon() {
  return <Icon styleName="HeaderHelpBackgroundIcon">help_outline</Icon>;
}
