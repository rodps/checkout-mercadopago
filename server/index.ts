import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { MercadoPagoConfig, Payment } from 'mercadopago'

dotenv.config()

if (process.env.MERCADO_PAGO_ACCESS_TOKEN == null) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN is not defined')
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
})

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/process_payment', (req, res) => {
  const payment = new Payment(client)
  payment
    .create({
      body: req.body
    })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error))
})

app.get('/payments', (req, res) => {
  const payment = new Payment(client)
  payment.search()
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error))
})

app.listen(3000, () => {
  console.log('Server listening on port 3000!')
})
