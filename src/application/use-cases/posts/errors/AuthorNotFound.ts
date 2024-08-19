import { HttpStatusCode } from "@@types/enums/http-status-code"

export class AuthorNotFound extends Error {
  statusCode: HttpStatusCode
  
  constructor() {
    super('Author not found')
    this.statusCode = HttpStatusCode.BAD_REQUEST
  }
}