import 'react-toastify/dist/ReactToastify.css'

import DashboardForm from '@/components/DashboardForm'
import PrivateRoute from '@/routes/PrivateRoute'
import Layout from '@/pages/layout'
import { useColorMode } from '@chakra-ui/react'

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <PrivateRoute>
      <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
        <DashboardForm />
      </Layout>
    </PrivateRoute>
  )
}

export default Dashboard
