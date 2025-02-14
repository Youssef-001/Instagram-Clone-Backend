class AppError extends Error {
  
    constructor(message, statusCode) {
      super(message); // Call the Error class constructor
      this.statusCode = statusCode;

      Object.setPrototypeOf(this, AppError.prototype);
    }
  }

  module.exports = AppError;
