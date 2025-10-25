import vine from '@vinejs/vine'
export const fileUploadValidator = vine.compile(
  vine.object({
    filename: vine.string().trim(),
    contentType: vine.string().trim(),
  })
)
