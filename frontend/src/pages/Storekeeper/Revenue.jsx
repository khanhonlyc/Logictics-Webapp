

import logo from "../../assets/icons/logo-J&T.svg";
import { MdOutlineInventory2 } from "react-icons/md";
import { MenuOutlined } from '@ant-design/icons';
import { BiTransferAlt } from "react-icons/bi";
import { MenuFoldOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {  Table } from 'antd';
import 'antd/dist/antd.css';
import { Input } from "antd";

import React from 'react';
import { BookOutlined } from '@ant-design/icons';
import {DollarOutlined} from '@ant-design/icons';


const columns = [
    
    {
        title: 'Tên hàng',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        showOnResponse: true,
        showOnDesktop: true,


    },
    {
        title: 'Số lượng',
        key: 'quantity',
        dataIndex: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
        sortDirections: ["descend", "ascend"],
        showOnResponse: true,
        showOnDesktop: true,


    },
    {
        title: 'Tiền hàng',
        dataIndex: 'cost',
        key: 'cost',
        sorter: (a, b) => a.cost - b.cost,
        sortDirections: ["descend", "ascend"],
        showOnResponse: true,
        showOnDesktop: true,

    },
    {
        title: 'Tổng chiết khấu',
        key: 'totalDis',
        dataIndex: 'totalDis',
        sorter: (a, b) => a.totalDis - b.totalDis,
        sortDirections: ["descend", "ascend"],
        showOnResponse: true,
        showOnDesktop: true,
    },
    

    {
        title: 'Thuế',
        key: 'tax',
        dataIndex: 'tax',
        sorter: (a, b) => a.tax - b.tax,
        sortDirections: ["descend", "ascend"],
        showOnResponse: true,
        showOnDesktop: true,

    },

    {
        title: 'Phí giao hàng',
        key: 'shipFee',
        dataIndex: 'shipFee',
        sorter: (a, b) => a.shipFee - b.shipFee,
        sortDirections: ["descend", "ascend"],
        showOnResponse: true,
        showOnDesktop: true,


    },

    {
        title: 'Tiền hàng trả lại',
        key: 'returnMoney',
        dataIndex: 'returnMoney',
        sorter: (a, b) => a.returnMoney - b.returnMoney,
        sortDirections: ["descend", "ascend"],
        showOnResponse: true,
        showOnDesktop: true,


    },
    {
        title: 'Doanh thu',
        key: 'totalRevenue',
        dataIndex: 'totalRevenue',
        sorter: (a, b) => a.totalRevenue - b.totalRevenue,
        sortDirections: ["descend", "ascend"],
        showOnResponse: true,
        showOnDesktop: true,
    },
];

// Doanh thu = Tiền hàng  - Chiết khấu + Thuế + Phí giao hàng - Tiền hàng trả lại
const data = [
    {
        key: 1,
        name: "Quạt",
        quantity: 21,
        cost: 9790000,
        totalDis: 0,
        tax: 147000,
        shipFee: 0,
        returnMoney: -4455000,
        totalRevenue: 5482000
    },
    {
        key: 2,
        name: "Giày Vans old skool",
        quantity: 8,
        cost: 2865888,
        totalDis: 0,
        tax: 0,
        shipFee: 64000,
        returnMoney: 0,
        totalRevenue: 2929888
    },
];



function sumRevenue(data){
    let sum = 0;
    data.map((value) => { 
        sum += value.totalRevenue;
    });
     
    return sum;
}
 const sum = sumRevenue(data);








function Revenue() {


    function Openbar() {
        document.querySelector('.sidebar').classList.toggle('left-[-300px]')
        document.querySelector('.col2').classList.toggle('opacity-25')
        document.querySelector('.col2').classList.toggle('bg-gray-100')
        document.querySelector('.col2').classList.toggle('bg-slate-400')




    }

    return (
        <div className="App">

            <div className="lg:w-full flex justify-between items-center max-w-[100%]">

                <div className="lg:hidden p-2 z-50" onClick={Openbar}><MenuOutlined /></div>
                <div className='flex items-center lg:w-[18%]'>
                    <div className='p-[12px] lg:w-full w-[80%]'>
                        <img src={logo} alt="" className="w-full"></img>

                    </div>


                    <div className='hidden sm:block lg:ml-[20px]'>
                        <MenuFoldOutlined style={{ fontSize: '20px', color: "orange" }} />
                    </div>
                </div>


                <div className='w-[10%] p-2 '>
                    <img className="lg:w-[40%]  h-[80%] rounded-full " src="https://joeschmoe.io/api/v1/random" />
                </div>


            </div>





            <div className="w-full h-[572px] flex">





                <div className='col1 lg:border-0 border  lg:w-[15%] z-40 w-[50%] sidebar fixed bottom-0 lg:top-0 top-10 lg:relative  lg:left-0 left-[-300px] duration-1000
     bg-neutral-50 '>




                    <div className='flex justify-center items-center'>
                        <MdOutlineInventory2 style={{ fontSize: "20px" }} />
                        <div className='ml-2 lg:p-[12px] p-[9px] lg:uppercase lg:h-full h-fit' >Hàng tồn kho</div>

                    </div>
                    <div className='flex justify-center  items-center'>
                        <BiTransferAlt style={{ fontSize: "20px" }} />
                        <div className='ml-2 lg:p-[12px] p-[9px]  lg:uppercase lg:h-full h-fit'>Xuất nhập kho</div>

                    </div>
                    <div className='flex justify-center  items-center '>
                        <BookOutlined style={{ fontSize: "20px" }} />
                        <div className='ml-2 lg:p-[12px] p-[9px]  lg:uppercase lg:h-full h-fit'>Đơn xuất nhập</div>

                    </div>

                    <div className='flex justify-center  items-center border-r-4 border-blue-400 bg-sky-200'>
                        <DollarOutlined style={{ fontSize: "20px", color: "blue" }} />
                        <div className='ml-2 lg:p-[12px] p-[9px]  lg:uppercase lg:h-full h-fit'>Doanh thu kho</div>

                    </div>




                </div>

                <div className='col2  lg:w-[85%] w-full h-[585px] bg-gray-100  lg:opacity-100'>
                    <div className="w-full p-[12px]">
                        <div className='flex justify-center '>
                            <div className='lg:w-[40%] w-full'>
                                <Input.Search

                                    placeholder="Search"
                                />
                            </div>
                        </div>
                        <div className='mt-12 p-[12px] '>
                            <Table columns={columns} dataSource={data} scroll={{ x: "700" }} />
                        </div>
                        <div className="flex justify-end">

                        <p className="font-bold bg-yellow-400 p-[12px] rounded-lg">Tổng doanh thu: {sum} vnđ</p>
                        </div>



                    </div>




                </div>


            </div>

        </div>

    )
}

export default Revenue;
