import { Input, Table } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
// import EditTurnover from "../../components/Admin/Turnover/EditTurnover";
// import ConfirmModal from "../../components/ConfirmModal";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

export default function AdminTurnover() {
  // Column table
  const columns = [
    {
      title: "Tổng tiền",
      dataIndex: "total",
      sorter: (a, b) => {
        if (a.total < b.total) return -1;
        if (a.total > b.total) return 1;
      },
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment_method",
      sorter: (a, b) => {
        if (a.payment_method < b.payment_method) return -1;
        if (a.payment_method > b.payment_method) return 1;
      },
    },
    {
      title: "Đã trả",
      dataIndex: "paid",
      sorter: (a, b) => {
        if (a.paid < b.paid) return -1;
        if (a.paid > b.paid) return 1;
      },
    },
    {
      title: "Kiểu doanh thu",
      dataIndex: "type_of_turnover",
      sorter: (a, b) => {
        if (a.type_of_turnover < b.type_of_turnover) return -1;
        if (a.type_of_turnover > b.type_of_turnover) return 1;
      },
    },
    {
      title: "Trả lại",
      dataIndex: "refund",
      sorter: (a, b) => {
        if (a.refund < b.refund) return -1;
        if (a.refund > b.refund) return 1;
      },
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "bill",
      sorter: (a, b) => {
        if (a.bill < b.bill) return -1;
        if (a.bill > b.bill) return 1;
      },
    },
    {
      title: "Mã vận đơn",
      dataIndex: "order",
      sorter: (a, b) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
      },
    },
    {
      title: "Thông điệp",
      dataIndex: "message",
      sorter: (a, b) => {
        if (a.message < b.message) return -1;
        if (a.message > b.message) return 1;
      },
    },
    // {
    //   title: "",
    //   width: 160,
    //   dataIndex: "action",
    //   render: (a, record) => (
    //     <div className="flex gap-y-1 gap-x-3 justify-around">
    //       <button
    //         className="flex items-baseline gap-x-1 hover:text-blue-600"
    //         onClick={() => handleClickEdit(record)}
    //       >
    //         <AiFillEdit className="translate-y-[1px]" />
    //         Sửa
    //       </button>
    //       <button
    //         className="flex items-baseline gap-x-1 hover:text-red-600"
    //         onClick={() => {
    //           setIsDeleteVisible(true);
    //           setIdCompare(record._id);
    //         }}
    //       >
    //         <AiOutlineDelete className="translate-y-[1px]" />
    //         Xóa
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  // Redux
  const { accessToken } = useContext(MainContext);

  // Use state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [isDisable, setIsDisable] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
    total: data.length,
  });
  const [params, setParams] = useState({
    ...pagination,
    page: pagination.current - 1,
    keyword: null,
    sortBy: null,
  });
  // const [isEditVisible, setIsEditVisible] = useState(false);
  // const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  // const [idCompare, setIdCompare] = useState();
  // const [dataEdit, setDataEdit] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  // Get turnover list
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const res = await axios.get(`${END_POINT}/admin/turnover`, {
        headers: { authorization: `Bearer ${accessToken}` },
        params: params,
      });
      setData(res.data.data.turnover.reverse());
      setLoading(false);
      setPagination({
        total: res.data.data.length,
        pageSize: params?.pageSize,
        current: params?.page + 1,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Handle actions
  // const acceptDelete = async () => {
  //   setLoading(true);
  //   setIsDisable(true);
  //   try {
  //     await axios.delete(`${END_POINT}/turnover/${idCompare}`, {
  //       headers: { authorization: `Bearer ${accessToken}` },
  //     });
  //     setLoading(false);
  //     fetchData({ ...pagination, page: pagination.current - 1 });
  //     setIsDisable(false);
  //     setIsDeleteVisible(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleClickEdit = (record) => {
  //   setIsEditVisible(true);
  //   setDataEdit(record);
  // };

  const searchByKeyword = (value) => {
    setParams({
      ...params,
      page: 0,
      keyword: value,
    });
  };

  const handleTableChange = (newPagination, filters, sorter) => {
    const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
    fetchData({
      sortBy: sort,
      ...newPagination,
      page: newPagination.current - 1,
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <span className="text-3xl font-bold uppercase">doanh thu</span>
        <Input.Search
          className="w-1/3 lg:w-[400px]"
          placeholder="Nhập từ khóa"
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={searchByKeyword}
        />
        {/* <button
          className="px-5 py-2 border border-neutral-800 text-center hover:bg-slate-300"
          onClick={() => setIsAddVisible(true)}
        >
          + Thêm mới
        </button> */}
      </div>

      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={data.filter(
          (val) =>
            val?.total?.toString()?.includes(searchTerm) ||
            val?.payment_method?.toString()?.includes(searchTerm) ||
            val?.paid?.toString()?.includes(searchTerm) ||
            val?.type_of_turnover?.toString()?.includes(searchTerm) ||
            val?.refund?.toString()?.includes(searchTerm) ||
            val?.bill?.toString()?.includes(searchTerm) ||
            val?.order?.toString()?.includes(searchTerm) ||
            val?.message?.toString()?.includes(searchTerm)
        )}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />

      {/* {isAddVisible && (
        <AddNewTurnover
          onClose={() => setIsAddVisible(false)}
          refetchData={() => fetchData(params)}
        />
      )} */}

      {/* {isEditVisible && (
        <EditTurnover
          onClose={() => setIsEditVisible(false)}
          data={dataEdit}
          refetchData={() => fetchData(params)}
        />
      )} */}

      {/* <ConfirmModal
        isVisible={isDeleteVisible}
        text={`xóa doanh thu`}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      /> */}
    </div>
  );
}
