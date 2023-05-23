import 'react-toastify/dist/ReactToastify.css'

import PrivateRoute from '@/routes/PrivateRoute'
import Layout from '@/pages/layout'
import { useColorMode } from '@chakra-ui/react'
import RoomList from '@/components/RoomList'

const Room = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <PrivateRoute>
      <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
        <RoomList />
      </Layout>
    </PrivateRoute>
  )
}

export default Room
