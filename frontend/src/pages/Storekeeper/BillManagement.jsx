

import logo from "../../assets/icons/logo-J&T.svg";
import { MdOutlineInventory2 } from "react-icons/md";
import { MenuOutlined } from '@ant-design/icons';
import { BiTransferAlt } from "react-icons/bi";
import { MenuFoldOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import { Input } from "antd";
import { EditOutlined } from '@ant-design/icons'
import React from 'react';
import {BookOutlined}  from '@ant-design/icons';


const columns = [
    {
        title: 'Mã đơn',
        dataIndex: 'code',
        key: 'code',
        showOnResponse: true,
        showOnDesktop: true,


    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        showOnResponse: true,
        showOnDesktop: true,


    },
    {
        title: 'Giá tiền',
        dataIndex: 'cost',
        key: 'cost',
        sorter: (a, b) => a.cost - b.cost,
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
        title: 'Thời gian nhập kho',
        key: 'time_in',
        dataIndex: 'time_in',
        sorter: true,
        showOnResponse: true,
        showOnDesktop: true,
       

    },

    {
        title: 'Thời gian xuất kho',
        key: 'time_out',
        dataIndex: 'time_out',
        sorter: true,
        showOnResponse: true,
        showOnDesktop: true,
        

    },
    {
        title: '',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a className="text-blue-600">Chi tiết</a>
            </Space>
        ),
        showOnResponse: true,
        showOnDesktop: true,
       
    },
];
const data = [
    {
      key: 1,
      code: "ABXJ4",
      name: "Quạt",
      cost: 200,
      quantity: 100,
      time_in: "13/08/2022",
      time_out: "13/10/2022"
    },
    {
      key: 2,
      code: "ABXJ5",
      name: "PC",
      cost: 921,
      quantity: 200,
      time_in: "14/08/2022",
      time_out: "15/11/2022"
    },
  ];




function BillManagement() {


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
                        <MdOutlineInventory2 style={{ fontSize: "20px" }}  />
                        <div className='ml-2 lg:p-[12px] p-[9px] lg:uppercase lg:h-full h-fit' >Hàng tồn kho</div>

                    </div>
                    <div className='flex justify-center  items-center'>
                        <BiTransferAlt style={{ fontSize: "20px" }}  />
                        <div className='ml-2 lg:p-[12px] p-[9px]  lg:uppercase lg:h-full h-fit'>Xuất nhập kho</div>

                    </div>
                    <div className='flex justify-center bg-sky-200 items-center border-r-4 border-blue-400'>
                        <BookOutlined style={{ fontSize: "20px", color : "blue" }}/>
                        <div className='ml-2 lg:p-[12px] p-[9px]  lg:uppercase lg:h-full h-fit'>Đơn xuất nhập</div>

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
                            <Table columns={columns} dataSource={data} scroll={{ x: "700" }}/>
                        </div>



                    </div>




                </div>


            </div>

        </div>

    )
}

export default BillManagement;
