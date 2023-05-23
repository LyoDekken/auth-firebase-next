import React, { useRef, useState } from 'react'
import { Box, Flex, Text, Button, Stack, useDisclosure, Icon, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaSignOutAlt } from 'react-icons/fa'
import AuthButtons from './AuthButtons'
import NextLink from 'next/link'
import { auth } from '@/firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'

const MenuItem = ({ children, to, colorMode }: any) => (
  <NextLink href={to}>
    <Text
      as="span"
      whiteSpace="nowrap"
      _hover={{
        color: colorMode === 'light' ? 'orange' : 'orange',
      }}
    >
      {children}
    </Text>
  </NextLink>
)

const MenuToggle = ({ toggle, color }: any) => (
  <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
    <HamburgerIcon
      w={6}
      h={6}
      color={color === 'light' ? 'blue.500' : 'white'}
    />
  </Box>
)

const NavBar = ({ colorMode, toggleColorMode }: any) => {
  const [user] = useAuthState(auth)
  const { isOpen, onToggle } = useDisclosure()
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false)
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  const openLogoutModal = () => {
    setIsOpenLogoutModal(true)
  }

  const closeLogoutModal = () => {
    setIsOpenLogoutModal(false)
  }

  const handleLogout = () => {
    // Implemente a lógica de logout aqui
    // Por exemplo, chame o método de logout do Firebase Auth
    auth.signOut()
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      borderBottom={'1px solid #458CEA'}
      p={4}
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      color="white"
    >
      <Flex align="center">
        <Text
          color={colorMode === 'light' ? 'blue.500' : 'white'}
          fontSize="xl"
          fontWeight="bold"
        >
          MEET-VAPTMED
        </Text>
      </Flex>
      <MenuToggle color={colorMode} toggle={onToggle} />
      <Box
        m={{ base: 6, md: 0 }} // Adiciona margem maior nas telas de celular
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Stack
          color={colorMode === 'light' ? 'blue.500' : 'white'}
          spacing={4}
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
        >
          <MenuItem to="/">Home</MenuItem>
          {/* Renderize o conteúdo adicional quando o usuário estiver autenticado */}
          {user && (
            <>
              {/* Conteúdo adicional para usuários autenticados */}
              <MenuItem to="/dashboard">Dashboard</MenuItem>
              <MenuItem to="/room">Salas</MenuItem>
              <Icon as={FaSignOutAlt} onClick={openLogoutModal} cursor="pointer" ml={2} />
              <AlertDialog
                isOpen={isOpenLogoutModal}
                leastDestructiveRef={cancelRef}
                onClose={closeLogoutModal}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Logout Confirmation
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure you want to log out?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={closeLogoutModal}>
                        Cancel
                      </Button>
                      <Button colorScheme="red" onClick={handleLogout} ml={3}>
                        Logout
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          )}
          <AuthButtons />
          <Button variant="link" onClick={toggleColorMode} colorScheme="blue">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Box>
    </Flex>
  )
}

export default NavBar
