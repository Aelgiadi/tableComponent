// @flow

import { memo } from 'react';
import BannerAddition from '../BannerAddition';
import Limit from './Limit';
import { LimitExceededProvider } from './useLimitExceeded';

export { useLimitExceeded } from './useLimitExceeded';

type Props = {
  limit: number,
  setLimit: number => mixed,
  truncated: boolean,
  options?: Array<number>,
  children: React$Node,
};

const MemoLimit = memo(Limit);

export default function ({ children, ...limit }: Props): React$Node {
  return (
    <BannerAddition addition={limit && <MemoLimit {...limit} />}>
      <LimitExceededProvider exceeded={limit?.truncated}>
        {children}
      </LimitExceededProvider>
    </BannerAddition>
  );
}
