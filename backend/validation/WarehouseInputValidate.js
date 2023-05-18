import Error from "../helper/error.js"

export const WarehouseInputValidate = data => {
    const error = new Error()
    error.isRequired(data.product_name, 'product_name')
    .isRequired(data.quantity, 'quantity')
    .isRequired(data.unit_price, 'ununit_priceit')
    .isRequired(data.supplier , 'supplier')
    return error.get()
}