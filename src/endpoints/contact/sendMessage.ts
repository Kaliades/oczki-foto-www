import type { PayloadHandler } from 'payload'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LENGTH = 320
const MAX_MESSAGE_LENGTH = 5000

export const contactSendMessageHandler: PayloadHandler = async (req) => {
  try {
    let body: { email?: unknown; message?: unknown }
    try {
      if (typeof req.json !== 'function') {
        return Response.json({ ok: false, message: 'Nieprawidłowe żądanie.' }, { status: 400 })
      }
      body = await req.json()
    } catch {
      return Response.json({ ok: false, message: 'Nieprawidłowe dane JSON.' }, { status: 400 })
    }

    const { email, message } = body

    if (typeof email !== 'string' || email.length === 0) {
      return Response.json(
        { ok: false, message: 'Pole e-mail jest wymagane.' },
        { status: 400 },
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    if (!EMAIL_REGEX.test(normalizedEmail) || normalizedEmail.length > MAX_EMAIL_LENGTH) {
      return Response.json(
        { ok: false, message: 'Nieprawidłowy format adresu e-mail.' },
        { status: 400 },
      )
    }

    if (typeof message !== 'string' || message.trim().length === 0) {
      return Response.json(
        { ok: false, message: 'Pole wiadomości jest wymagane.' },
        { status: 400 },
      )
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json(
        { ok: false, message: `Wiadomość nie może przekraczać ${MAX_MESSAGE_LENGTH} znaków.` },
        { status: 400 },
      )
    }

    // Stub v1 — message is validated but not persisted
    return Response.json({ ok: true }, { status: 200 })
  } catch {
    return Response.json({ ok: false, message: 'Wewnętrzny błąd serwera.' }, { status: 500 })
  }
}
