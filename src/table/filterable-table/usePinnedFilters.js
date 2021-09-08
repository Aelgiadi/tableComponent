// @flow

import { useState, useMemo, useCallback } from 'react';

import savePins from './savePins';

export type TPins = string[];

export function usePinnedFilters(
  prefName?: string,
  defaultPins?: ?TPins,
): [TPins, (TPins) => void] {
  const [pinned, setPinned] = useState(() =>
    getInitialPins(prefName, defaultPins),
  );
  const set = useCallback(
    pins => {
      setPinned(pins);
      if (prefName != null) savePins(prefName, pins);
    },
    [prefName],
  );
  return useMemo(() => [pinned, set], [pinned, set]);
}

function getInitialPins(prefName: ?string, defaultPins: ?TPins): TPins {
  const pins = (global.axiscarePrefs ?? {})[prefName];
  if (Array.isArray(pins)) return pins;
  if (defaultPins) return defaultPins;
  return [];
}
