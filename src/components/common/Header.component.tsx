'use-client'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Text,
  Stack,
  useDisclosure,
  Icon,
  Link,
} from '@chakra-ui/react'
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaGithub } from 'react-icons/fa'
import NextLink from 'next/link'

interface MenuItemProps {
  children: React.ReactNode
  to: string
  colorMode: 'light' | 'dark'
}

const MenuItem: React.FC<MenuItemProps> = ({ children, to, colorMode }) => (
  <NextLink href={to}>
    <Text
      as="span"
      whiteSpace="nowrap"
      fontSize={18}
      _hover={{
        color: 'orange',
      }}
      color={colorMode === 'light' ? 'blue.500' : 'white'}
    >
      {children}
    </Text>
  </NextLink>
)

interface MenuToggleProps {
  toggle: () => void
  color: 'light' | 'dark'
}

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, color }) => (
  <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
    <HamburgerIcon w={6} h={6} color={color === 'light' ? 'black' : 'white'} />
  </Box>
)

interface NavBarProps {
  colorMode: 'light' | 'dark'
  toggleColorMode: () => void
}

const Header: React.FC<NavBarProps> = ({ colorMode, toggleColorMode }) => {
  const { isOpen, onToggle } = useDisclosure()
  const [headerBoxShadow, setHeaderBoxShadow] = useState('none')

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    if (scrollPosition > 0) {
      setHeaderBoxShadow('md')
    } else {
      setHeaderBoxShadow('none')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py={5}
      paddingX={{ base: '4', md: '36' }}
      bg={
        colorMode === 'light'
          ? 'rgba(255, 255, 255, 0.7)'
          : 'rgba(55, 65, 81, 0.9)'
      }
      color="white"
      backdropFilter="saturate(180%) blur(20px)" // Adicionando o efeito de desfoque
      transition="background-color 0.3s ease"
      position="fixed" // Adicionando a propriedade CSS para fixar o cabeçalho
      top={0} // Definindo a posição 'top' para 0 para fixar o cabeçalho no topo
      zIndex={999} // Definindo uma ordem z-index alta para que o cabeçalho fique acima do conteúdo
      boxShadow={headerBoxShadow} // Adicionando uma sombra ao cabeçalho para destacá-lo do conteúdo
    >
      <Flex align="center">
        <Link href="/">
          <img
            src="/images/archery-artemis.png"
            alt="Arqueiro"
            style={{
              width: '40px',
              color: 'white',
            }}
          />
        </Link>

        {/* <Text
          as="span"
          whiteSpace="nowrap"
          fontFamily="'Ankh Sanctuary', cursive" // Aplicando a fonte "Ankh Sanctuary"
          ml={6}
          fontSize={18}
          color={colorMode === 'light' ? 'black' : 'white'}
        >
          ARTEMIS
        </Text> */}
      </Flex>
      <MenuToggle color={colorMode} toggle={onToggle} />
      <Box
        m={{ base: 6, md: 0 }}
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
          <MenuItem to="/" colorMode={colorMode}>
            <Text
              as="span"
              whiteSpace="nowrap"
              fontSize={18}
              _hover={{
                color: colorMode === 'light' ? '#6866E9' : '#FFD700',
              }}
              color={colorMode === 'light' ? 'black' : 'white'}
            >
              Blog
            </Text>
          </MenuItem>
          <Box display="flex" alignItems="center">
            <a
              href="https://github.com/artemis-io"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon
                as={FaGithub}
                cursor="pointer"
                color={colorMode === 'light' ? 'black' : 'white'}
                _hover={{
                  color: colorMode === 'light' ? '#6866E9' : '#FFD700',
                }}
                boxSize={6} // Aumenta o tamanho do ícone para 8x8 pixels
              />
            </a>
          </Box>
          <Box
            as="button"
            onClick={toggleColorMode}
            bg="transparent" // Define o fundo como transparente
            border="none"
            outline="none" // Remove o outline
            cursor="pointer"
            color={colorMode === 'light' ? 'black' : 'white'}
            _hover={{
              color: colorMode === 'light' ? '#6866E9' : '#FFD700',
            }}
          >
            {colorMode === 'light' ? (
              <MoonIcon boxSize={6} />
            ) : (
              <SunIcon boxSize={6} />
            )}
          </Box>
        </Stack>
      </Box>
    </Flex>
  )
}

export default Header
