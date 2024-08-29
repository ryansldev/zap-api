import { HttpStatusCode } from "@@types/enums/http-status-code"

export class UserNotAuthorized extends Error {
  statusCode: HttpStatusCode
  
  constructor() {
    super('User not authorized to do this action')
    this.statusCode = HttpStatusCode.FORBIDDEN
  }
}