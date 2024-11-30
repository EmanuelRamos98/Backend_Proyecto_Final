import AppError from "../Helpers/Error/app.error.js";

const errorHandleMiddleware = (err, req, res, next) => {
    err.status_code = err.status_code || 500
    err.status = err.status || 'error'

    if (err.validationErrors && err.validationErrors.length > 0) {
        return res.status(err.status_code).json({
            ok: false,
            status: err.status,
            message: err.message,
            errors: err.validationErrors 
        });
    }
    

    if (err.is_operational) {
        return res.status(err.status_code).json({
            ok: false,
            status: err.status,
            message: err.message
        })
    }

    console.error('ERROR: 😢😖', err)

    return res.status(500).json({
        status: 'error',
        message: 'Algo salio mal'
    })

}

export default errorHandleMiddleware