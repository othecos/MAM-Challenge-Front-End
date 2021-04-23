import Layout from '@layout/Layout'
import '@styles/globals.scss'
import '@styles/_core.scss'

export default function App({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}