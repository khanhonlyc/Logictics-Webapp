import { Button, Input, Table } from "antd";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
import { MainContext } from "../../context/MainContext";
import { useEffect, useState, useContext } from "react";
import {
  AiFillEdit,
  AiOutlineDelete,
  AiOutlineMore,
  AiOutlinePlus,
} from "react-icons/ai";
import AdminNewBlog from "../../components/Admin/Blog/AdminNewBlog";
import ConfirmModal from "../../components/ConfirmModal";
import AdminEditBlog from "../../components/Admin/Blog/AdminEditBlog";

function AdminPostBlog() {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState([]);
  const [dataForEdit, setDataForEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [IdCompare, setValueCompare] = useState("");
  const [titleCompare, setTitleCompare] = useState("");
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
    setLoading(true);
    try {
      const { data: response } = await axios.get(`${END_POINT}/blog`, {
        params: params,
      });
      setData(response.data.blog);
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

  const acceptDelete = async () => {
    setLoading(true);
    setIsDisable(true);
    try {
      const res = await axios.delete(`${END_POINT}/admin/blog/${IdCompare}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
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

  useEffect(() => {
    fetchData(params);
  }, [params]);

  const handleClickEdit = (record) => {
    setIsEditVisible(true);
    const [dataEdit] = data.filter((ele) => ele.title === record.title);
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

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      ellipsis: true,
    },
    {
      title: "Thể loại",
      dataIndex: "categorys",
    },
    {
      title: "Ảnh",
      dataIndex: "picture",
      render: (e) => (
        <img
          src={`${END_POINT}/public/${e}`}
          alt="aaa"
          className="w-[50px] h-[50px]"
        />
      ),
    },
    {
      title: "",
      width: 160,
      dataIndex: "action",
      render: (a, record) => (
        <div className=" gap-y-1 gap-x-4 justify-around">
          {/* <button
            className="flex items-baseline gap-x-2 hover:text-green-600"
            // onClick={() => {
            //   setIsDetailVisible(true);
            //   handleClickDetail(record);
            // }}
          >
            <AiOutlineMore className="translate-y-[1px]" />
            Chi tiết
          </button> */}
          <button
            className="flex items-baseline gap-x-1 hover:text-blue-600"
            onClick={() => handleClickEdit(record)}
          >
            <AiFillEdit className="translate-y-[1px]" />
            Sửa
          </button>
          <button
            className="flex items-baseline gap-x-1 hover:text-red-600"
            onClick={() => {
              setIsDeleteVisible(true);
              setValueCompare(record._id);
              setTitleCompare(record.title);
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
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] font-bold">BLOG</h1>

        <Input.Search
          onSearch={searchByKeyword}
          className="w-[400px]"
          placeholder="Tìm kiếm blog dựa trên từ khoá"
        />

        <Button
          className="flex justify-center items-center text-[14px]"
          type="default"
          size="large"
          icon={<AiOutlinePlus />}
          onClick={() => setIsAddVisible(true)}
        >
          Đăng thêm blog
        </Button>
      </div>

      <Table
        rowKey={(record) => record._id}
        columns={columns}
        size="small"
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      {isAddVisible && (
        <AdminNewBlog
          onClose={() => setIsAddVisible(false)}
          refetchData={() => fetchData(params)}
        />
      )}
      {isEditVisible && (
        <AdminEditBlog
          onClose={() => setIsEditVisible(false)}
          data={dataForEdit}
          refetchData={() => fetchData(params)}
        />
      )}
      <ConfirmModal //Modal delete department
        isVisible={isDeleteVisible}
        text={`xóa blog ${titleCompare}`}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      />
    </>
  );
}

export default AdminPostBlog;
