// @flow

import { createContext, useContext, useMemo } from 'react';
import type { TSelections } from './types';

type TSelectionsContext = [
  TSelections,
  (TSelections) => mixed,
  (any) => boolean,
];

const SelectionsContext = createContext<?TSelectionsContext>(null);

export function SelectionsProvider({
  setSelections = noop,
  selections = empty,
  isRowDisabled = () => false,
  children,
}: {
  selections?: TSelections,
  setSelections?: TSelections => mixed,
  isRowDisabled?: any => boolean,
  children: React$Node,
}): React$Node {
  const value = useMemo(
    () => [selections, setSelections, isRowDisabled],
    [selections, setSelections, isRowDisabled],
  );
  return (
    <SelectionsContext.Provider value={value}>
      {children}
    </SelectionsContext.Provider>
  );
}

const noop = () => {};
const empty = new Set();

export function useSelections(): TSelectionsContext {
  const context = useContext(SelectionsContext);
  if (context == null) throw new Error('missing provider');
  return context;
}
