import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'required': 'The {{ field }} field is required',
    'username.required': 'Please enter a valid username at least 8 characters long',
    'password.minLength': 'The password must be at least {{ min }} characters long',
    'password.regex':
      'The password must contain at least one lowercase letter, one uppercase letter, and one number',
  },
  { username: 'Username', password: 'Password' }
)

export const createUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(8)
      .unique({ column: 'username', table: 'users', caseInsensitive: true }),
    password: vine.string().trim().minLength(8),
  })
)
