import mongoose from "mongoose";
import { sendError, sendServerError, sendSuccess } from "../helper/client.js";

export const handleDeliveryReportInfo = async (list, res) => {
  try {
    let report = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i][1] && JSON.stringify(list[i][0].other_costs) !== "{}") {
        let sum =
          list[i][0].cost +
          list[i][0].actual_fuel +
          list[i][0].other_costs +
          list[i][1].price;
        report.push([
          `report by bill ${list[i][0]._id} and car ${list[i][0].car}`,
          `total cost: ${sum}`,
        ]);
      } else if (
        list[i][1] &&
        JSON.stringify(list[i][0].other_costs) === "{}"
      ) {
        let sum = list[i][0].cost + list[i][0].actual_fuel + list[i][1].price;
        report.push([
          `report by bill ${list[i][0]._id} and car ${list[i][0].car}`,
          `total cost: ${sum}`,
        ]);
      } else {
        let sum = list[i][0].cost + list[i][0].actual_fuel;
        report.push([
          `report by bill ${list[i][0]._id} and car ${list[i][0].car}`,
          `total cost: ${sum}`,
        ]);
      }
    }
    return report;
  } catch (error) {
    console.log(error);
  }
};
