import { Box, useClipboard, useColorMode, IconButton } from '@chakra-ui/react'
import { CopyIcon, CheckIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface StyledDivProps {
  children: string
}

const StyledDiv: React.FC<StyledDivProps> = ({ children }) => {
  const { hasCopied, onCopy } = useClipboard(children)
  const { colorMode } = useColorMode()
  const [copied, setCopied] = useState(false)
  const [isCopying, setIsCopying] = useState(false)

  useEffect(() => {
    if (hasCopied) {
      setCopied(true)
      setIsCopying(true)
      const timer = setTimeout(() => {
        setCopied(false)
        setIsCopying(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <Box>
      <Box position="absolute" top={4} right={2} zIndex={1}>
        <IconButton
          className="copy-icon"
          icon={copied ? <CheckIcon /> : <CopyIcon />}
          aria-label={copied ? 'Copiado' : 'Copiar'}
          variant="ghost"
          color="white"
          onClick={onCopy}
          _hover={{ bg: 'transparent' }}
          disabled={isCopying}
        />
      </Box>
      <SyntaxHighlighter
        showLineNumbers
        language="javascript"
        style={colorMode === 'light' ? a11yDark : darcula}
        customStyle={{
          fontFamily: 'monospace',
          fontSize: '14px',
          borderRadius: 'md',
          overflowX: 'auto',
          padding: '1rem',
          background: colorMode === 'light' ? 'white' : '#011627',
          color: colorMode === 'light' ? '#011627' : 'white',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </Box>
  )
}

export default StyledDiv
