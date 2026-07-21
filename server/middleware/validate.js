export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    const errors = result.error.issues.map(e => ({ field: e.path[0], message: e.message }))
    return res.status(400).json({
      error: true,
      message: errors.map(e => e.message).join(', '),
      errors
    })
  }
  req.body = result.data
  next()
}
