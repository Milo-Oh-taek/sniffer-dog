import Layout from '../components/layout/Layout';
import React from 'react';
import { wrapper } from '../store';
import 'bootstrap/dist/css/bootstrap.css';

import '../components/perfume/Paginator.css';

import '../styles/MainContainer.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(MyApp)
