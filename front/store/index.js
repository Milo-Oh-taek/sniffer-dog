import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

import reducer from './modules';

const store = (context) => configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  });
  
  export const wrapper = createWrapper(store, {
      debug: process.env.NODE_ENV !== 'production',
  });