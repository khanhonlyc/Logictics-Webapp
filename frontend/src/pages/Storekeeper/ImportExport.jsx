

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


const columns = [
    {
        title: 'Mã đơn',
        dataIndex: 'code',
        key: 'code',
        showOnResponse: true,
        showOnDesktop: true,


    },
    {
        title: 'Ngày cập nhật lần cuối',
        dataIndex: 'date',
        key: 'date',
        sorter: {
            compare: (a, b) => a.date - b.date,
            multiple: 3,
        },
        showOnResponse: true,
        showOnDesktop: true,


    },
    {
        title: 'Giờ cập nhật lần cuối',
        dataIndex: 'time',
        key: 'time',
        sorter: (a, b) => a.time.length - b.time.length,
        sortDirections: ["descend", "ascend"],
        showOnResponse: true,
        showOnDesktop: true,

    },
    {
        title: 'Trạng thái',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map(tag => {
                    let color = "lg:bg-green-200 lg:text-green-500 lg:font-bold lg:p-2  lg:rounded-lg";
                    if (tag === 'Đang giao hàng') {
                        color = 'lg:bg-yellow-200 lg:text-yellow-500 lg:font-bold lg:p-2 lg:rounded-lg';
                    }
                    return (
                        <span className={color}>
                            {tag}
                        </span>
                    );
                })}
            </>
        ),
        filters: [
            {
                text: 'Đang giao hàng',
                value: 'Đang giao hàng',
            },
            {
                text: 'Đã hoàn thành',
                value: 'Đã hoàn thành',
            },
        ],

        filterSearch: true,
        showOnResponse: true,
        showOnDesktop: true,
        // responsive: ["sm"]



    },
    {
        title: '',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a className="text-blue-600">Chi tiết</a>
                
                <span className='text-gray-600 flex items-center'> <EditOutlined />Sửa</span>
            </Space>
        ),
        showOnResponse: true,
        showOnDesktop: true,
        // responsive: ["sm"]
    },
];
const data = [
    {
        key: '1',
        code: 'MXJJA0',
        date: "14/02/22",
        time: '19:03',
        tags: ["Đang giao hàng"],
    },
    {
        key: '2',
        code: 'MXJJB3',
        date: "10/11/22",
        time: '17:03',
        tags: ["Đã hoàn thành"],
    },

];




function ImportExport() {


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

                



                <div className='col1  lg:w-[15%] z-40 w-[50%] sidebar fixed bottom-0 lg:top-0 top-10 lg:relative  lg:left-0 left-[-300px] duration-1000
     bg-neutral-50 '>




                    <div className='flex justify-center items-center'>
                        <MdOutlineInventory2 style={{ fontSize: "20px" }}  />
                        <div className='ml-2 lg:p-[12px] p-[9px] lg:uppercase lg:h-full h-fit' >Hàng tồn kho</div>

                    </div>
                    <div className='flex justify-center bg-sky-200 items-center border-r-4 border-blue-400'>
                        <BiTransferAlt style={{ fontSize: "20px" }} color="blue" />
                        <div className='ml-2 lg:p-[12px] p-[9px]  lg:uppercase lg:h-full h-fit'>Xuất nhập kho</div>

                    </div>




                </div>

                <div className='col2  lg:w-[85%] w-full h-[585px] bg-gray-100  lg:opacity-100 lg:border-0 border '>
                    <div className="w-full p-[12px] ">
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



                    </div>




                </div>


            </div>

        </div>

    )
}

export default ImportExport;
