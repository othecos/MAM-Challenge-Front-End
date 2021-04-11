import Layout from '../layout/Layout'
import '../styles/globals.scss'

export default function App({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}