import vine from '@vinejs/vine'
export const fileUploadValidator = vine.compile(
  vine.object({
    filename: vine.string().trim().minLength(2),
    contentType: vine.string().trim().minLength(2),
  })
)
