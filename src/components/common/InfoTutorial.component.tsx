import React, { useEffect, useState } from 'react'
import { Box, Heading, useColorMode } from '@chakra-ui/react'
import Markdown from 'markdown-to-jsx'
import StyledDiv from '../styled.div' // Importar diretamente do arquivo "styled.div"
import { useBreakpointValue } from '@chakra-ui/react'
import Loading from '../loading'

interface renderReadme {
  value: any
}

const InfoTutorial = ({ value }: renderReadme) => {
  const { colorMode } = useColorMode()
  const [postContent, setPostContent] = useState<string>(value)

  if(!value) {
    <Loading/>
  }

  useEffect(() => {
    setPostContent(value)
  }, [value])

  const bgGradientStartColor =
    colorMode === 'light' ? 'purple.200' : 'purple.800'
  const bgGradientEndColor = colorMode === 'light' ? 'blue.300' : 'blue.900'
  const headingSize = useBreakpointValue({ base: 'md', md: 'lg' })

  return (
    <Box
      p={8}
      bgGradient={`linear(to-b, ${bgGradientStartColor}, ${bgGradientEndColor})`}
      borderRadius="md"
      mx="auto"
    >
      <Box as="article">
        <Box w="100%" className="post-wrapper">
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: (props) => (
                    <Heading
                      as="h1"
                      size={headingSize}
                      mt={4}
                      mb={4}
                      ml={8}
                      justifyContent={'left'}
                      textAlign="left"
                      alignSelf="flex-start"
                      {...props}
                    />
                  ),
                },
                div: {
                  component: (props) => (
                    <Box
                      as="div"
                      className="code"
                      position="relative"
                      mt={4}
                      borderRadius="md"
                      overflow="hidden"
                      maxW={{ base: '100%' }}
                      mx="auto"
                      {...props}
                    />
                  ),
                },
                Code: {
                  component: StyledDiv,
                },
              },
            }}
          >
            {postContent}
          </Markdown>
        </Box>
      </Box>
    </Box>
  )
}

export default InfoTutorial
