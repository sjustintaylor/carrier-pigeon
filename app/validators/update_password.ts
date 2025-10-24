import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'required': 'The {{ field }} field is required',
    'password.minLength': 'The password must be at least {{ min }} characters long',
  },
  { password: 'Password' }
)

export const updatePasswordValidator = vine.compile(
  vine.object({
    password: vine.string().trim().minLength(8),
  })
)
