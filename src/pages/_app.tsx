// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

// context
import { AuthProvider } from '@/src/@core/contexts/Auth/AuthContext';
import { ToastProvider } from '@/src/@core/contexts/Toast/ToastContext';

// internal components
import Layout from '@/src/components/Layout/Layout';
import ToastContainer from '../components/ToastContainer/ToastContainer';

// styles
import '@/src/styles/main.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <AuthProvider>
      <ToastProvider>
        {!isLoginPage ? (
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </ToastProvider>
    </AuthProvider>
  );
}