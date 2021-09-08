// @flow

import Styles from './filterableTable.css';

export default function Title({
  children,
}: {
  children: React$Node,
}): React$Node {
  return <div styleName="Title">{children}</div>;
}
