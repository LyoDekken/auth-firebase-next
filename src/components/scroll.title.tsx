import { Box, Heading, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { FaHashtag } from 'react-icons/fa'

interface Info {
  name: string
  handleHeading: (headingRef: any) => void
  showHashtag: boolean
  setShowHashtag: React.Dispatch<React.SetStateAction<boolean>>
}

const ScroolTitle = ({
  name,
  handleHeading,
  showHashtag,
  setShowHashtag,
}: Info) => {
  const isMobile = useBreakpointValue({ base: true, md: false }) // Verifica se está no modo mobile ou tablet

  return (
    <Heading
      display={'flex'}
      alignItems={'center'}
      as="h1"
      size="xl"
      mt={6}
      mb={4}
      onClick={handleHeading}
      onMouseEnter={() => !isMobile && setShowHashtag(true)} // Verifica se não é mobile para exibir a hashtag
      onMouseLeave={() => !isMobile && setShowHashtag(false)} // Verifica se não é mobile para ocultar a hashtag
      style={{ cursor: 'pointer' }}
    >
      {!isMobile && ( // Verifica se não é mobile para renderizar a hashtag
        <span
          style={{
            visibility: showHashtag ? 'visible' : 'hidden',
            alignItems: 'center',
            position: 'absolute',
            left: '90px',
          }}
        >
          <FaHashtag color="teal.500" />
        </span>
      )}
      {name}
    </Heading>
  )
}

export default ScroolTitle
