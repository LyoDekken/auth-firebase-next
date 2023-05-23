/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import mail from '@sendgrid/mail'

mail.setApiKey(
  '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'
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { to, html} = JSON.parse(req.body)

  const mailOptions = {
    to,
    from: 'humberto.araripe12@gmail.com', // Usar o remetente fornecido no corpo da solicitação
    subject: 'New Message!',
    html,
  }

  try {
    await mail.send(mailOptions)
    res.status(200).json({ status: 'Ok' })
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' })
  }
}
