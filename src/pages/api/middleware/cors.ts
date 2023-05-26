import Cors from 'cors'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const corsMiddleware = (handler: NextApiHandler) => {
  const corsOptions = {
    origin: 'http://localhost:3000', // Substitua pelo domínio desejado
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type'], // Headers permitidos
  }

  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Executa o middleware CORS
    await new Promise((resolve, reject) => {
      Cors(corsOptions)(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }

        return resolve(result)
      })
    })

    // Chama o próximo handler
    return handler(req, res)
  }
}

export default corsMiddleware
