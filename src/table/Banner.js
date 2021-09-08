// @flow
/* eslint-env browser */

import { useContext, useLayoutEffect, useState } from 'react';
import Sticker, { invalidateStickers } from '/sticker';
import { BannerContext, emptyBanners } from './BannerAddition';
import Styles from './tableStyles.css';

export default function Banner(): React$Node {
  const [node, setNode] = useState(null);
  useInvalidateOnResizeEffect(node);
  const banners = useContext(BannerContext);
  if (banners.length === 0) return null;
  return (
    <BannerContext.Provider value={emptyBanners}>
      <Sticker>
        <div styleName="Banner" className="axisheader--sticky" ref={setNode}>
          <div styleName="Banner__container">{banners}</div>
        </div>
      </Sticker>
    </BannerContext.Provider>
  );
}

function useInvalidateOnResizeEffect(node) {
  useLayoutEffect(() => {
    if (!node) return;
    let prev = node.clientHeight;
    function check() {
      const current = node.clientHeight;
      if (prev !== current) invalidateStickers();
      prev = current;
    }

    const observer = new ResizeObserver(check);
    observer.observe(node);
    return function cleanup() {
      observer.unobserve(node);
    };
  }, [node]);
}
