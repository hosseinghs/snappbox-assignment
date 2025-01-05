
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import { ReactNode } from 'react';

const rtlCache = createCache({
  key: 'mui-rtl',
  stylisPlugins: [rtlPlugin],
});

const RTL = (props: {children: ReactNode}) => {
  return <CacheProvider value={rtlCache}>{props.children}</CacheProvider>;
};

export default RTL;
