import { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>新しいタブ</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/images/icons/light/apple-touch-icon.png'
          media='(prefers-color-scheme: light)'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/images/icons/light/favicon-32x32.png'
          media='(prefers-color-scheme: light)'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/images/icons/light/favicon-16x16.png'
          media='(prefers-color-scheme: light)'
        />
        <link
          rel='manifest'
          href='/images/icons/light/site.webmanifest'
          media='(prefers-color-scheme: light)'
        />
        <link
          rel='shortcut icon'
          href='/images/icons/light/favicon.ico'
          media='(prefers-color-scheme: light)'
        />
        <meta
          name='msapplication-TileColor'
          content='#da532c'
          media='(prefers-color-scheme: light)'
        />
        <meta
          name='msapplication-config'
          content='/images/icons/light/browserconfig.xml'
          media='(prefers-color-scheme: light)'
        />
        <meta
          name='theme-color'
          content='#ffffff'
          media='(prefers-color-scheme: light)'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/images/icons/dark/apple-touch-icon.png'
          media='(prefers-color-scheme: dark)'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/images/icons/dark/favicon-32x32.png'
          media='(prefers-color-scheme: dark)'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/images/icons/dark/favicon-16x16.png'
          media='(prefers-color-scheme: dark)'
        />
        <link
          rel='manifest'
          href='/images/icons/dark/site.webmanifest'
          media='(prefers-color-scheme: dark)'
        />
        <link
          rel='shortcut icon'
          href='/images/icons/dark/favicon.ico'
          media='(prefers-color-scheme: dark)'
        />
        <meta
          name='msapplication-TileColor'
          content='#da532c'
          media='(prefers-color-scheme: dark)'
        />
        <meta
          name='msapplication-config'
          content='/images/icons/dark/browserconfig.xml'
          media='(prefers-color-scheme: dark)'
        />
        <meta
          name='theme-color'
          content='#ffffff'
          media='(prefers-color-scheme: dark)'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;