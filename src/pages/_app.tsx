import { AppProps } from 'next/app'
import { Header } from '../components/Header';
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps<{ session: Session}>) {
  return (
    <SessionProvider session={pageProps.session}>
    <Header/>
    <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
