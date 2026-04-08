'use client';

import type { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { LanguageProvider } from '@/languages/provider';

type ProvidersProps = Readonly<{
  children: ReactNode;
}>;

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <LanguageProvider>{children}</LanguageProvider>
      <ToastContainer
        autoClose={2400}
        closeButton={false}
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss={false}
        position="bottom-right"
        theme="light"
      />
    </>
  );
}
