import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/apollo';
import { RecoilRoot } from 'recoil';

import NProgress from 'nprogress';
import Router from 'next/router';

import Navigation from 'src/components/Navigation/Navigation';

import '../styles/index.scss';
import '../styles/nprogress.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

NProgress.configure({
  showSpinner: false
});

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Navigation />
        <main className="app-wrapper">
          <Component {...pageProps} />
        </main>
      </RecoilRoot>
    </ApolloProvider>
  )
}

export default MyApp
