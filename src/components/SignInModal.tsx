import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '@/firebase/app'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

const LogIn: React.FC = () => {
  const router = useRouter()
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  const [signInWithEmailAndPassword, user, loading, fbError] =
    useSignInWithEmailAndPassword(auth)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(loginForm.email, loginForm.password)

      // Redirecionar para a rota desejada após o login
      router.push('/dashboard') // Substitua '/dashboard' pela rota desejada
    } catch (error) {
      // Tratar erros de autenticação
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" w="full">
        <Input
          required
          name="email"
          placeholder="email"
          type="email"
          onChange={handleChange}
          size="md"
        />
        <Input
          required
          name="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
          size="md"
          my={3}
        />

        {fbError && (
          <Text textAlign="center" color="red" fontSize="10pt">
            {fbError.message}
          </Text>
        )}

        <Button type="submit" isLoading={loading} my={3}>
          Log In
        </Button>
      </Flex>
    </form>
  )
}
export default LogIn
