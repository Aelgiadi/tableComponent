// @flow

import { useState } from 'react';
import Icon from '/icon';
import { createConfirmTooltip } from '/tooltip';

import LimitWarningIcon from './LimitWarningIcon';
import Styles from './Limit.css';

export default function Limit({
  truncated,
  setLimit,
  limit,
  options,
}: {
  limit: number,
  setLimit: number => mixed,
  truncated: ?boolean,
  options: ?Array<number>,
}): React$Node {
  return (
    <div styleName="Limit BannerAddition">
      <label>Limit to</label>
      <LimitSelect
        value={limit}
        onChange={setLimit}
        options={options ?? defaultLimitOptions}
      />
      {truncated && <LimitWarningIcon />}
    </div>
  );
}

function LimitSelect({
  value,
  onChange,
  options,
}: {
  value: number,
  onChange: number => mixed,
  options: Array<number>,
}) {
  const [node, setNode] = useState(null);
  return (
    <div styleName="LimitSelect">
      <span>{value.toLocaleString()}</span>
      <Icon>keyboard_arrow_down</Icon>
      <select
        ref={setNode}
        value={value}
        onChange={event => {
          const value = Number.parseInt(event.target.value);
          confirm(node, () => onChange(value));
        }}
      >
        {options.map(op => (
          <option key={op} value={op}>
            {op.toLocaleString()}
          </option>
        ))}
      </select>
    </div>
  );
}

const defaultLimitOptions = [
  10 * 1000,
  20 * 1000,
  30 * 1000,
  40 * 1000,
  50 * 1000,
  100 * 1000,
  200 * 1000,
  300 * 1000,
  400 * 1000,
  500 * 1000,
];

function confirm(node, onConfirm) {
  if (node)
    createConfirmTooltip(node, {
      contents:
        'Are you sure you want to change the limit? Choosing a large number may slow things down.',
      level: 'warning',
      confirmLabel: 'Bring it on!',
      onConfirm,
    });
}
