export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
  errors?: Partial<Record<'name' | 'email' | 'projectType' | 'message', string>>
  submittedAt?: string
}

export const initialContactFormState: ContactFormState = {
  status: 'idle',
  message: '',
}
