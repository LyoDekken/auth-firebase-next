import React from 'react'
import { Flex, useColorMode, Center, Spinner } from '@chakra-ui/react'
import Layout from '@/pages/layout'

const Loading = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
      <Flex justify="center" align="center" h="100vh">
        <Center>
          <Spinner size="xl" />
        </Center>
      </Flex>
    </Layout>
  )
}

export default Loading
