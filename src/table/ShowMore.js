// @flow

import { useEffect, useRef, useState } from 'react';

import Styles from './tableStyles.css';

export const defaultShowMoreWidth = 180;

export function ShowMore({
  children,
  width = defaultShowMoreWidth,
}: {
  children: string | ?number,
  width?: number,
}): React$Node {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(!expanded);
  const [ref, long] = useLongEffect(children);
  return (
    <div
      styleName={{
        ShowMore: true,
        'ShowMore--expanded': expanded,
      }}
      style={{ maxWidth: width + 'px' }}
      title={long && !expanded ? children : ''}
    >
      <span ref={ref}>{children}</span>
      {(long || expanded) && <Expand expanded={expanded} toggle={toggle} />}
    </div>
  );
}

function Expand({
  expanded,
  toggle,
}: {
  expanded: boolean,
  toggle: () => mixed,
}) {
  const click = event => {
    event.preventDefault();
    toggle();
  };
  return (
    <a href="" onClick={click}>
      {expanded ? 'less' : 'more'}
    </a>
  );
}

function useLongEffect(children) {
  const [long, setLong] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    setLong(node.scrollWidth > node.clientWidth);
  }, [children]);
  return [ref, long];
}
