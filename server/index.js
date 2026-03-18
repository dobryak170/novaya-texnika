import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

const MAIL_TO = process.env.MAIL_TO || 'dmvzlm12@mail.ru'
const SMTP_USER = process.env.SMTP_USER || 'ntechnics-robot@yandex.ru'
const SMTP_PASS = process.env.SMTP_PASS
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.yandex.ru'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10)
const FROM_EMAIL = process.env.FROM_EMAIL || 'ntechnics-robot@yandex.ru'
const FROM_NAME = process.env.FROM_NAME || 'Сайт Новая техника'

app.get('/', (req, res) => {
  res.json({ api: 'nttechnics', endpoints: ['GET /api/health', 'POST /api/contact'] })
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true, mailTo: MAIL_TO, smtpConfigured: !!(SMTP_USER && SMTP_PASS) })
})

app.post('/api/contact', async (req, res) => {
  const { name, phone, email } = req.body
  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Имя и телефон обязательны' })
  }

  if (!SMTP_USER || !SMTP_PASS) {
    console.error('SMTP не настроен: задайте SMTP_USER и SMTP_PASS в .env')
    return res.status(500).json({
      success: false,
      error: 'Сервер не настроен. Проверьте SMTP_USER и SMTP_PASS в .env'
    })
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  })

  const mailOptions = {
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: MAIL_TO,
    subject: 'Новая заявка с сайта',
    text: [
      `Имя: ${name}`,
      `Номер телефона: ${phone}`,
      `Почта: ${email || '—'}`
    ].join('\n'),
    html: [
      '<h2>Новая заявка</h2>',
      `<p><strong>Имя:</strong> ${name}</p>`,
      `<p><strong>Номер телефона:</strong> ${phone}</p>`,
      `<p><strong>Почта:</strong> ${email || '—'}</p>`,
      '<hr>',
      '<p><small>Письмо отправлено с сайта ntechnics.ru</small></p>'
    ].join('')
  }

  try {
    await transporter.sendMail(mailOptions)
    res.json({ success: true })
  } catch (err) {
    console.error('Ошибка отправки:', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Сервер: http://localhost:${PORT}`)
  console.log(`Получатель: ${MAIL_TO}`)
  console.log(`SMTP: ${SMTP_USER ? 'настроен' : 'не настроен (задайте SMTP_USER, SMTP_PASS)'}`)
  console.log('Поля письма: Имя, Номер телефона, Почта (без "Название компании")')
})
