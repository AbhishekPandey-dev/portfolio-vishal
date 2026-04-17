'use server'

import { ContactFormState } from './types'

const EMAIL_RE =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

function getValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = getValue(formData, 'name')
  const email = getValue(formData, 'email')
  const projectType = getValue(formData, 'projectType')
  const message = getValue(formData, 'message')
  const company = getValue(formData, 'company')

  if (company) {
    return {
      status: 'success',
      message: 'Message sent successfully.',
      submittedAt: new Date().toISOString(),
    }
  }

  const errors: ContactFormState['errors'] = {}

  if (name.length < 2) {
    errors.name = 'Please enter your name.'
  }

  if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!projectType) {
    errors.projectType = 'Please choose a project type.'
  }

  if (message.length < 20) {
    errors.message = 'Please share a few more details about your project.'
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields and try again.',
      errors,
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL ?? 'abhishekpandey.dev@outlook.com'
  const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

  if (!resendApiKey || resendApiKey === 're_your_api_key_here') {
    return {
      status: 'error',
      message: 'Email delivery is not configured yet. Please add a valid RESEND_API_KEY to your .env.local file.',
    }
  }

  const submittedAt = new Date().toISOString()
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeProjectType = escapeHtml(projectType)
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[for Vishal - Portfolio Inquiry] ${projectType} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111; line-height: 1.6;">
            <div style="border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; margin: 0;">New Inquiry</h1>
            </div>
            <p style="margin-bottom: 24px; font-size: 16px;">You received a new message through your portfolio contact form.</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; width: 120px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600;"><a href="mailto:${email}" style="color: #000; text-decoration: underline;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Service</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600;">${safeProjectType}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Date</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600;">${submittedAt}</td>
              </tr>
            </table>
            <div style="background: #f9f9f9; padding: 24px; border-radius: 12px; border-left: 4px solid #000;">
              <p style="margin-top: 0; font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em; color: #666;">Message</p>
              <p style="margin-bottom: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          </div>
        `,
      }),
      cache: 'no-store',
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Resend API Error:', data)
      throw new Error(data.message || 'Failed to send email')
    }

    return {
      status: 'success',
      message: 'Thanks for reaching out! Your message is on its way.',
      submittedAt,
    }
  } catch (error) {
    console.error('Contact Form Error:', error)
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'The message could not be sent right now. Please try Email or Whatsapp.',
    }
  }
}
