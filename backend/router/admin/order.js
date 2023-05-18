import express from "express"
import {sendError,sendServerError,sendSuccess,} from "../../helper/client.js"
import {createOrderValidate,updateOrderStatusValidate} from "../../validation/order.js"
import { verifyAdmin, verifyToken } from "../../middleware/index.js"
import { calculateOrderFee, canChangeOrderStatus, genarateOrderID, generateRoute, handleOrderInfo, sendCancelOrder, sendCompletedOrder, sendInfoOrder, sendPaylOrder, sendUnpaylOrder } from "../../service/order.js"
import DeliveryService from "../../model/DeliveryService.js"
import Order from "../../model/Order.js"
import Customer from "../../model/Customer.js"
import Product from "../../model/Product.js"
import { locateAddress } from "../../service/location.js"
import Warehouse from "../../model/Warehouse.js"
import { ORDER_STATUS } from "../../constant.js"
import { isServedByService } from "../../service/deliveryService.js"

const orderAdminRoute = express.Router();

/**
 * @route GET /api/admin/order
 * @description get list of order
 * @access private
 */
orderAdminRoute.get('/', async (req, res) => {
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0
        const page = req.query.page ? parseInt(req.query.page) : 0
        const { sortBy, status } = req.query
        console.log(status)
        var filterCondition = status ? { status: status } : {}
        const orders = await Promise.all((await Order.find({ filterCondition })
            .skip(pageSize * page)
            .limit(pageSize)
            .sort(sortBy)
            .select('-__v')).map(async order => await handleOrderInfo(order)))
        const length = await Order.find({ filterCondition }).count()
        return sendSuccess(res, 'get order successfully', { length, orders })
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})


/**
 * @route GET /api/admin/order/total/:year/year
 * @description get a total price of year
 * @access private
 */
function handleSumTotalPrice(ordersOfProduct) {
    let totalPrice = 0;
    const priceInfo = []
        for (const product of ordersOfProduct) {
            if (!product.order) continue;
            totalPrice += product.quantity * product.order.total_price;
            priceInfo.push({name: product.name, quantity: product.quantity, price: product.order.total_price, totalPrice: product.quantity * product.order.total_price, createdAt: product.order.createdAt})
        }
    return {totalPrice, priceInfo};
}
orderAdminRoute.get('/total/:year/year', async (req, res) => {
    try {
        const  year = req.params.year * 1;
        const ordersOfProduct = await Product.find().populate({
            path: 'order',
            match: {
              createdAt: {
                $gte: new Date(`${year}-01-01`),
                $lt: new Date(`${year + 1}-01-01`)
              }
            }
          })
         const {totalPrice, priceInfo} = handleSumTotalPrice(ordersOfProduct)
        
        sendSuccess(res, 'total price in year', {
            totalPrice,
            priceInfo
        })
    } catch (error) {
        console.log(error)
        sendServerError(error);
    }
})
/**
 * @route GET /api/admin/order/total/:year/:month/month
 * @description get a total price of month in given year
 * @access private
 */
orderAdminRoute.get('/total/:year/:month/month', async (req, res) => {
    try {
        const year = req.params.year * 1;
        const month = req.params.month * 1;
        const ordersOfProduct = await Product.find().populate({
            path: 'order',
            match: {
                createdAt: {
                    $gte: new Date(`${year}-${month}-01`),
                    $lte: new Date(`${year}-${month}-31`)
                }
            }
          })
          const {totalPrice, priceInfo} = handleSumTotalPrice(ordersOfProduct);
        sendSuccess(res, 'total price in this month', {
            totalPrice,
            priceInfo
        })
    } catch (error) {
        console.log(error)
        sendServerError(error);
    }
})
/**
 * @route GET /api/admin/order/total/:year/quarter
 * @description get a total price of quarter in given year
 * @access private
 */
orderAdminRoute.get('/total/:year/:quarter/quarter', async (req, res) => {
    try {
        const year = req.params.year * 1;
        const quarter = req.params.quarter * 1;
        const ordersOfProduct = await Product.find().populate({
            path: 'order',
            match: {
                createdAt: {
                    $gte: new Date(`${year}-${(quarter - 1) * 3 + 1}-01`),
                    $lt: new Date(`${year}-${quarter * 3}-31`),
                }
            }
          })
        const {totalPrice, priceInfo} = handleSumTotalPrice(ordersOfProduct);
        sendSuccess(res, 'total price in this quarter', {
            totalPrice,
            priceInfo
        })
    } catch (error) {
        console.log(error)
        sendServerError(error);
    }
})
/**
 * @route GET /api/admin/order/total/:year/quarter
 * @description get a total price of week in given year
 * @access private
 */
orderAdminRoute.get('/total/:year/:week/week', async (req, res) => {
    try {
        const year = req.params.year * 1;
        const week = req.params.week * 1;
        const startDate = new Date(year, 0, 1); // Ngày đầu tiên của năm
        const endDate = new Date(year, 0, 1); // Ngày đầu tiên của năm
        endDate.setDate(startDate.getDate() + (week - 1) * 7 + 6); // Ngày cuối cùng của tuần
        const ordersOfProduct = await Product.find().populate({
            path: 'order',
            match: {
                createdAt: {
                    $gte: startDate,
                    $lt: endDate,
                }
            }
          })
          const {totalPrice, priceInfo} = handleSumTotalPrice(ordersOfProduct);
          sendSuccess(res, 'total price in this quarter', {
              totalPrice,
              priceInfo
          })
        sendSuccess(res, `total price of week ${week} in year ${year} `, totalPriceOrderInWeek ? totalPriceOrderInWeek : 'Does not have order in this week')
    } catch (error) {
        console.log(error)
        sendServerError(error);
    }
})

/**
 * @route GET /api/admin/order/:orderId
 * @description get an order by orderId
 * @access private
 */
orderAdminRoute.get('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params
        const order = await handleOrderInfo(await Order.findOne({ orderId: orderId }).select('-__v'))
        if (order)
            return sendSuccess(res, 'get order successfully', order)
        return sendError(res, `The order ${orderId} does not exist.`)
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route GET /api/admin/order/profit/:Id
 * @description get profit report of each order by Id
 * @access private
 */
orderAdminRoute.get('/profit/:Id', async (req, res) => {
    try {
        const { Id } = req.params
        if (!Id.match(/^[0-9a-fA-F]{24}$/)) return sendError(res, `The order ${Id} does not exist.`)
        const isExit = await Order.exists({ _id: Id })
        if (!isExit) return sendError(res, "Order does not exist.")

        const order = await Order.findById(Id)
        if(order.status === 'completed' || order.status === 'pay' || order.status === 'unpay'){
            const tolalPrice = order.total_price     
            const serviceId = order.service
            const services = await DeliveryService.findOne({ _id: serviceId })
            const profitService = services.profit

            const profit = Math.ceil(tolalPrice/((100+profitService)/100)*(profitService/100))

            return sendSuccess(res, 'Get profit of order successfully.', {Id, profit})
        } 
        return sendError(res, 'The order has not been completed.')
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route GET /api/admin/order/customer/:customerId
 * @description get order of customer by admin role
 * @access private
 */
orderAdminRoute.get('/customer/:customerId', async (req, res) => {
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0
        const page = req.query.page ? parseInt(req.query.page) : 0
        const { sortBy} = req.query
        const { customerId } =await req.params
        const orders = await Promise.all(( await Order.find({customer:customerId})
            .skip(pageSize * page)
            .limit(pageSize)
            .sort(sortBy)
            .select('-__v')).map(async order =>  await handleOrderInfo(order)))
        const length = await Order.find({customer:customerId}).count()
      return sendSuccess(res, 'get order successfully', { length, orders })
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route POST /api/order
 * @description admin create a new order
 * @access private
 */
orderAdminRoute.post('/:customerId',
    verifyToken,
    verifyAdmin,
    async (req, res) => {
        try {
            const errors = createOrderValidate(req.body)
            if (errors) return sendError(res, errors)

            const customerId = await Customer.exists({ _id: req.params.customerId })
            if (!customerId) return sendError(res, "Customer does not exist.")

            const { service, sender, receiver, products, origin, destination } = req.body

            // check whether service is available
            const serviceObj = await DeliveryService.findOne({ name: service })
            if (!serviceObj) return sendError(res, "Delivery service is not available.")

            let province = null
            // check whether address is real or not
            if (typeof origin.address === 'object') {
                let data = await locateAddress(origin.address.street + origin.address.ward + origin.address.district + origin.address.province)
                if (!data) return sendError(res, 'Origin is not existing.')
                province = origin.address.province
            }
            else {
                const originWh = await Warehouse.findById(origin.address).select({ _id: 1, province: 1 })
                origin.address = originWh._id
                province = originWh.province
                if (!origin.address) return sendError(res, "Origin warehouse doesn't exist.")
            }
            if (!(await isServedByService(serviceObj, province)))
                return sendError(res, "No available service serve this route.")

            if (typeof destination.address === 'object') {
                let data = await locateAddress(destination.address.street + destination.address.ward + destination.address.district + destination.address.province)
                if (!data) return sendError(res, 'Destination is not existing.')
                province = destination.address.province
            }
            else {
                const destinationWh = await Warehouse.findById(destination.address).select({ _id: 1, province: 1 })
                destination.address = destinationWh._id
                province = destinationWh.province
                if (!destination.address) return sendError(res, "Destination warehouse doesn't exist.")
            }
            if (!(await isServedByService(serviceObj, province)))
                return sendError(res, "No available service serve this route.")

            const orderId = await genarateOrderID()

            const order = await Order.create({ orderId, service: serviceObj._id, customer: customerId._id, sender, receiver, origin, destination })

            products.forEach(async product => {
                const { name, quantity, unit, note } = product
                await Product.create({ name, quantity, unit, note, order: order._id })
            })

            return sendSuccess(res, 'Create new order successfully', { orderId: order.orderId })
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
})

/**
 * @route PUT /api/admin/order/:orderId/status
 * @description update status order by orderId
 * @access private
 */
orderAdminRoute.put("/:orderId/status", async (req, res) => {
  const errors = updateOrderStatusValidate(req.body);
  if (errors) return sendError(res, errors);

  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findOne({ orderId });
    if (!order) return sendError(res, "Order does not exist.", 404);

    const canChange = await canChangeOrderStatus(order, status);
    if (canChange) {
      if (order.status === ORDER_STATUS.accepted) {
        const orderFee = await calculateOrderFee(order._id);
        const orderWithNewStatus = await Order.findOneAndUpdate(
          { orderId },
          { status: status, total_price: orderFee }
        );
        console.log(orderWithNewStatus);
        if (orderWithNewStatus) {
          if (status === ORDER_STATUS.accepted) {
            sendInfoOrder(order.orderId);
          }
          return sendSuccess(res, "Change status of the order successfully.", {
            ...(await handleOrderInfo(orderWithNewStatus)),
            status,
            total_price: orderFee,
          });
        }
      } else {
        const orderWithNewStatus = await Order.findOneAndUpdate(
          { orderId },
          { status: status }
        );
        if (orderWithNewStatus) {
          if (status === ORDER_STATUS.completed) {
            sendCompletedOrder(order.orderId);
          }
          if (status === ORDER_STATUS.pay) {
            sendPaylOrder(order.orderId);
          }
          if (status === ORDER_STATUS.unpay) {
            sendUnpaylOrder(order.orderId);
          }
          if (status === ORDER_STATUS.cancel) {
            sendCancelOrder(order.orderId);
          }
          return sendSuccess(res, "Change status of the order successfully.", {
            ...(await handleOrderInfo(orderWithNewStatus)),
            status,
          });
        }
      }
    }
    return sendError(res, "Can not change the status of this order.");
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
});

/**
 * @route PUT /api/admin/order/:orderId/route
 * @description update route of an order by orderId
 * @access private
 */
orderAdminRoute.put("/:orderId/route", async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await handleOrderInfo(await Order.findOne({ orderId }));
    if (!order) return sendError(res, "Order does not exist.", 404);

    const route = await generateRoute(
      { _id: order.service },
      order.origin,
      order.destination
    );
    // console.log(route)
    await Order.findOneAndUpdate({ orderId }, { route });
    const returnRoute = (await Order.findOne({ orderId }).populate("route"))
      .route;
    return sendSuccess(
      res,
      "Genarate transportation route successfully.",
      returnRoute
    );
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
});

/**
 * @route PUT /api/admin/order/list-order/:customerId
 * @description update route of an order by orderId
 * @access private
 */
orderAdminRoute.get("/list-order/:customerId", async (req, res) => {
  let customerId = req.params.customerId;

  try {
    const ordersOfCustomer = await Customer.findOne({
      _id: customerId,
    }).populate("orders");
    if (!ordersOfCustomer) {
      return sendError(res, "Customer does not exist.");
    }

    if (ordersOfCustomer.orders.length < 1) {
      return sendError(res, "Customer does not have any order.");
    }
    return sendSuccess(res, undefined, {
      ordersByCustomer: ordersOfCustomer.orders,
    });
  } catch (err) {
    console.log(err);
    sendServerError(res);
  }
});

/**
 * @route PUT /api/admin/order/history-order/:customerId
 * @description update route of an order by orderId
 * @access private
 */

  orderAdminRoute.get("/history-order/:customerId", async (req, res) => {
    let customerId = req.params.customerId;
  
    try {
      const ordersOfCustomer = await Customer.findOne({
        _id: customerId,
        }).populate({path: 'orders', select: 'orderId totalPrice status createdAt'});
  
        if (!ordersOfCustomer) {
        return sendError(res, "Customer does not exist.");
        }
        if (ordersOfCustomer?.orders?.length < 1) {
            return sendError(res, "Customer does not have any order.");
        }
            return sendSuccess(res, 'Success', {
                totalOrders: ordersOfCustomer?.orders?.length,
                historyOrders: ordersOfCustomer.orders,
        })}catch (err) {
                console.log(err);
                sendServerError(res);
            }
    });
  
export default orderAdminRoute

