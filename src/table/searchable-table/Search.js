// @flow

import { useLayoutEffect, useState } from 'react';
import Icon from '/icon';
import Styles from './SearchableTable.css';

const heuristicForExpensiveSearchThreshold = 5000;

type Props = {
  count: number,
  value: string,
  onChange: string => mixed,
  disabled: boolean,
};

export default function Search(props: Props): React$Node {
  const [show, setShow] = useState(false);
  return (
    <div styleName="Search BannerAddition">
      {!show && <SearchButton onClick={() => setShow(true)} />}
      {show && <SearchInput {...props} />}
    </div>
  );
}

function SearchButton({ onClick }: { onClick: () => mixed }): React$Node {
  return (
    <div styleName="SearchButton">
      <button onClick={onClick}>
        <MagnifyingGlass />
        <span>Search</span>
      </button>
    </div>
  );
}

function SearchInput({
  count,
  value,
  onChange,
  disabled,
}: {
  count: number,
  value: string,
  onChange: string => mixed,
  disabled: boolean,
}): React$Node {
  const [pendingTerm, setPendingTerm] = useState<string>(value);
  const [searching, setSearching] = useState(false);
  const commit = () => {
    if (count > heuristicForExpensiveSearchThreshold) setSearching(true);
    setTimeout(() => onChange(pendingTerm), 50);
  };
  useLayoutEffect(() => {
    setSearching(false);
    setPendingTerm(value);
  }, [value]);

  return (
    <div
      styleName={{
        SearchInput: true,
        'SearchInput--pending': pendingTerm !== value,
      }}
    >
      <MagnifyingGlass />
      <input
        autoFocus
        disabled={disabled}
        placeholder="Narrow it down..."
        value={pendingTerm}
        onChange={event => setPendingTerm(event.target.value)}
        onKeyDown={event => {
          const enterKey = 13;
          if (event.which === enterKey) commit();
        }}
      />
      <button onClick={commit} disabled={disabled || searching}>
        {searching ? <Icon>axc_progress</Icon> : 'Search'}
      </button>
    </div>
  );
}

function MagnifyingGlass() {
  return (
    <svg height="20px" width="20px" viewBox="0 0 20 20" fill="currentColor">
      <circle
        cx="9"
        cy="9"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="14"
        y1="14"
        x2="19"
        y2="19"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
