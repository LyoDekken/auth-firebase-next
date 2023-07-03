import React, { ReactNode } from 'react'
import Header from '@/components/common/Header.component'
import Footer from '@/components/common/Footer.component'

interface LayoutProps {
  children: ReactNode
  colorMode: 'light' | 'dark'
  toggleColorMode: () => void
}

const Layout: React.FC<LayoutProps> = ({
  children,
  colorMode,
  toggleColorMode,
}) => {
  return (
    <>
      <Header colorMode={colorMode} toggleColorMode={toggleColorMode} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
