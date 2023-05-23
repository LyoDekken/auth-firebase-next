// helpers.ts
import * as Yup from 'yup'

export const generateRoomId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let roomId = ''

  for (let i = 0; i < 9; i++) {
    if (i > 0 && i % 3 === 0) {
      roomId += '-'
    }
    roomId += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return roomId
}

export const generatePassword = () => {
  const length = 6
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }

  return password
}

export const validationSchema = Yup.object().shape({
  clientEmail: Yup.string()
    .email('Email inválido')
    .required('Campo obrigatório'),
  clinicEmail: Yup.string()
    .email('Email inválido')
    .required('Campo obrigatório'),
  eventDate: Yup.string().required('Campo obrigatório'),
  time: Yup.string().required('Campo obrigatório'),
})
