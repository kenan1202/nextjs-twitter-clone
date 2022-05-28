import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Modal from '../context/ModalContext'
import FetchData from '../context/FetchingContext'

export default function App({Component, pageProps: { session, ...pageProps }}) {
  return (
    <SessionProvider session={session}>
      <FetchData>
        <Modal>
          <Component {...pageProps}/>
        </Modal>
      </FetchData>
    </SessionProvider>
  )
}