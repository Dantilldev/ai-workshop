import '@/styles/globals.css';
import { Theme } from '@radix-ui/themes';

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
}
