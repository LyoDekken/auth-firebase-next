'use-client'
import {
  Box,
  Flex,
  Input,
  Text,
  Image,
  Button,
  useColorMode,
} from '@chakra-ui/react'
import Layout from './layout'

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const inputStyles = {
    light: {
      color: '#333',
      placeholderColor: '#000',
      borderColor: '#333',
      focusBorderColor: '#1E67C8',
    },
    dark: {
      color: '#fafafa',
      placeholderColor: '#fafafa',
      borderColor: '#fafafa',
      focusBorderColor: '#1E67C8',
    },
  }

  return (
    <Layout
      colorMode={colorMode}
      toggleColorMode={toggleColorMode}
      minHeight="100vh"
    >
      <Flex alignItems={'center'} direction="column">
        <Flex
          direction="column"
          align="center"
          justify="center"
          flex="1"
          py={8}
        >
          <Box textAlign="center" my={8}>
            <Image
              width="220px"
              src="https://vaptmed.com.br/wp-content/uploads/2021/03/VaptMed-Final-4.png"
              alt="Logo VAPTMED"
              mx="auto" // Alinha a imagem ao centro horizontalmente
            />
            <Text fontSize="14pt" mt={8}>
              {'⏱️ Entre na sua Sala.'}
            </Text>
          </Box>

          <Box
            maxWidth="400px"
            width="100%"
            bg={colorMode === 'light' ? '#E6E6E6' : 'gray.700'}
            padding={4}
            borderRadius="md"
            boxShadow="md"
          >
            <Flex direction="column" mb={4} padding={5}>
              <Input
                border={`1px solid ${inputStyles[colorMode].borderColor}`}
                color={inputStyles[colorMode].color}
                placeholder="ID da sala"
                _placeholder={{
                  color: inputStyles[colorMode].placeholderColor,
                }}
                mb={2}
                _focus={{
                  borderColor: inputStyles[colorMode].focusBorderColor,
                }}
              />
              <Input
                border={`1px solid ${inputStyles[colorMode].borderColor}`}
                color={inputStyles[colorMode].color}
                placeholder="Senha"
                _placeholder={{
                  color: inputStyles[colorMode].placeholderColor,
                }}
                mb={2}
                _focus={{
                  borderColor: inputStyles[colorMode].focusBorderColor,
                }}
              />
            </Flex>
            <Button
              size="sm"
              rounded="md"
              color={colorMode === 'light' ? 'blue.500' : 'white'}
              bg={colorMode === 'light' ? 'white' : 'primary.500'}
              _hover={{
                color: colorMode === 'light' ? 'white' : 'white',
                bg: colorMode === 'light' ? 'blue.500' : 'blue.500',
              }}
            >
              Entrar
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Home
