import { auth } from '@/firebase/app'
import { authModalState, AuthModalView } from '@/atom/authModalAtom'
import {
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import LogIn from '@/components/SignInModal'
import ResetPassword from './ResetPassword'

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useAtom(authModalState)
  const [user] = useAuthState(auth)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }

  useEffect(() => {
    if (user) {
      handleClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ModalHeader textAlign="center" color="ocean-dark">
            {modalState.view === AuthModalView.logIn && 'Log In'}
            {modalState.view === AuthModalView.resetPassword &&
              'Reset Password'}
          </ModalHeader>

          <ModalCloseButton fill="ocean-dark" />

          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              direction="column"
              textAlign="center"
              justify="center"
              width="80%"
              gap={6}
            >
              {modalState.view === AuthModalView.logIn && (
                <>
                  <LogIn />
                </>
              )}
              {modalState.view === AuthModalView.resetPassword && (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>

          <ModalFooter mx="auto" fontSize="10pt" pt={5}>
            <Flex justify="center" width="full">
              {modalState.view === AuthModalView.logIn && (
                <Text>Forgot password?</Text>
              )}
              <Link
                color="primary.100"
                _hover={{ color: 'primary.80' }}
                ml={1}
                onClick={() =>
                  setModalState((prev) => ({
                    ...prev,
                    view:
                      modalState.view !== AuthModalView.logIn
                        ? AuthModalView.logIn
                        : AuthModalView.resetPassword,
                  }))
                }
              >
                {modalState.view === AuthModalView.logIn
                  ? 'Reset password'
                  : '< Back to Log In'}
              </Link>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal
