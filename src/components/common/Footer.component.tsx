import React from 'react'
import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  useColorMode,
  Link,
} from '@chakra-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

const Footer: React.FC = () => {
  const { colorMode } = useColorMode()

  return (
    <Box
      as="footer"
      bg={colorMode === 'light' ? '#EDF2F7' : 'gray.700'}
      color="white"
    >
      <Flex
        align="center"
        justify="space-evenly"
        wrap="wrap"
        py={8}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Box textAlign="center" mb={{ base: 4, md: 0 }}>
          <Text as="span" whiteSpace="nowrap" fontSize={18} color="gray.500">
            © 2023 Artemis. All Rights Reserved.
          </Text>
        </Box>
        <Box textAlign="center">
          <Stack direction="row" spacing={4} justify="center">
            <a
              href="https://github.com/artemis-io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                as={FaGithub}
                boxSize={6}
                color="gray.500"
                _hover={{
                  color: '#6866E9',
                }}
              />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                as={FaTwitter}
                boxSize={6}
                color="gray.500"
                _hover={{
                  color: 'blue.400',
                }}
              />
            </a>
            <Link href="/newsletter" target="_parent" rel="noopener noreferrer">
              <Icon
                as={HiOutlineMail}
                boxSize={6}
                color="gray.500"
                _hover={{
                  color: 'red.400',
                }}
              />
            </Link>
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}

export default Footer
