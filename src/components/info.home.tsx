import { Box, ColorMode, Heading, Text } from '@chakra-ui/react'
import React from 'react'

interface color {
  colorMode: ColorMode
}

const InfoHome = ({ colorMode }: color) => {
  return (
    <Box>
      <Heading as="h1" size="lg" mb={4}>
        Bem-vindo
      </Heading>
      <Text
        fontSize="md"
        color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
        mb={8}
      >
        Este blog foi feito com o intuito de compartilhar conhecimento e ideias.
        Explore nossos artigos e fique por dentro de tutoriais em Node.js e suas
        tecnologias relacionadas, como Next.js, React e Nest.js, entre outras
        amplamente utilizadas pela comunidade.
      </Text>
      <Heading as="h2" size="md" mb={4}>
        Posts Recentes
      </Heading>
    </Box>
  )
}

export default InfoHome
