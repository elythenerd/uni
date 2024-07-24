import * as React from 'react';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Consuming the outer theme is only required with coexisting themes, like in this documentation.
// If your app/website doesn't deal with this, you can have just:
// const theme = createTheme({ direction: 'rtl' })
export const theme = () =>
  createTheme({
    direction: 'rtl',
    // palette: {
    //   mode: outerTheme.palette.mode,
    // },
  });

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
