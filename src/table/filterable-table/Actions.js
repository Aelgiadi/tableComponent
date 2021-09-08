// @flow

import Styles from './filterableTable.css';

export default function Actions({
  children,
}: {
  children: React$Node,
}): React$Node {
  return <div styleName="Actions">{children}</div>;
}
