import React from 'react'
import { Box, ColorMode, Heading, Text } from '@chakra-ui/react'
import InfoTutorial from './InfoTutorial.component'
import { renderCategories } from '../buttons.collors'
import ReadingInfo from '../reading.information'
import { TutorialData } from '@/interface/tutorialData'
import ScroolTitle from '../scroll.title'

interface TutorialContentProps {
  tutorialData: TutorialData
  readmeContent: string | undefined
  colorMode: ColorMode
  showHashtag: boolean
  setShowHashtag: React.Dispatch<React.SetStateAction<boolean>>
  handleHeading: () => void
  headingRef: React.MutableRefObject<HTMLDivElement | null> // Adicione essa linha
}

const TutorialContent = ({
  readmeContent,
  tutorialData,
  colorMode,
  handleHeading,
  showHashtag,
  setShowHashtag,
  headingRef, // Adicione essa linha
}: TutorialContentProps) => {
  return (
    <Box
      py={12}
      maxW="1000px"
      px={{ base: '4', md: '36' }}
      width="100%"
      overflowX="auto"
    >
      <Heading as="h1" size="2xl" mb={8} ref={headingRef}>
        {tutorialData.title}
      </Heading>
      {renderCategories(tutorialData.categories)}
      <Text
        mt={3}
        fontSize="md"
        color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
      >
        {tutorialData.preview}
      </Text>
      <ReadingInfo colorMode={colorMode} tutorialData={tutorialData} />
      {tutorialData.infoTitle.map((title, index) => (
        <ScroolTitle
          key={index}
          handleHeading={handleHeading}
          name={title}
          setShowHashtag={setShowHashtag}
          showHashtag={showHashtag}
        />
      ))}
      <InfoTutorial value={readmeContent} />
    </Box>
  )
}

export default TutorialContent
