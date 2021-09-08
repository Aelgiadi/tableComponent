// @flow

import Styles from './filterableTable.css';

export default function Header({
  children,
}: {
  children: React$Node,
}): React$Node {
  return <div styleName="Header">{children}</div>;
}
