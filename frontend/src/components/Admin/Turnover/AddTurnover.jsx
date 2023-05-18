// import { Button, Form, Input, Select } from "antd";
// import axios from "axios";
// import { useContext, useState } from "react";
// import { MainContext } from "../../../context/MainContext";
// import { END_POINT } from "../../../utils/constant";

// // This constant may be updated late
// const paymentMethods = ["CASH", "MOMO_WALLET", "ZALO_PAY", "PAYPAL", "BANKING"];
// const typeOfTurnovers = [
//   "complete_order",
//   "fuel",
//   "repair",
//   "maintenance",
//   "incurred",
// ];
// const bills = [];
// const orders = [];

// const { Item } = Form;
// const { Option } = Select;

// function AddNewTurnover({ onClose, refetchData }) {
//   const { accessToken } = useContext(MainContext);
//   const [data, setData] = useState({
//     total: "",
//     payment_method: "",
//     paid: "",
//     type_of_turnover: "",
//     refund: "",
//     bill: "",
//     order: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [isDisable, setIsDisable] = useState(false);
//   //
//   const acceptAddNewTurnover = async () => {
//     setLoading(true);
//     // setIsDisable(true);
//     try {
//       await axios.post(`${END_POINT}/turnover`, data, {
//         headers: { authorization: `Bearer ${accessToken}` },
//       });
//       setLoading(false);
//       setIsDisable(false);
//       refetchData();
//       onClose();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
//         <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
//           <div className="flex justify-between items-center gap-y-3">
//             <span className="text-xl uppercase font-bold h-fit">
//               Thêm doanh thu
//             </span>
//             <Button
//               size="large"
//               disabled={isDisable}
//               className={
//                 !isDisable &&
//                 "hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
//               }
//               onClick={onClose}
//             >
//               x
//             </Button>
//           </div>
//           <Form
//             autoComplete="off"
//             onFinish={acceptAddNewTurnover}
//             labelCol={{
//               span: 6,
//             }}
//             wrapperCol={{
//               span: 14,
//             }}
//             layout="horizontal"
//           >
//             <Item
//               label="Tổng tiền"
//               name="total"
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng nhập tổng tiền",
//                 },
//               ]}
//             >
//               <Input
//                 type="number"
//                 value={data.total}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     total: e.target.value,
//                   })
//                 }
//               />
//             </Item>

//             <Item
//               label="Phương thức thanh toán"
//               name="payment_method"
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng chọn phương thức thanh toán",
//                 },
//               ]}
//             >
//               <Select
//                 allowClear
//                 showSearch
//                 onChange={(_, option) =>
//                   setData({ ...data, payment_method: option?.value })
//                 }
//                 className="capitalize"
//               >
//                 {paymentMethods.map((paymentMethod) => (
//                   <Option
//                     value={paymentMethod}
//                     key={paymentMethod}
//                     className="capitalize"
//                   >
//                     {paymentMethod.replaceAll("_", " ").toLowerCase()}
//                   </Option>
//                 ))}
//               </Select>
//             </Item>

//             <Item
//               label="Đã	trả"
//               name="paid"
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng nhập tiền đã trả",
//                 },
//               ]}
//             >
//               <Input
//                 type="number"
//                 value={data.paid}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     paid: e.target.value,
//                   })
//                 }
//               />
//             </Item>

//             <Item
//               label="Kiểu doanh thu"
//               name="type_of_turnover"
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng chọn kiểu doanh thu",
//                 },
//               ]}
//             >
//               <Select
//                 allowClear
//                 showSearch
//                 onChange={(_, option) =>
//                   setData({ ...data, type_of_turnover: option?.value })
//                 }
//                 className="capitalize"
//               >
//                 {typeOfTurnovers.map((typeOfTurnover) => (
//                   <Option
//                     value={typeOfTurnover}
//                     key={typeOfTurnover}
//                     className="capitalize"
//                   >
//                     {typeOfTurnover.replaceAll("_", " ").toLowerCase()}
//                   </Option>
//                 ))}
//               </Select>
//             </Item>

//             <Item
//               label="Trả lại"
//               name="refund"
//               rules={[
//                 {
//                   required: false,
//                 },
//               ]}
//             >
//               <Input
//                 type="number"
//                 value={data.refund}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     refund: e.target.value,
//                   })
//                 }
//               />
//             </Item>

//             <Item
//               label="Mã hóa đơn"
//               name="bill"
//               rules={[
//                 {
//                   required: false,
//                 },
//               ]}
//             >
//               <Select
//                 allowClear
//                 showSearch
//                 onChange={(_, option) =>
//                   setData({ ...data, bill: option?.value })
//                 }
//               >
//                 {bills.map((bill) => (
//                   <Option value={bill} key={bill}>
//                     {bill}
//                   </Option>
//                 ))}
//               </Select>
//             </Item>

//             <Item
//               label="Mã vận đơn"
//               name="order"
//               rules={[
//                 {
//                   required: false,
//                 },
//               ]}
//             >
//               <Select
//                 allowClear
//                 showSearch
//                 onChange={(_, option) =>
//                   setData({ ...data, order: option?.value })
//                 }
//               >
//                 {orders.map((order) => (
//                   <Option value={order} key={order}>
//                     {order}
//                   </Option>
//                 ))}
//               </Select>
//             </Item>

//             <Item
//               label="Thông điệp"
//               name="message"
//               rules={[
//                 {
//                   required: false,
//                 },
//               ]}
//             >
//               <Input
//                 type="text"
//                 value={data.message}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     message: e.target.value,
//                   })
//                 }
//               />
//             </Item>

//             <div className="flex justify-end mt-2 text-sm gap-x-6">
//               <Button
//                 size="large"
//                 disabled={isDisable}
//                 className={
//                   !isDisable &&
//                   "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
//                 }
//                 onClick={onClose}
//               >
//                 Hủy
//               </Button>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 size="large"
//                 loading={loading}
//                 className="rounded-lg"
//               >
//                 Xác nhận
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddNewTurnover;
