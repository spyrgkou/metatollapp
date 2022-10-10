class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

// class ExpressError extends Error {
//     constructor(message, statusCode) {
//         super(message);
//         // this.message = message;
//         this.statusCode = statusCode;
//     }
// }

module.exports = ExpressError;