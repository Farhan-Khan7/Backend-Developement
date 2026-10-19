class ApiError extends Error {
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this , this.constructor)
    }


    static badRequest(message = "Bad Request"){
        return new ApiError(400 , message)
    }

    static conflict(message = "Conflict"){
        return new ApiError(409 , message)
    }

    static unauthorized(message = "Unauthorized"){
        return new ApiError(401 , message)
    }

    static forbidden(message = "forbidder"){
        return new ApiError(412 , message)
    }
}

export default ApiError 