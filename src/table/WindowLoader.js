// @flow

import Progress from '/progress';
import Styles from './tableStyles.css';

export function WindowLoader(): React$Node {
  return (
    <div styleName="Loading">
      <Progress />
    </div>
  );
}
