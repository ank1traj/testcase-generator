import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
export default function App({ Component, pageProps }) {
  return <>
  <ClerkProvider
    appearance={{
        variables: {
          colorPrimary: "black",
          colorText: "black",
          colorBackground:"white"
        }
    }}
  >
    <Component {...pageProps} /><br/><br/>
  </ClerkProvider>
  </>
}