import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import theme from '../styles/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { LocalizationProvider } from '@mui/x-date-pickers';

import './prism-vsc-dark-plus.css';
import { UserProvider } from '@auth0/nextjs-auth0';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: Infinity,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserProvider>
          <CacheProvider value={emotionCache}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                  <style global jsx>{`
                    html,
                    body,
                    body > div:first-child,
                    div#__next,
                    div#__next > div {
                      height: 100%;
                    }
                  `}</style>
                  <Component {...pageProps} />
                </ThemeProvider>
              </LocalizationProvider>
            </CacheProvider>
          </UserProvider>
        </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
