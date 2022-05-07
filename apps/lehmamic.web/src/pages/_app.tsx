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


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Head>
                <title>Michael Lehmann</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta
                  name="description"
                  content="Software development experiences and ideas. I am a lead software architect, consultant and occasional speaker in Zurich and I hope to share my notes with other engineers"
                />
                <link rel="canonical" href="https://blog.lehmamic.ch/" />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <link rel="next" href="https://blog.lehmamic.ch/page/2/" />

                <meta property="og:site_name" content="Michael&#x27;s developer blog" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Michael&#x27;s developer blog" />
                <meta
                  property="og:description"
                  content="Software development experiences and ideas. I am a lead software architect, consultant and occasional speaker in Zurich and I hope to share my notes with other engineers"
                />
                <meta property="og:url" content="https://blog.lehmamic.ch/" />
                <meta
                  property="og:image"
                  content="https://blog.lehmamic.ch/content/images/2021/03/bruno-emmanuelle-yxttqGDs1AQ-unsplash-2.jpg"
                />
                <meta property="article:publisher" content="https://www.facebook.com/lehmamic" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Michael&#x27;s developer blog" />
                <meta
                  name="twitter:description"
                  content="Software development experiences and ideas. I am a lead software architect, consultant and occasional speaker in Zurich and I hope to share my notes with other engineers"
                />
                <meta name="twitter:url" content="https://blog.lehmamic.ch/" />
                <meta
                  name="twitter:image"
                  content="https://blog.lehmamic.ch/content/images/2021/03/bruno-emmanuelle-yxttqGDs1AQ-unsplash-2.jpg"
                />
                <meta name="twitter:site" content="@lehmamic" />
              </Head>
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
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
