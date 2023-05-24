import type { AppProps } from 'next/app'
import AuthModal from '@/components/AuthModal'
import theme from '@/theme/theme'
import { ChakraBaseProvider } from '@chakra-ui/react'
import { Provider } from 'jotai'
import 'react-toastify/dist/ReactToastify.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <ChakraBaseProvider theme={theme}>
        <AuthModal />
        <Component {...pageProps} />
      </ChakraBaseProvider>
    </Provider>
  )
}

export default App
