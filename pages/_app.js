import '@/styles/globals.css'
import Footer from './components/footer.js'
export default function App({ Component, pageProps }) {
  return <>
  <Component {...pageProps} /><Footer/>
  </>
}
