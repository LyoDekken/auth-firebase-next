import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { generatePassword, generateRoomId } from '@/helpers/helpers'
import { EnterRoomError } from '@/utils/Error'


type CreateRoomParams = {
  id?: string
  name?: string
  password?: string
  clientEmail: string
  clinicEmail: string
  eventDate: string
  time: string
}

interface EnterRoomParams {
  roomId: string
  password: string
}

const CreateRoom = async (
  room: CreateRoomParams,
  id: string,
  password: string
): Promise<void | string> => {
  try {
    const firestore = getFirestore()
    const roomRef = doc(firestore, 'rooms', id)

    // Verifica se a sala já existe no banco de dados com o ID fornecido
    const roomSnap = await getDoc(roomRef)

    if (roomSnap.exists()) {
      // Sala já existe
      // Gere uma nova hash e chame a função novamente
      const newId = generateRoomId()
      const newPassword = generatePassword()
      return CreateRoom(room, newId, newPassword)
    }

    const roomData = {
      ...room,
      id,
      password,
    }

    await setDoc(doc(firestore, 'rooms', roomData.id), roomData)
    return 'Room created successfully'
  } catch (error) {
    console.log(error)
  }
}

// Função para buscar os dados da sala no Firestore
const getRoomDataFromFirestore = async (id: string) => {
  try {
    const firestore = getFirestore()
    const roomRef = doc(firestore, 'rooms', id)
    const roomSnap = await getDoc(roomRef)

    if (roomSnap.exists()) {
      return roomSnap.data()
    } else {
      toast.error('Sala não encontrada.')
      throw new EnterRoomError('Dados da sala não encontrados.')
    }
  } catch (error) {
    toast.error('Erro ao buscar os dados da sala no Firestore.')
    throw new EnterRoomError('Erro ao buscar os dados da sala no Firestore.')
  }
}

const EnterRoom = async ({ roomId, password }: EnterRoomParams) => {
  try {
    // Obter os dados da sala do Firestore
    const roomData = await getRoomDataFromFirestore(roomId)

    if (password !== roomData.password) {
      toast.error('Senha incorreta. Tente novamente.')
      throw new EnterRoomError('Senha incorreta. Tente novamente.')
    }

    // Obter a data e hora atual
    const currentDate = new Date()
    const currentDateTime = currentDate.getTime()

    // Obter a data e hora da sala do Firestore
    const eventDate = roomData.eventDate // Formato: 'YYYY-MM-DD'
    const eventTime = roomData.time // Formato: 'HH:mm'

    // Converter a data e hora da sala para um objeto Date
    const [eventYear, eventMonth, eventDay] = eventDate.split('-')
    const [eventHour, eventMinute] = eventTime.split(':')
    const eventDateTime = new Date(
      eventYear,
      eventMonth - 1, // Os meses em JavaScript são baseados em zero (janeiro = 0)
      eventDay,
      eventHour,
      eventMinute
    ).getTime()

    // Validar se a data do evento é igual à data atual
    const isSameDay =
      currentDate.toDateString() === new Date(eventDateTime).toDateString()

    // Validar se a hora atual está dentro do intervalo permitido
    const allowedStartTime = eventDateTime - 5 * 60 * 1000 // 5 minutos antes do horário do evento
    const allowedEndTime = eventDateTime + 60 * 60 * 1000 // 1 hora após o horário do evento

    if (
      isSameDay &&
      currentDateTime >= allowedStartTime &&
      currentDateTime <= allowedEndTime
    ) {
      toast.success('Entrando.')
    } else {
      toast.error('Você não pode entrar')
      throw new EnterRoomError(
        'O horário limite de entrada nesta sala já passou.'
      )
    }
  } catch (error) {
    // Tratar erros
    if (error instanceof EnterRoomError) {
      throw error // Lança o erro personalizado para ser tratado posteriormente
    }
  }
}

// const EnterRoom = async ({ roomId, password }: EnterRoomParams) => {
//   try {
//     const roomData = await getRoomDataFromFirestore(roomId)

//     if (password !== roomData.password) {
//       toast.error('Senha incorreta. Tente novamente.')
//       throw new EnterRoomError('Senha incorreta. Tente novamente.')
//     }

//     const currentDate = moment().format('YYYY-MM-DD')
//     const currentTime = moment().format('HH:mm')
//     const entryDateTime = moment(
//       `${currentDate} ${roomData.time}`,
//       'YYYY-MM-DD HH:mm'
//     )
//     const entryTimeLimit = entryDateTime.subtract(5, 'minutes')
//     const entryTimeLimitLater = entryDateTime.add(1, 'hour')

//     if (moment(`${currentDate} ${currentTime}`).isBefore(entryTimeLimit)) {
//       toast.error('Ainda é muito cedo para entrar.')
//       throw new EnterRoomError('Ainda é muito cedo para entrar.')
//     }

//     if (moment(`${currentDate} ${currentTime}`).isAfter(entryTimeLimitLater)) {
//       toast.error('O horário limite de entrada nesta sala já passou.')
//       throw new EnterRoomError(
//         'O horário limite de entrada nesta sala já passou.'
//       )
//     }
//   } catch (error) {
//     if (error instanceof EnterRoomError) {
//       throw error // Lança o erro personalizado para ser tratado posteriormente
//     }
//   }
// }

const GetRoomDetails = async (id: string) => {
  try {
    // Obter os dados da sala do Firestore
    const roomData = await getRoomDataFromFirestore(id)

    // Obter a data e hora atual
    const currentDate = new Date()
    const currentDateTime = currentDate.getTime()

    // Obter a data e hora da sala do Firestore
    const eventDate = roomData.eventDate // Formato: 'YYYY-MM-DD'
    const eventTime = roomData.time // Formato: 'HH:mm'

    // Converter a data e hora da sala para um objeto Date
    const [eventYear, eventMonth, eventDay] = eventDate.split('-')
    const [eventHour, eventMinute] = eventTime.split(':')
    const eventDateTime = new Date(
      eventYear,
      eventMonth - 1, // Os meses em JavaScript são baseados em zero (janeiro = 0)
      eventDay,
      eventHour,
      eventMinute
    ).getTime()

    // Validar se a data do evento é igual à data atual
    const isSameDay =
      currentDate.toDateString() === new Date(eventDateTime).toDateString()

    // Validar se a hora atual está dentro do intervalo permitido
    const allowedStartTime = eventDateTime - 5 * 60 * 1000 // 5 minutos antes do horário do evento
    const allowedEndTime = eventDateTime + 60 * 60 * 1000 // 1 hora após o horário do evento

    if (
      isSameDay &&
      currentDateTime >= allowedStartTime &&
      currentDateTime <= allowedEndTime
    ) {
      console.log('Entrar')
    } else {
      toast.error('Você não pode entrar')
      throw new EnterRoomError(
        'O horário limite de entrada nesta sala já passou.'
      )
    }
  } catch (error) {
    // Tratar erros
    if (error instanceof EnterRoomError) {
      throw error // Lança o erro personalizado para ser tratado posteriormente
    }
  }
}

export { CreateRoom, EnterRoom, GetRoomDetails, getRoomDataFromFirestore }
