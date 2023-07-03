import React, { useEffect, useState } from 'react'
import { useColorMode, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { firestore } from '@/firebase/app'
import { collection, getDocs } from 'firebase/firestore'
import InfoHome from '@/components/info.home'
import Loading from '@/components/loading'
import { formatDate } from '@/functions'
import { renderCategories } from '@/components/buttons.collors'
import { TutorialData } from '@/interface/tutorialData'

const Blog = () => {
  const { colorMode } = useColorMode()
  const [tutorialsData, setTutorialsData] = useState<TutorialData[]>([])
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    const fetchTutorialsData = async () => {
      const tutorialsRef = collection(firestore, 'tutorialsData')
      const tutorialsSnapshot = await getDocs(tutorialsRef)
      const tutorials = tutorialsSnapshot.docs.map(
        (doc) => doc.data() as TutorialData
      )
      setTutorialsData(tutorials)
      setLoading(false) // Set loading to false after data is fetched
    }

    fetchTutorialsData()
  }, [])


  return (
    <Flex align="center" justify="left" py={20}>
      <Box py={12} maxW="1000px" paddingX={{ base: '4', md: '36' }}>
        <InfoHome colorMode={colorMode} />
        <Flex direction="column" mb={8}>
          {loading ? (
            <Loading />
          ) : (
            tutorialsData.map((tutorial: TutorialData, index: number) => (
              <a key={index} href={`/doc/${tutorial.page}`}>
                <Box
                  key={tutorial.title}
                  background={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                  borderRadius="lg"
                  boxShadow="md"
                  _hover={{
                    bg:
                      colorMode === 'light'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(55, 65, 81, 0.9)',
                    backdropFilter: 'saturate(180%) blur(20px)',
                  }}
                  mb={4}
                  p={4}
                  maxW="800px"
                  style={{ cursor: 'pointer' }}
                >
                  <Text
                    fontSize="sm"
                    color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                    mb={2}
                  >
                    {formatDate(tutorial.date)}
                  </Text>
                  <Heading as="h3" size="md" mb={4}>
                    {tutorial.title}
                  </Heading>
                  {renderCategories(tutorial.categories)}
                  <Text
                    mt={3}
                    fontSize="md"
                    color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                  >
                    {tutorial.preview}
                  </Text>
                </Box>
              </a>
            ))
          )}
        </Flex>
      </Box>
    </Flex>
  )
}

export default Blog
