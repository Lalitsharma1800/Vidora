class ApiResponse{
    constructor(
        statusCode,
        data,
        message = "Success"
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
        console.log("Response send successfully"+String.fromCodePoint(0x1F60D));
    }
}
export {ApiResponse};