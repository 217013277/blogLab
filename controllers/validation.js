const {Validator, ValidationError} = require('jsonschema')
const schema = require('../schemas/articles.schema.js')

const v = new Validator()

exports.validateArticle = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknowonAttributes: false
  }
  const body = ctx.request.body
  try {
    v.validate(body, schema, validationOptions)
    await next()
  } catch(error) {

    if(error instanceof ValidationError) {
      ctx.body = error
      ctx.status = 400
    } else {
      throw error
    }
  }
}