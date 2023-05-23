import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/app'

import { Center, Spinner } from '@chakra-ui/react'

export const LoadingCircle = () => (
  <Center height="100vh">
    <Spinner size="xl" />
  </Center>
)

const PrivateRoute = ({ children }: any) => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  if (loading) {
    // Exibir um componente de carregamento centralizado
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <LoadingCircle />
      </div>
    )
  }

  if (!user) {
    // Redirecionar para a página de login ou exibir uma mensagem de erro, se necessário
    router.push('/')
    return null
  }

  // Renderizar o conteúdo da página protegida
  return children
}

export default PrivateRoute
