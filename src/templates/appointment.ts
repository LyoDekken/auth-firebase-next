export const emailTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Template de E-mail</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
        line-height: 1.6;
      }

      h1 {
        color: #333333;
        font-size: 24px;
        margin-bottom: 20px;
      }

      p {
        color: #666666;
        margin-bottom: 10px;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 4px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
      }

      .footer {
        margin-top: 30px;
        text-align: center;
        color: #999999;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
    <h1>Informações da Sala de Consulta</h1>
    <p><strong>Sala:</strong> {{sala}}</p>
    <p><strong>Senha:</strong> {{senha}}</p>
    <p><strong>Data do Evento:</strong> {{eventDate}}</p>
    <p><strong>Hora do Evento:</strong> {{time}}</p>
    
    <p><strong>Link:</strong> {{link}}</p>
    </div>
    <p class="footer">
      Este e-mail foi gerado automaticamente. Por favor, não responda a este
      e-mail.
    </p>
  </body>
</html>
`
