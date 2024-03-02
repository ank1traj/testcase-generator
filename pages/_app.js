import '@/styles/globals.css'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
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
    <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <Component {...pageProps} />
      </SignedIn>
  </ClerkProvider>
  </>
}