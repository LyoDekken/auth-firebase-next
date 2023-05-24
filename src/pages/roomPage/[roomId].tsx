import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getRoomDataFromFirestore } from '@/functions/functions'

const RoomPage = () => {
  const router = useRouter()
  const { roomId } = router.query

  const data = roomId as string

  const handleBack = () => {
    router.push('/')
  }

  const [onCall, setOnCall] = useState(false)

  useEffect(() => {
    const checkRoomValidity = async () => {
      if (typeof roomId === 'string') {
        try {
          const roomDetails = await getRoomDataFromFirestore(roomId)

          // Restante da lógica de validação...

          const eventDate = roomDetails.eventDate // Formato: 'YYYY-MM-DD'
          const eventTime = roomDetails.time // Formato: 'HH:mm'

          // Converter a data e hora do evento para um objeto Date
          const [eventYear, eventMonth, eventDay] = eventDate.split('-')
          const [eventHour, eventMinute] = eventTime.split(':')
          const eventDateTime = new Date(
            eventYear,
            eventMonth - 1, // Os meses em JavaScript são baseados em zero (janeiro = 0)
            eventDay,
            eventHour,
            eventMinute
          ).getTime()

          // Obter a data e hora atual
          const currentDate = new Date()
          const currentDateTime = currentDate.getTime()

          // Validar se a data do evento é igual à data atual
          const isSameDay =
            currentDate.toDateString() ===
            new Date(eventDateTime).toDateString()

          // Validar se a hora atual está dentro do intervalo permitido
          const allowedStartTime = eventDateTime - 5 * 60 * 1000 // 5 minutos antes do horário do evento
          const allowedEndTime = eventDateTime + 60 * 60 * 1000 // 1 hora após o horário do evento

          if (
            isSameDay &&
            currentDateTime >= allowedStartTime &&
            currentDateTime <= allowedEndTime
          ) {
            // O usuário tem permissão para entrar na sala
            setOnCall(true)

            // Restante da lógica para configurar displayName e password...
          } else {
            // O usuário não tem permissão para entrar na sala
            setOnCall(false)

            // Restante da lógica para lidar com a negação de acesso...
          }
        } catch (error) {
          setOnCall(false)
          // Tratar erros ao obter os detalhes da sala
          console.log(error)
        }
      } else {
        throw new Error('roomId não é uma string')
      }
    }

    // Verifica se roomId é válido
    if (typeof roomId === 'string') {
      checkRoomValidity()
    } else {
      setOnCall(false)
    }
  }, [roomId])

  return (
    <>
      {onCall ? (
        <div>
          <iframe
            title="Video Conference"
            src={`https://meet.jit.si/${data}`}
            allow="camera; microphone; fullscreen"
            style={{ width: '100%', height: '100vh', border: 'none' }}
          ></iframe>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px', // Adicione um espaçamento superior
            }}
          >
            <button onClick={handleBack}>Voltar</button>
          </div>
        </>
      )}
    </>
  )
}

export default RoomPage
