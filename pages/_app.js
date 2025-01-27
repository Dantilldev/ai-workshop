import '@/styles/globals.css';
import {Theme} from '@radix-ui/themes';
import Layout from '@/src/components/Layout';

export default function App({Component, pageProps}) {
  return (
    <Theme>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Theme>
  );
}
