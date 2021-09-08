// @flow

import { useMemo } from 'react';
import { useSelections } from './useSelections';

export function SelectAll<T: { id: string }>({
  data,
}: {
  data: Array<T>,
}): React$Node {
  const [selections, setSelections, disabledSelectionRow] = useSelections();
  const ids = useMemo(() => {
    if (disabledSelectionRow == null) return data.map(d => d.id);

    return data.filter(d => !disabledSelectionRow(d)).map(d => d.id);
  }, [data, disabledSelectionRow]);

  const disabled = useMemo(() => {
    if (disabledSelectionRow == null) return false;
    if (data.length === 0) return true;
    return data.every(option => disabledSelectionRow(option));
  }, [data, disabledSelectionRow]);

  const checked = useMemo(() => {
    if (ids.length === 0) return false;
    if (selections.size < ids.length) return false;
    return ids.every(id => selections.has(id));
  }, [ids, selections]);

  const toggle = () => {
    if (checked) return new Set();
    return new Set(ids);
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={() => setSelections(toggle())}
    />
  );
}

export function SelectOne({
  id,
  datum,
}: {
  id: string,
  datum: any,
}): React$Node {
  const [selections, setSelections, disabledSelectionRown] = useSelections();
  const checked = selections.has(id);
  const toggle = () => {
    if (checked) return difference(selections, id);
    return union(selections, id);
  };
  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabledSelectionRown(datum)}
      onChange={() => setSelections(toggle())}
    />
  );
}

function union<T>(set: $ReadOnlySet<T>, ...data: Array<T>): $ReadOnlySet<T> {
  const result = new Set(set);
  result.add(...data);
  return result;
}

function difference<T>(
  set: $ReadOnlySet<T>,
  ...data: Array<T>
): $ReadOnlySet<T> {
  const result = new Set(set);
  result.delete(...data);
  return result;
}
