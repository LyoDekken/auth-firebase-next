import React from 'react'
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Flex,
  useColorMode,
} from '@chakra-ui/react'
import { AiOutlineMail } from 'react-icons/ai'
import { RiUser3Line } from 'react-icons/ri'

const NewsletterPage = () => {
  const { colorMode } = useColorMode()

  const boxShadowColor =
    colorMode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.6)'
  const inputBgColor = colorMode === 'light' ? 'white' : 'gray.700'
  const inputBorderColor = colorMode === 'light' ? 'gray.300' : 'transparent' // Cor da borda no modo claro

  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Box
        maxW={{ base: '100%', md: '400px' }}
        mx={4}
        p={{ base: 4, md: 6 }}
        borderRadius="md"
        boxShadow={`0 0 10px ${boxShadowColor}`}
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
      >
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          Assine a nossa Newsletter
        </Heading>
        <form>
          <FormControl mb={4}>
            <Flex align="center">
              <FormLabel htmlFor="name" mr={2}>
                <RiUser3Line />
              </FormLabel>
              <Input
                type="text"
                id="name"
                variant="filled"
                placeholder="Seu nome"
                _placeholder={{ color: 'gray.500' }}
                bg={inputBgColor}
                borderColor={inputBorderColor} // Adiciona a cor da borda no modo claro
              />
            </Flex>
          </FormControl>
          <FormControl mb={4}>
            <Flex align="center">
              <FormLabel htmlFor="email" mr={2}>
                <AiOutlineMail />
              </FormLabel>
              <Input
                type="email"
                id="email"
                variant="filled"
                placeholder="Seu email"
                _placeholder={{ color: 'gray.500' }}
                bg={inputBgColor}
                borderColor={inputBorderColor} // Adiciona a cor da borda no modo claro
              />
            </Flex>
          </FormControl>
          <Button type="submit" colorScheme="teal" w="100%">
            Assinar
          </Button>
        </form>
        <Box textAlign="center" fontSize="sm" color="gray.500" mt={4}>
          Ao assinar nossa newsletter, você receberá as últimas atualizações e
          novidades diretamente em sua caixa de entrada.
        </Box>
      </Box>
    </Flex>
  )
}

export default NewsletterPage
