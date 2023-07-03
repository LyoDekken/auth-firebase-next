/* eslint-disable react-hooks/rules-of-hooks */
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '@/firebase/app'
import { TutorialData } from '@/interface/tutorialData'

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}

export const handleHeadingClick = (headingRef: any) => {
  if (headingRef.current) {
    const offset = 160 // Ajuste o valor conforme necessário (em pixels)
    const top =
      headingRef.current.getBoundingClientRect().top +
      window.pageYOffset +
      offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export const fetchTutorialData = async (id: string) => {
  const tutorialRef = doc(firestore, 'tutorialsData', id)
  const tutorialSnapshot = await getDoc(tutorialRef)

  if (tutorialSnapshot.exists()) {
    return tutorialSnapshot.data() as TutorialData
  }
  
  return null
}

export const redirect = (link: string) => {
  window.open(link, '_blank')
}
