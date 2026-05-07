import type { PayloadHandler } from 'payload'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LENGTH = 320

export const newsletterSubscribeHandler: PayloadHandler = async (req) => {
  try {
    let body: { email?: unknown }
    try {
      if (typeof req.json !== 'function') {
        return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
      }
      body = await req.json()
    } catch {
      return Response.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
    }

    const { email } = body

    if (typeof email !== 'string' || email.length === 0) {
      return Response.json({ ok: false, error: 'Pole email jest wymagane.' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    if (!EMAIL_REGEX.test(normalizedEmail) || normalizedEmail.length > MAX_EMAIL_LENGTH) {
      return Response.json(
        { ok: false, error: 'Nieprawidłowy format adresu e-mail.' },
        { status: 400 },
      )
    }

    try {
      await req.payload.create({
        collection: 'newsletter-subscribers',
        data: {
          email: normalizedEmail,
          source: 'footer',
        },
        // No user — public create; beforeChange hook handles confirmed/consent/IP/UA
        overrideAccess: false,
      })

      return Response.json({ ok: true }, { status: 201 })
    } catch (err: unknown) {
      // Check for unique constraint violation — email already exists
      const errMessage =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
            ? String((err as { message: unknown }).message)
            : String(err)

      const isUniqueViolation =
        errMessage.toLowerCase().includes('unique') ||
        errMessage.toLowerCase().includes('duplicate') ||
        errMessage.toLowerCase().includes('already exists') ||
        // Payload validation error on unique field
        (typeof err === 'object' &&
          err !== null &&
          'status' in err &&
          (err as { status: unknown }).status === 400)

      if (isUniqueViolation) {
        // Return 200 to avoid email enumeration — caller doesn't know if new or existing
        return Response.json({ ok: true, alreadySubscribed: true }, { status: 200 })
      }

      req.payload.logger.error({ err }, '[newsletter/subscribe] Unexpected error')
      return Response.json(
        { ok: false, error: 'Wewnętrzny błąd serwera. Spróbuj ponownie.' },
        { status: 500 },
      )
    }
  } catch (err) {
    return Response.json({ ok: false, error: 'Wewnętrzny błąd serwera.' }, { status: 500 })
  }
}
