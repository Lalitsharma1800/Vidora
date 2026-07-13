class ApiResponse {
  constructor(statusCode, response, message = "Success") {
    this.statusCode = statusCode;
    this.response = response;
    this.message = message;
    this.success = statusCode < 400;
    console.log("Response send successfully" + String.fromCodePoint(0x1f60d));
  }
}
export { ApiResponse };
