import { Input, Table } from "antd";
import axios from "axios";
import React, { useState, useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AdminEditPartner from "../../components/Admin/Partner/AdminEditPartner";
import AdminNewPartner from "../../components/Admin/Partner/AdminNewPartner";
import ConfirmModal from "../../components/ConfirmModal";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { END_POINT } from "../../utils/constant";
export default function AdminPartner() {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [IdCompare, setValueCompare] = useState("");
  const [nameCompare, setNameCompare] = useState("");
  const [dataForEdit, setDataForEdit] = useState({});
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 1000,
    total: 15,
  });
  const [params, setParams] = useState({
    ...pagination,
    page: pagination.current - 1,
    keyword: null,
    sortBy: null,
  });

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(`${END_POINT}/partner`, {
        params: params,
      });
      setData(response.data.partners);
      console.log("doi tac", data);
      setLoading(false);
      setPagination({
        total: params?.total,
        pageSize: params?.pageSize,
        current: params?.page + 1,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData(params);
  }, [params]);

  const handleClickEdit = (record) => {
    setIsEditVisible(true);
    const [dataEdit] = data.filter((ele) => ele.name === record.name);
    setDataForEdit(dataEdit);
  };

  const searchByKeyword = (value) => {
    setParams({
      ...params,
      page: 0,
      keyword: value,
    });
  };

  const handleTableChange = (newPagination, filters, sorter) => {
    const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
    setParams({
      ...params,
      sortBy: sort,
      ...newPagination,
      page: newPagination.current - 1,
    });
  };

  const acceptDelete = async () => {
    setLoading(true);
    setIsDisable(true);
    try {
      const res = await axios.delete(
        `${END_POINT}/admin/partner/${IdCompare}`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.status === 200) {
        alert("đã xóa thành công ");
      }
      setLoading(false);
      fetchData({ ...pagination, page: pagination.current - 1 });
      setIsDisable(false);
      setIsDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: "10%",
      render: (e) => (
        <img
          src={`${END_POINT}/public/${e}`}
          className="h-10 w-10"
          alt=""
        ></img>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Thao Tac",
      dataIndex: "_id",
      width: "20%",
      render: (a, record) => (
        <div className="flex flex-row justify-around gap-y-1 gap-x-3">
          <button
            className="flex items-baseline gap-x-1 hover:text-blue-600 "
            onClick={() => {
              handleClickEdit(record);
            }}
          >
            <AiFillEdit className="translate-y-[1px]" />
            Sửa
          </button>
          <button
            className="flex items-baseline gap-x-1 hover:text-red-600"
            onClick={() => {
              setIsDeleteVisible(true);
              setValueCompare(record._id);
              setNameCompare(record.name);
            }}
          >
            <AiOutlineDelete className="translate-y-[1px]" />
            Xóa
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex   justify-between mb-4 ">
        <span className="text-2xl font-blod py-4 px-2 uppercase ">Partner</span>
        <Input.Search
          onSearch={searchByKeyword}
          className="w-1/3 lg:w-[400px]"
          placeholder="Tìm dựa trên tên khách hàng"
        />

        <div className="relative">
          <button
            className=" justify-around flex items-center absolute right-10 w-32 border rounded-lg p-2 shadow-xl hover:bg-yellow-100"
            onClick={() => setIsAddVisible(true)}
          >
            <AiOutlinePlus className="" />
            Thêm mới
          </button>
        </div>
      </div>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      {isAddVisible && (
        <AdminNewPartner
          onClose={() => setIsAddVisible(false)}
          refetchData={() => fetchData(params)}
        />
      )}
      {isEditVisible && (
        <AdminEditPartner
          onClose={() => setIsEditVisible(false)}
          data={dataForEdit}
          refetchData={() => fetchData(params)}
        />
      )}

      <ConfirmModal //Modal delete department
        isVisible={isDeleteVisible}
        text={`xóa đối tác ${nameCompare}`}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      />
    </>
  );
}
