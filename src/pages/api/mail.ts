import { NextApiRequest, NextApiResponse } from 'next'
import mail from '@sendgrid/mail'
import corsMiddleware from './middleware/cors'

mail.setApiKey(process.env.API_KEY as string)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { to, html } = req.body

  const mailOptions = {
    to,
    from: process.env.MYEMAIL as string,
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

export default corsMiddleware(handler)
