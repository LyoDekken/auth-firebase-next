import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  generatePassword,
  generateRoomId,
  validationSchema,
} from '@/helpers/helpers'

import fetch from 'node-fetch'
import { CreateRoom } from '@/functions/functions'
import { emailTemplate } from '../templates/appointment'

type FormValues = {
  clientEmail: string
  clinicEmail: string
  eventDate: string
  time: string
}

const DashboardForm = () => {
  const handleCreateRoom = async (values: FormValues) => {
    const currentDate = new Date()
    const selectedDate = new Date(`${values.eventDate}T${values.time}`)

    console.log(values)

    if (selectedDate < currentDate) {
      toast.error(
        'A data e hora selecionadas são anteriores à data e hora atual'
      )
      return
    }

    const roomData = {
      name: `Consulta VAPTMED - ${currentDate.getDate}`,
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
        html: emailTemplate
          .replace('{{sala}}', clientMsg.sala)
          .replace('{{senha}}', clientMsg.senha)
          .replace('{{eventDate}}', clientMsg.eventDate)
          .replace('{{time}}', clientMsg.time)
          .replace('{{link}}', 'https://auth-firebase-next-l19s.vercel.app'),
      }

      const requestOptionsClient = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientMailOptions),
      }

      try {
        const response = await fetch(
          'http://localhost:3000/api/mail',
          requestOptionsClient
        )
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
        html: emailTemplate
          .replace('{{sala}}', clinicMsg.sala)
          .replace('{{senha}}', clinicMsg.senha)
          .replace('{{eventDate}}', clinicMsg.eventDate)
          .replace('{{time}}', clinicMsg.time)
          .replace('{{link}}', 'https://auth-firebase-next-l19s.vercel.app'),
      }

      const requestOptionsClinic = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clinicMailOptions),
      }

      try {
        const response = await fetch(
          'http://localhost:3000/api/mail',
          requestOptionsClinic
        )
        if (response.ok) {
          console.log('Email sent successfully')
        } else {
          console.error('Failed to send email')
        }
      } catch (error) {
        console.error('Error sending email:', error)
      }
    } catch (error) {
      console.error('Erro desconhecido:', error)
    }

    toast.success('Sala criada')
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
            <Field name="clientEmail">
              {({ field, form }: any) => (
                <FormControl
                  id="clientEmail"
                  marginBottom="1rem"
                  isInvalid={
                    form.errors.clientEmail && form.touched.clientEmail
                  }
                >
                  <FormLabel>Email do Cliente:</FormLabel>
                  <Input
                    {...field}
                    name="clientEmail"
                    type="email"
                    placeholder="Digite o e-mail do cliente"
                  />
                  <ErrorMessage
                    name="clientEmail"
                    component={FormErrorMessage}
                  />
                </FormControl>
              )}
            </Field>

            <Field name="clinicEmail">
              {({ field, form }: any) => (
                <FormControl
                  id="clinicEmail"
                  marginBottom="1rem"
                  isInvalid={
                    form.errors.clinicEmail && form.touched.clinicEmail
                  }
                >
                  <FormLabel>Email da Clínica:</FormLabel>
                  <Input
                    {...field}
                    type="email"
                    name="clinicEmail"
                    placeholder="Digite o e-mail da clínica"
                  />
                  <ErrorMessage
                    name="clinicEmail"
                    component={FormErrorMessage}
                  />
                </FormControl>
              )}
            </Field>

            <Field name="eventDate">
              {({ field, form }: any) => (
                <FormControl
                  id="eventDate"
                  marginBottom="1rem"
                  isInvalid={form.errors.eventDate && form.touched.eventDate}
                >
                  <FormLabel>Data do Evento:</FormLabel>
                  <Input
                    {...field}
                    type="date"
                    name="eventDate"
                    placeholder="Selecione a data do evento"
                  />
                  <ErrorMessage name="eventDate" component={FormErrorMessage} />
                </FormControl>
              )}
            </Field>

            <Field name="time">
              {({ field, form }: any) => (
                <FormControl
                  id="time"
                  marginBottom="1rem"
                  isInvalid={form.errors.time && form.touched.time}
                >
                  <FormLabel>Hora do Evento:</FormLabel>
                  <Input
                    {...field}
                    name="time"
                    type="time"
                    placeholder="Selecione a hora do evento"
                  />
                  <ErrorMessage name="time" component={FormErrorMessage} />
                </FormControl>
              )}
            </Field>

            <Button type="submit">Agendar</Button>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  )
}

export default DashboardForm
