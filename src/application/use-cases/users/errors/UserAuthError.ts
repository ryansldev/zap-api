import { HttpStatusCode } from "@@types/enums/http-status-code"

export class UserAuthError extends Error {
  statusCode: HttpStatusCode
  
  constructor() {
    super('Username or password wrong, try again.')
    this.statusCode = HttpStatusCode.UNAUTHORIZED
  }
}