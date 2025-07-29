import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {
    if (error.isJoi) {
      return ctx.response.status(422).send({
        message: 'Validation failed',
        errors: error.details.map((err: any) => ({
          field: err.context?.key,
          message: err.message,
        })),
      })
    }
    
    if (error.status === 401) {
      return ctx.response.status(401).send({
        message: 'Unauthorized',
        error: error.message || 'Invalid or missing token',
      })
    }

    if (error.status === 404) {
      return ctx.response.status(404).send({
        message: 'Not Found',
        error: error.message || 'Resource not found',
      })
    }

    return ctx.response.status(error.status || 500).send({
      message: 'Internal server error',
      error: error.message || 'unexpected error'
    })
  }
  

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
