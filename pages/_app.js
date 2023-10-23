/**
 * Basic CSS
 */
import '@/styles/globals.css'


/**
 * Google Font
 */
import { Roboto } from 'next/font/google'
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})


export default function App({ Component, pageProps }) {
  return (
    <div className={`${roboto.className} px-4`}>
      <Component {...pageProps} />
    </div>
  )
}
