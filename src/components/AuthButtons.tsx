import React from 'react'
import { useSetAtom } from 'jotai'
import {
  authModalState as authModalAtom,
  AuthModalView,
} from '@/atom/authModalAtom'
import { Button, Flex } from '@chakra-ui/react'

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetAtom(authModalAtom)

  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      justify={{ base: 'center', sm: 'space-between' }}
      gap={5}
      w="full"
    >
      <>
        <Button
          variant="solid"
          onClick={() =>
            setAuthModalState({ open: true, view: AuthModalView.logIn })
          }
        >
          SignIn
        </Button>
      </>
    </Flex>
  )
}
export default AuthButtons
