import express, { query } from "express";
import Staff from "../model/Staff.js";
import { WarehouseInputValidate } from "../validation/WarehouseInputValidate.js";
import { sendError, sendServerError, sendSuccess } from "../helper/client.js"
import WarehouseInput from "../model/WarehouseInput.js";
import { verifyStorekeeper, verifyToken } from "../middleware/index.js";
const warehouseInputRoute = express.Router();

/**
 * @route get /api/warehouseinput
 * @description get all product in warehouse
 * @access private
 */
warehouseInputRoute.get('/',
  async (req, res) => {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
      const page = req.query.page ? parseInt(req.query.page) : 0;
      const { sortBy, keyword, product_name, supplier } = req.query;
      var keywordCondition = keyword ? {
        $or: [
          { product_name: { $regex: keyword, $options: 'i' } },
          { supplier: { $regex: keyword, $options: 'i' } },
        ]
      } : {};
      var query = {};
      if (supplier) {
        query.supplier = supplier;
      }
      if (keyword) {
        query.keyword = keyword;
      }
      if (product_name) {
        query.product_name = product_name;
      }
      const whouseInputs = await WarehouseInput.find({ $and: [query, keywordCondition] })
        .skip(pageSize * page).limit(pageSize).sort(`${sortBy}`);
      var length = await WarehouseInput.find({ $and: [query, keywordCondition] }).count();
      if (whouseInputs.length == 0)
        return sendError(res, "WarehouseInput information is not found.");
      return sendSuccess(res, 'get warehouseInput successfully', { length, whouseInputs })
    } catch (error) {
      console.log(error)
      return sendServerError(res)
    }
  }
)

/**
 * @route GET api/admin/product/:warehouseinputId
 * @description admin get product info
 * @access private
 */
warehouseInputRoute.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return sendError(res, "No information found.")
    const whouseinputbyid = await WarehouseInput.findById(id)
    if (whouseinputbyid) return sendSuccess(res, "Get warehouseInput successfully.", whouseinputbyid)
    return sendError(res, "No information found.")
  } catch (error) {
    console.log(error)
    return sendServerError(res)
  }
})

/**
 * @route POST /api/warehouseinput
 * @description create product of warehouse
 * @access private
 */
warehouseInputRoute.post('/',
  verifyToken,
  verifyStorekeeper,
  async (req, res) => {
    const errors = WarehouseInputValidate(req.body)
    if (errors)
      return sendError(res, errors)
    const { product_name, quantity, unit_price, supplier, note } = req.body
    var id = req.user.role._id
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return sendError(res, "warehouseInputId does not exist.")
    }
    try {
      const isExistStaff = await Staff.findById({ _id: id })
      if (isExistStaff) {
        const data = await WarehouseInput.create({ product_name, quantity, unit_price, supplier, import_by: id, note })
        return sendSuccess(res, 'Set warehouse information successfully.', data);
      }
      return sendError(res, 'create by Staff does not exist.');
    }
    catch (error) {
      console.log(error)
      return sendServerError(res)
    }
  })

/**
 * @route put  /api/warehouseInput/:warehouseInputId
 * @description update product of warehouse
 * @access private
 */
warehouseInputRoute.put('/:id', verifyToken, verifyStorekeeper, async (req, res) => {
  const { id } = req.params
  const idUser = req.user.role._id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return sendError(res, "warehouseInputId does not exist.")
  }
  const isExist = await WarehouseInput.exists({ _id: id })
  if (!isExist) return sendError(res, 'WarehouseInputId does not exist.')

  const { product_name, quantity, unit_price, supplier, note } = req.body;

  try {
    await WarehouseInput.findByIdAndUpdate(id, { product_name: product_name, quantity: quantity, unit_price: unit_price, supplier: supplier, import_by: idUser, note: note })
    return sendSuccess(res, 'WarehouseInput updated successfully.')
  }
  catch (err) {
    console.log(err)
    return sendServerError(res);
  }
})

/**
 * @route delete  /api/warehouseInput/:warehouseInputId
 * @description delete product of warehouse
 * @access private
 */
warehouseInputRoute.delete('/:id', verifyToken, verifyStorekeeper,
  async (req, res) => {
    const { id } = req.params
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return sendError(res, "warehouseInputId does not exist.")
    }
    try {
      const isExist = await WarehouseInput.exists({ _id: id })
      if (!isExist) return sendError(res, "WarehouseInput does not exist.")
      const data = await WarehouseInput.findByIdAndRemove(id)
      return sendSuccess(res, "Delete WarehouseInput successfully.", data)
    } catch (error) {
      console.log(error)
      return sendServerError(res)
    }
  }
)





export default warehouseInputRoute