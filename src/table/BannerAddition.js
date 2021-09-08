// @flow

import { createContext, useContext, useState, Fragment } from 'react';

export const emptyBanners: TBanners = [];
type TBanners = $ReadOnlyArray<React$Node>;

export const BannerContext: React$Context<TBanners> =
  createContext(emptyBanners);

export default function BannerAddition({
  addition,
  children,
}: {
  addition: ?React$Node,
  children: React$Node,
}): React$Node {
  const banners = useContext(BannerContext);
  const [key] = useState(Math.random());
  let value = banners;
  if (addition) {
    value = value.concat(<Fragment key={key}>{addition}</Fragment>);
  }
  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
}
