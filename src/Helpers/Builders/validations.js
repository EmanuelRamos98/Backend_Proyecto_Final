class Validations {

    constructor(valor) {
        this.valor = valor
        this.errores = []
    }

    isString(field_name) {
        const valor = this.valor[field_name]
        if (typeof valor !== 'string') {
            this.errores.push({
                field: field_name,
                message: `el valor de ${field_name} debe ser un string`
            })
        }
        return this
    }

    max_min_length(field_name, min_length, max_length) {
        const valor = this.valor[field_name]
        if (valor.length < min_length) {
            this.errores.push({
                field: field_name,
                message: `El valor de ${field_name} es demasiado corto. Mínimo permitido: ${min_length}`
            })
        }
        if (valor.length > max_length) {
            this.errores.push({
                field: field_name,
                message: `El valor de ${field_name} es demasiado largo. Máximo permitido: ${max_length}`
            })
        }
        return this
    }

    isEmail(field_name) {
        const valor = this.valor[field_name]
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(valor)) {
            this.errores.push({
                field: field_name,
                message: `El formato del correo electrónico no es válido.`
            })
        }
        return this;
    }

    obtenerErrores(){
        return this.errores
    }
}

export default Validations