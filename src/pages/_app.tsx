import { SessionProvider } from "next-auth/react"
import Layout from "../components/layout"
import "../styles/globals.css"
// These styles apply to every route in the application
import '@/styles/globals.css'
import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
} : AppProps) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}