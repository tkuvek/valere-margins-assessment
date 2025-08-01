'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './index';
import { InitializeStore } from './InitializeStore';

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <InitializeStore />
      {children}
    </Provider>
  );
} 