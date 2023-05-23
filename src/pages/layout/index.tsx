// components/Layout.js
import NavBar from '@/components/Header'

const Layout = ({ children, colorMode, toggleColorMode }: any) => {
  return (
    <>
      <NavBar colorMode={colorMode} toggleColorMode={toggleColorMode} />
      {children}
    </>
  )
}

export default Layout
