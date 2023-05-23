import { Formik, Form, Field } from 'formik'
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  generatePassword,
  generateRoomId,
  validationSchema,
} from '@/helpers/helpers'
import { CreateRoom } from '@/functions/functions'
import fetch from 'node-fetch'

const DashboardForm = () => {
  const handleCreateRoom = async (values: any) => {
    const currentDate = new Date()
    const selectedDate = new Date(`${values.eventDate}T${values.time}`)

    if (selectedDate < currentDate) {
      toast.error(
        'A data e hora selecionadas são anteriores à data e hora atual'
      )
      return
    }

    const roomData = {
      name: `Consulta VAPTMED - ${currentDate}`,
      clientEmail: values.clientEmail,
      clinicEmail: values.clinicEmail,
      eventDate: values.eventDate,
      time: values.time,
    }

    try {
      let id = generateRoomId()
      let password = generatePassword()

      await CreateRoom(roomData, id, password)

      const clientMsg = {
        sala: id,
        senha: password,
        clientEmail: values.clientEmail,
        eventDate: values.eventDate,
        time: values.time,
      }

      const clinicMsg = {
        sala: id,
        senha: password,
        clinicEmail: values.clinicEmail,
        eventDate: values.eventDate,
        time: values.time,
      }

      const clientMailOptions = {
        to: values.clinicEmail,
        html: `<!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Template de E-mail</title>
          </head>
          <body>
            <h1>Informações da Sala de Consulta</h1>
            <p>Sala: ${clientMsg.sala}</p>
            <p>Senha: ${clientMsg.senha}</p>
            <p>Data do Evento: ${clientMsg.eventDate}</p>
            <p>Hora do Evento: ${clientMsg.time}</p>
          </body>
          </html>`,
      }

      const requestOptionsClient = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientMailOptions),
      }

      try {
        const response = await fetch('http://localhost:3000/api/mail', requestOptionsClient)
        if (response.ok) {
          console.log('Email sent successfully')
        } else {
          console.error('Failed to send email')
        }
      } catch (error) {
        console.error('Error sending email:', error)
      }

      const clinicMailOptions = {
        to: values.clientEmail,
        html: `<!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Template de E-mail</title>
          </head>
          <body>
            <h1>Informações da Sala de Consulta</h1>
            <p>Sala: ${clinicMsg.sala}</p>
            <p>Senha: ${clinicMsg.senha}</p>
            <p>Data do Evento: ${clinicMsg.eventDate}</p>
            <p>Hora do Evento: ${clinicMsg.time}</p>
          </body>
          </html>`,
      }

      const requestOptionsClinic = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clinicMailOptions),
      }

      try {
        const response = await fetch('/api/mail', requestOptionsClinic)
        if (response.ok) {
          console.log('Email sent successfully')
        } else {
          console.error('Failed to send email')
        }
      } catch (error) {
        console.error('Error sending email:', error)
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <Formik
          initialValues={{
            clientEmail: '',
            clinicEmail: '',
            eventDate: '',
            time: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateRoom}
        >
          <Form>
            <FormControl id="clientEmail" marginBottom="1rem">
              <FormLabel>Email do Cliente:</FormLabel>
              <Input
                type="email"
                name="clientEmail"
                placeholder="Digite o e-mail do cliente"
                as={Field}
              />
            </FormControl>

            <FormControl id="clinicEmail" marginBottom="1rem">
              <FormLabel>Email da Clínica:</FormLabel>
              <Input
                type="email"
                name="clinicEmail"
                placeholder="Digite o e-mail da clínica"
                as={Field}
              />
            </FormControl>

            <FormControl id="eventDate" marginBottom="1rem">
              <FormLabel>Data do Evento:</FormLabel>
              <Input
                type="date"
                name="eventDate"
                placeholder="Selecione a data do evento"
                as={Field}
              />
            </FormControl>

            <FormControl id="time" marginBottom="1rem">
              <FormLabel>Hora do Evento:</FormLabel>
              <Input
                type="time"
                name="time"
                placeholder="Selecione a hora do evento"
                as={Field}
              />
            </FormControl>

            <Button type="submit">Agendar</Button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default DashboardForm
