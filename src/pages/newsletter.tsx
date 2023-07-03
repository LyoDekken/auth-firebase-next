import React from 'react'
import { useColorMode } from '@chakra-ui/react'
import Layout from './layout'
import NewsletterPage from './content/Newsletter'

const Newsletter = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
      <NewsletterPage />
    </Layout>
  )
}

export default Newsletter
