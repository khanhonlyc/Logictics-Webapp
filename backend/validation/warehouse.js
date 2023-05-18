import Error from "../helper/error.js"

export const createWarehouseValidate = data => {
    const error = new Error()

    error.isRequired(data.name, 'name')
    .isRequired(data.phone, 'phone')
    .isRequired(data.street, 'street')
    .isRequired(data.ward, 'ward')
    .isRequired(data.district, 'district')
    .isRequired(data.province, 'province')
    .isRequired(data.storekeeper, 'storekeeper')
    .isRequiredObject(data.operating_costs,"operating_costs",["warehouse_rental_costs","cost_of_electricity","maintenance_costs","total_employee_salary",])
    
    return error.get()
}
