class HttpError extends Error {
  constructor(message: any, errorCode: any) {
    super(message);
    this.stack = errorCode;
    this.name = message;
  }
}

module.exports = HttpError;
