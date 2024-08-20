import { HttpStatusCode } from "@@types/enums/http-status-code"

export class PostNotFound extends Error {
  statusCode: HttpStatusCode
  
  constructor() {
    super('Post not found')
    this.statusCode = HttpStatusCode.NOT_FOUND
  }
}