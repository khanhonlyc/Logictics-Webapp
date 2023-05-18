import express from "express"
import Customer from "../../model/Customer.js"
import { sendError, sendServerError, sendSuccess } from "../../helper/client.js"
import { CUSTOMER } from "../../constant.js"
import User from "../../model/User.js";
import bodyParser from "body-parser";
import Order from "../../model/Order.js"


const customerAdminRoute = express.Router();

/**
 * @route PUT /api/customer/:id
 * @description Update a customer
 * @access public
 */
customerAdminRoute.put('/:id', async (req, res) => {
    let id = req.params.id;
    const isExist = await Customer.exists({ _id: id })
    if (!isExist) { return sendError(res, 'Customer does not exist.') }
    const { name, address, description, customer_type, rank_passers, companyTaxcode_business, accepted_business } = req.body;
    // res.send(req.body)
    if (customer_type == '') { return sendError(res, 'Invalid customer type.') }
    else if (customer_type && !(customer_type == CUSTOMER.BUSINESS || customer_type == CUSTOMER.PASSERS || customer_type == CUSTOMER.INTERMEDIARY)) {
        return sendError(res, 'Invalid customer type.')
    }
    try {
        await Customer.findByIdAndUpdate(id, { name: name, address: address, description: description, customer_type: customer_type, rank_passers: rank_passers, companyTaxcode_business: companyTaxcode_business, accepted_business: accepted_business })
        return sendSuccess(res, 'Customer updated successfully.')
    }
    catch (err) {
        return sendServerError(res);
    }
})
/**
 * @route DELETE /api/customer/:id
 * @description delete a customer
 * @access public
 */
customerAdminRoute.delete('/:id', async (req, res) => {
    let id = req.params.id;
    const isExist = await Customer.exists({ _id: id })
    if (!isExist) { return sendError(res, 'Customer does not exist.') }

    try {
        await Customer.findByIdAndRemove(id)
        const userfind = await User.find({ role: id })
        await User.findByIdAndRemove(userfind[0]._id)
            .then(() => {
                return sendSuccess(res, "Delete customer user successfully.")
            })
    }
    catch (err) {
        sendServerError(res)
    }
})

/**
 * @route GET /api/customer/customerDebt
 * @description get customer debt
 * @access public
 */
customerAdminRoute.get('/:customerDebt', async (req, res) => {
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0
        const page = req.query.page ? parseInt(req.query.page) : 0
        const { name, sortBy } = req.query
        let listCustomer = [];
        let customerDebt = 0;
        let totalCusTomerDebt = 0;
        let orderDebt = {};

        let orders = await Order.find()
            .populate('customer')
            .skip(pageSize * page)
            .limit(pageSize)
            .sort(sortBy)

        orders.map((order) => {
            if (order.status === 'unpay') {
                customerDebt = order.total_price
                orderDebt = { ...order, customerDebt: customerDebt }
                listCustomer.push({ customerDebt: customerDebt, order: orderDebt._doc })
            }
        })

        if (name) {
            listCustomer = listCustomer.filter((order) => {
                const nameCustomer = order.order.customer.name
                return nameCustomer.toLowerCase().includes(name.toLowerCase())
            })
        }

        listCustomer.forEach((customer) => {
            totalCusTomerDebt += customer.customerDebt
        })

        if (listCustomer)
            return sendSuccess(
                res,
                'Get order information successfully.',
                { totalCusTomerDebt: totalCusTomerDebt, listCustomer })
        return sendError(res, 'Order information is not found.', {})
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route GET /api/customer
 * @description get customers , id
 * @access public
 */
customerAdminRoute.get("/", async (req, res) => {
  const id = req.query.id ? req.query.id : null;
  const keyword = req.query.keyword ? req.query.keyword : null;
  const sort = req.query.sort || 1;
  const filter = req.query.filter;
  let query = {};
  if (id) {
    query = { _id: id };
  } else if (keyword) {
    query = {
      $or: [
        {
          name: { $regex: keyword, $options: "$i" },
        },
        {
          address: { $regex: keyword, $options: "$i" },
        },
        {
          description: { $regex: keyword, $options: "$i" },
        },
        {
          customer_type: { $regex: keyword, $options: "$i" },
        },
        {
          companyTaxcode_business: { $regex: keyword, $options: "$i" },
        },
      ],
    };
  } else if (filter) {
    query = { customer_type: filter };
  }
  try {
    const result = await Customer.find(query).sort({ name: sort });
    if (result) return sendSuccess(res, "Get customers successfully.", result);
    return sendError(res, "No information found.");
  } catch (err) {
    sendServerError(res);
  }
});

export default customerAdminRoute;