import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { fetchTutorialData, handleHeadingClick } from '@/functions'
import { Flex, useColorMode } from '@chakra-ui/react'
import { TutorialData } from '@/interface/tutorialData'
import Loading from '@/components/loading'
import Layout from '../layout'
import TutorialContent from '@/components/common/TutorialContent.component'

const TutorialPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [tutorialData, setTutorialData] = useState<TutorialData | null>(null)
  const [readmeContent, setReadmeContent] = useState<string>()
  const [showHashtag, setShowHashtag] = useState(false)
  const headingRef = useRef<HTMLDivElement>(null) // Refere-se ao elemento que deve ficar no topo
  const router = useRouter()

  const fetchReadmeContent = async () => {
    try {
      const response = await fetch(
        `https://github.com/candraKriswinarto/react-markdown-blog/blob/main/src/markdown/article.md`
      )
      const readmeContent = await response.text()
      setReadmeContent(readmeContent)
    } catch (error) {
      console.error(error)
      setReadmeContent('')
    }
  }

  useEffect(() => {
    const { id } = router.query

    if (id) {
      const fetchData = async () => {
        const tutorialData = await fetchTutorialData(id as string)
        setTutorialData(tutorialData)
        fetchReadmeContent();
      }

      fetchData()
    }
  }, [router.query])

  const handleHeading = () => {
    handleHeadingClick(headingRef)
  }

  if (!tutorialData) {
    return <Loading />
  }

  return (
    <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
      <Flex align="center" py={20} justify={'left'}>
        <TutorialContent
          tutorialData={tutorialData}
          colorMode={colorMode}
          readmeContent={readmeContent}
          handleHeading={handleHeading}
          showHashtag={showHashtag}
          setShowHashtag={setShowHashtag}
          headingRef={headingRef} // Adicione essa linha
        />
      </Flex>
    </Layout>
  )
}

export default TutorialPage
