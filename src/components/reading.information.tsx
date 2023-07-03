import { formatDate, redirect } from '@/functions'
import { TutorialData } from '@/interface/tutorialData'
import { Box, ColorMode, Flex, Image, Text} from '@chakra-ui/react'
import React from 'react'

interface ReadInfo {
  colorMode: ColorMode,
  tutorialData: TutorialData
}

const ReadingInfo = ({
  colorMode,
  tutorialData
}: ReadInfo) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      mt={8}
    >
      <Flex alignItems="center">
        <Image
          style={{ cursor: 'pointer' }}
          src="https://avatars.githubusercontent.com/u/138058197?v=4"
          alt="GitHub"
          boxSize={8}
          mr={2}
          borderRadius="full"
          onClick={() => redirect('https://github.com/artemis-io')}
        />
        <Text
          as="span"
          fontSize="md"
          color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
        >
          Artemis / {formatDate(tutorialData.date)}
        </Text>
      </Flex>
      <Text
        as="span"
        fontSize="md"
        color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
      >
        • 3 min read
      </Text>
    </Box>
  )
}

export default ReadingInfo
