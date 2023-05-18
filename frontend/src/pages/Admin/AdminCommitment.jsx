import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Modal } from 'antd';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import AdminAddCommit from '../../components/Admin/Commit/AdminAddCommit';
import AdminEditCommit from '../../components/Admin/Commit/AdminEditCommit';
import ConfirmModal from '../../components/ConfirmModal';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { handleSearch } from '../../components/Admin/HandleSearch/HandleSearch';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { END_POINT } from '../../utils/constant';

export default function AdminCommitment() {

  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [IdCompare, setValueCompare] = useState('');
  const [nameCompare, setNameCompare] = useState('');
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
    /*   const { data: response } = await axios.get(`${END_POINT}/commitment`, {
        params: params,
      }); */
       const { data: response } = await axios.get(`${END_POINT}/commitment`, {
        params: params,
      },
      {
          headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data.commits);
      setData(response.data.commits);
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
    const [dataEdit] = data.filter((ele) => ele.heading === record.heading);
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
    const sort = sorter.order === 'descend' ? `-${sorter.field}` : sorter.field;
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
        `${END_POINT}/admin/commitment/${IdCompare}`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.status === 200) {
        alert('đã xóa thành công ');
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
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      width: '10%',
      render: (e) => (
        <img
          src={`${END_POINT}/public/${e}`}
          className="h-10 w-10"
          alt=""
        ></img>
      ),
    },
    {
      title: 'heading',
      dataIndex: 'heading',
      key: 'heading',
      width: '20%',
      sorter: (a, b) => a.heading.length - b.heading.length,
    },
    {
      title: 'detail',
      dataIndex: 'detail',
      key: 'details',

      sorter: (a, b) => a.detail.length - b.detail.length,
    },
    {
      title: 'Thao Tac',
      dataIndex: '_id',
      width: '20%',
      render: (a, record) => (
        <div className="flex flex-row justify-around gap-y-1 gap-x-3">
          <button
            className="flex items-baseline gap-x-1 hover:text-blue-600 "
            onClick={() => {
              handleClickEdit(record);
              // setIsModalVisibleEdit(!isModalVisibleEdit);
              // setEditCommitInfor(e);
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
              setNameCompare(record.heading);
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
      <div className="flex   justify-between mb-4">
        <span className="text-3xl font-blod py-4 px-2 uppercase">Commit</span>
        <Input.Search
          onSearch={searchByKeyword}
          className="w-1/3 lg:w-[400px]"
          placeholder="Search"
        />
        <div>
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
        <AdminAddCommit
          onClose={() => setIsAddVisible(false)}
          refetchData={() => fetchData(params)}
        />
      )}
      {isEditVisible && (
        <AdminEditCommit
          onClose={() => setIsEditVisible(false)}
          data={dataForEdit}
          refetchData={() => fetchData(params)}
        />
      )}
      <ConfirmModal //Modal delete department
        isVisible={isDeleteVisible}
        text={`xóa cam kết ${nameCompare}`}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      />
    </>
  );
}
