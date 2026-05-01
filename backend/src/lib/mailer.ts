import { Resend } from 'resend'

let client: Resend | null = null

export function getMailer(): Resend {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY)
  }
  return client
}

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const mailer = getMailer()
  await mailer.emails.send({
    from: 'GSM Tools <noreply@gsmtools.app>',
    to, subject, html,
  })
}
