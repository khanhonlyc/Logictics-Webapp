import CargoHandling from "../model/CargoHandling.js";
import Staff from "../model/Staff.js";
import express from "express";
import {sendError,sendServerError,sendSuccess,} from "../helper/client.js";
import {genaratCargoHandlingID} from "../service/CargoHandling.js"
import {CargoHandlingValidate} from "../validation/cargoHandling.js"
import {verifyStorekeeper,verifyToken} from "../middleware/index.js"
const CargoHandlingRoute = express.Router();

/**
 * @route POST /api/cargohandling
 * @description create a cargoHandling
 * @access private
 */
CargoHandlingRoute.post("/",verifyToken,verifyStorekeeper, async (req, res) => {
  const errors = CargoHandlingValidate(req.body)
    if (errors) return sendError(res, errors);
    let { product_name, quatity,  woker_name,notes } = req.body;
    try {
      const isExist = await Staff.exists({_id: woker_name });
      if (!isExist) {
        return sendError(res, "This woker_name is not existed.");
      }
      const cargohandlingId = await genaratCargoHandlingID()
      const cargohandling = await CargoHandling.create({cargohandlingId,
        product_name, quatity,  woker_name,notes
      });
      return sendSuccess(res, "Create new cargohandling successfully.", cargohandling);
    } catch (error) {
        console.log(error)
      return sendServerError(res);
    }
  });

  /**
 * @route PUT /api/cargohandling/:id
 * @description update cargoHandling
 * @access private
 */
  CargoHandlingRoute.put("/:id",verifyToken,verifyStorekeeper, async (req, res) => {
  const { id } = req.params;
  const { product_name, quatity,  woker_name, notes } = req.body;
  const errors = CargoHandlingValidate(req.body);
  if (errors) return sendError(res, errors);  
  if (!id.match(/^[0-9]{6}$/))
  return sendError(res, "CargoHandling does not exist.")
  try {
    const cargoHandling = await CargoHandling.find({cargoHandling:id});
    if (cargoHandling) {
      await CargoHandling.updateOne({product_name:product_name, quatity:quatity,  woker_name:woker_name,notes:notes});
      return sendSuccess(res, "Update cargoHandling successfully.", {
        product_name, quatity,  woker_name,notes
      });
    }
    return sendError(res, "CargoHandling does not exist.");
  } catch (error) {
    return sendServerError(res);
  }
});

/**
 * @route DELETE /api/cargohandling/:id
 * @description delete an existing cargoHandling
 * @access private
 */
CargoHandlingRoute.delete("/:id",verifyToken,verifyStorekeeper, async (req, res) => {
  const { id } = req.params;  
  if (!id.match(/^[0-9]{6}$/))
  return sendError(res, "CargoHandling does not exist.")
  try {
    const isExist = await CargoHandling.exists({ cargoHandling: id });
    if (!isExist) return sendError(res, "CargoHandling does not exist.");
    const cargoHandling = await CargoHandling.deleteOne({cargoHandling:id});
    return sendSuccess(res, "Delete cargoHandling successfully.", cargoHandling);
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
});

/**
 * @router GET /api/cargohandling
 * @description get list of cargohandlings
 * @access private
 */
CargoHandlingRoute.get('/', verifyToken, verifyStorekeeper, async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const {sortBy, keyword } = req.query;
    var listKeyword = keyword
      ? {
          $or: [
            { cargohandlingId: { $regex: keyword, $options: 'i'} },
            { product_name: { $regex: keyword, $options: 'i'} },
            { quatity: { $regex: keyword, $options: 'i'} },
  
        ],
        }
      : {};
    const list = await CargoHandling.find(listKeyword)
      .limit(pageSize)
      .skip(pageSize * page)
      .sort(`${sortBy}`);
    if (list)
    {
      return sendSuccess(res, "Get CargoHandling successfully.", 
        list,
      );}else
   { return sendError(res, "Information not found.");}
  } catch (error) {
      console.log(error)
      return sendServerError(res)
  }
})

/**
 * @router GET /api/cargohandling/:id
 * @description get list of cargohandlings
 * @access private
 */
CargoHandlingRoute.get('/:id', verifyToken, verifyStorekeeper, async (req, res) => {
  try {
    let {id} = req.params
      const cargoHandling = await CargoHandling.find({cargohandlingId:id})
      if (cargoHandling) {
          return sendSuccess(res, "Get cargoHandling successfully.", cargoHandling)
      }
      return sendError(res, "There was no information found.")
  } catch (error) {
      console.log(error)
      return sendServerError(res)
  }
})
  export default CargoHandlingRoute