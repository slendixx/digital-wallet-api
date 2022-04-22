class ValidationError {
  constructor(message) {
    this._message = message;
  }
  getMessage() {
    return this._message;
  }
}

export default ValidationError;
