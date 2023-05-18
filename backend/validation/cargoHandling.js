import Error from "../helper/error.js"

export const CargoHandlingValidate = data => {
    const error = new Error()

    error.isRequired(data.product_name, "product_name")
    .isRequired(data.quatity, "quatity")
    .isRequired(data.woker_name, 'woker_name')
    .isValidLength(data.woker_name, "woker_name", 24, 24)
    return error.get()
}