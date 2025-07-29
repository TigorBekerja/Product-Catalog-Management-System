import { SimpleMessagesProvider } from '@vinejs/vine'

export const validationMessages = new SimpleMessagesProvider({
  'required': '{{ field }} is required',
  'email': '{{ field }} must be an email',
  'minLength': '{{ field }} minimum length is {{ minLength }} character',
  'maxLength': '{{ field }} maximal length is {{ maxLength }} character'
})
