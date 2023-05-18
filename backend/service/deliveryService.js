import DeliveryService from "../model/DeliveryService.js";
import Distance from "../model/Distance.js";

/**
 * check if a service serve a province
 * @param {DeliveryService} service
 * @param {string} province
 * @returns {boolean}
 */
export const isServedByService = async (service, province, endprovince) => {
  try {
    const distanse = await Distance.exists({$and: [{ fromProvince: province }, { toProvince: endprovince }]})
    const isServed = await DeliveryService.exists({_id: service._id,distances: { $in: [distanse._id] }})
    return !!isServed;
  } catch (error) {
    console.log(error);
    return false;
  }
};
