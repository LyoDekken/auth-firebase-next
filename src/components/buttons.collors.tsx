import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

export const renderCategories = (categories: string[]) => {
  const colors = [
    'blue.500',
    'purple.500',
    'pink.500',
    'yellow.500',
    'teal.500',
    'orange.500',
  ]

  return (
    <Flex mt={3}>
      {categories.map((category, index) => (
        <Box
          key={category}
          mr={2}
          color="white"
          bg={colors[index % colors.length]}
          px={2}
          py={1}
          fontSize="xs"
          borderRadius="md"
        >
          {category}
        </Box>
      ))}
    </Flex>
  )
}
