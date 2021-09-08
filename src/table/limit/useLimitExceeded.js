// @flow

import { createContext, useContext } from 'react';

const LimitExceededContext = createContext<?boolean>(false);

export function LimitExceededProvider({
  exceeded,
  children,
}: {
  exceeded: ?boolean,
  children: React$Node,
}): React$Node {
  return (
    <LimitExceededContext.Provider value={exceeded}>
      {children}
    </LimitExceededContext.Provider>
  );
}

export function useLimitExceeded(): boolean {
  return useContext(LimitExceededContext) || false;
}
