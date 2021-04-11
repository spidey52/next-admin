import '../styles/globals.css'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return <>

    <Head>
      <title>Node Admin</title>
    </Head>

    <Link href="/">
      <a className="home">Home</a>
    </Link>
    <Component {...pageProps} />
  </>
}

export default MyApp
