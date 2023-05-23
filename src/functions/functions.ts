import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { EnterRoomError } from '@/utils/Error'
import { generatePassword, generateRoomId } from '@/helpers/helpers'

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

const EnterRoom = async ({
  roomId,
  password,
}: EnterRoomParams): Promise<void> => {
  try {
    // Verifica se a sala existe no banco de dados com o ID fornecido
    const firestore = getFirestore()
    const roomRef = doc(firestore, 'rooms', roomId)
    const roomSnap = await getDoc(roomRef)

    if (!roomSnap.exists()) {
      // Sala não encontrada
      toast.error('Sala não encontrada.')
      throw new EnterRoomError('Sala não encontrada.')
    }

    const roomData = roomSnap.data()

    // Verifica se as senhas fornecidas são iguais
    if (roomData.password !== password) {
      // Senhas não correspondem
      toast.error('ID ou Senha incorreta.')
      throw new EnterRoomError('ID ou Senha incorreta.')
    }

    // Verifica se as informações fornecidas são válidas para entrada na sala
    const currentDate = new Date() // Obtém a data e hora atual

    const eventDate = new Date(roomData.eventDate)
    const eventTime = roomData.time.split(':')
    const selectedDate = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
      parseInt(eventTime[0]),
      parseInt(eventTime[1])
    )

    const entryTime = new Date(selectedDate.getTime() - 5 * 60000) // Subtrai 5 minutos do horário do evento
    const endTime = new Date(selectedDate.getTime() + 60 * 60000) // Adiciona 1 hora ao horário do evento

    if (currentDate < entryTime) {
      // Ainda não é permitido entrar na sala
      const timeDiff = entryTime.getTime() - currentDate.getTime()
      const minutesDiff = Math.ceil(timeDiff / 60000)

      toast.error(`Você só pode entrar na sala em ${minutesDiff} minutos.`)
      throw new EnterRoomError(
        `Você só pode entrar na sala em ${minutesDiff} minutos.`
      )
    }

    if (currentDate > endTime) {
      // Já passou mais de 1 hora do horário do evento
      toast.error('O horário permitido para entrar na sala já expirou.')
      throw new EnterRoomError(
        'O horário permitido para entrar na sala já expirou.'
      )
    }

    // Lógica para permitir a entrada do usuário na sala
    // ...

    toast.success('Entrou na sala com sucesso!')
  } catch (error) {
    if (error instanceof EnterRoomError) {
      throw error // Lança o erro personalizado para ser tratado posteriormente
    }
    toast.error('Erro ao entrar na sala.')
  }
}

export { CreateRoom, EnterRoom }
