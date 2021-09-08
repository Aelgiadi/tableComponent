// @flow

import { Fragment } from 'react';
import range from 'lodash/range';

import Icon from '/icon';
import { useLimitExceeded } from '../limit';
import Styles from './pagedTable.css';

export default function PagingControls<T>({
  page,
  setPage,
  pageSize,
  data,
}: {
  page: number,
  setPage: number => void,
  pageSize: number,
  data: T[],
}): React$Node {
  const pageCount = getPageCount(data, pageSize);
  if (pageCount <= 1) return null;
  const click = event => {
    const page: ?string = event.target?.dataset?.page;
    if (page) setPage(Number.parseInt(page) || 0);
  };

  return (
    <div styleName="Paging BannerAddition" onClick={click}>
      <Showing page={page} pageSize={pageSize} data={data} />
      <PagingIcon which={page - 1}>chevron_left</PagingIcon>
      <PageList page={page} pageCount={pageCount} />
      <PagingIcon which={page + 1}>chevron_right</PagingIcon>
    </div>
  );
}

function Showing<T>({
  data,
  page,
  pageSize,
}: {
  data: T[],
  page: number,
  pageSize: number,
}) {
  const total = data.length;
  const start = page * pageSize;
  const end = Math.min(start + pageSize, total);
  const exceeded = useLimitExceeded();
  return (
    <label>
      {(start + 1).toLocaleString()} - {end.toLocaleString()} of{' '}
      {total.toLocaleString()}
      {exceeded && '+'}
    </label>
  );
}

function PageList({ pageCount, page }: { pageCount: number, page: number }) {
  let prev = -1;
  return list(pageCount, page).map(i => {
    const result = (
      <Fragment key={i}>
        {i - 1 !== prev && <small>&hellip;</small>}
        {typeof i === 'number' && <PageNumber which={i} current={page} />}
      </Fragment>
    );
    prev = i;
    return result;
  });
}

function PageNumber({ current, which }: { current: number, which: number }) {
  return (
    <span
      role="button"
      data-page={which}
      styleName={{ active: current === which }}
    >
      {which + 1}
    </span>
  );
}

function PagingIcon({ which, children }: { which: number, children: string }) {
  return (
    <Icon noClickStyling children={children} data-page={which} role="button" />
  );
}

function getPageCount(data: Array<any>, pageSize: number) {
  return Math.ceil(data.length / pageSize);
}

function list(total: number, current: number): Array<number> {
  if (total <= 7) return range(0, total);
  if (current < 5) return [...range(0, 5), total - 1];
  if (current > total - 5) return [0, ...range(total - 5, total)];
  return [0, ...range(current - 1, current + 2), total - 1];
}
