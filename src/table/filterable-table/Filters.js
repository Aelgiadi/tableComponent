// @flow

import FilterChips from '/filter-chips';
import { usePinnedFilters, type TPins } from './usePinnedFilters';
import { makeColumnsFilter } from './columnsFilter';
import { useMemo } from 'react';
import { useFilters } from './FiltersProvider';
import Styles from './filterableTable.css';

export default function Filters(): React$Node {
  const {
    columns,
    values,
    onChange,
    filters,
    onCommit,
    showAllFirstTime,
    pinnedPrefName,
    columnsPrefName,
  } = useFilters();
  const initialPinned = useInitialPinnedFilters(showAllFirstTime, filters);
  const [pinned, setPinned] = usePinnedFilters(pinnedPrefName, initialPinned);
  const canChangeColumns = Boolean(columnsPrefName);

  return (
    <FilterChips
      styleName="Filters"
      filters={
        canChangeColumns ? filters.concat(makeColumnsFilter(columns)) : filters
      }
      values={values}
      onChange={onChange}
      onCommit={onCommit}
      pinned={pinned}
      onPin={setPinned}
    />
  );
}

function useInitialPinnedFilters(showAllFirstTime, filters): ?TPins {
  return useMemo(() => {
    if (!showAllFirstTime) return null;
    return filters.filter(f => !f.alwaysPinned).map(f => f.id);
  }, [showAllFirstTime, filters]);
}
