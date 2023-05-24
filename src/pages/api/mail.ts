/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import mail from '@sendgrid/mail'

mail.setApiKey(process.env.API_KEY as string)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { to, html } = req.body

  const mailOptions = {
    to,
    from: process.env.MYEMAIL as string, // Usar o remetente fornecido no corpo da solicitação
    subject: 'MEET-VAPTMED!',
    html,
  }

  try {
    await mail.send(mailOptions)
    res.status(200).json({ status: 'Ok' })
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' })
  }
}
