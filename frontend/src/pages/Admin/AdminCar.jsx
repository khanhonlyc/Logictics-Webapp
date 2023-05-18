import { Table, Input } from "antd";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { END_POINT } from "../../utils/constant";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AddNewCar from "../../components/Admin/Car/AddCar";
import EditCar from "../../components/Admin/Car/EditCar";
import ConfirmModal from "../../components/ConfirmModal";
import { MainContext } from "../../context/MainContext";

function AdminCar() {
  const columns = [
    {
      title: "Biển số xe",
      dataIndex: "plate",
      sorter: (a, b) => {
        if (a.plate < b.plate) return -1;
        if (a.plate > b.plate) return 1;
      },
    },
    {
      title: "Loại xe",
      dataIndex: "car_type",
      sorter: (a, b) => {
        if (a.car_type < b.car_type) return -1;
        if (a.car_type > b.car_type) return 1;
      },
      render: (text, record, index) => record.car_type.replaceAll("_", " "),
    },
    {
      title: "Dung tích",
      dataIndex: "volumn",
      sorter: (a, b) => {
        if (a.volumn < b.volumn) return -1;
        if (a.volumn > b.volumn) return 1;
      },
    },
    {
      title: "Trọng tải",
      dataIndex: "tonnage",
      sorter: (a, b) => {
        if (a.tonnage < b.tonnage) return -1;
        if (a.tonnage > b.tonnage) return 1;
      },
    },
    {
      title: "",
      width: 160,
      dataIndex: "action",
      render: (a, record) => (
        <div className="flex flex-row gap-y-1 gap-x-3 justify-around">
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
              setNameCompare(record.plate);
            }}
          >
            <AiOutlineDelete className="translate-y-[1px]" />
            Xóa
          </button>
        </div>
      ),
    },
  ];
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: data.length,
  });
  const [params, setParams] = useState({
    ...pagination,
    page: pagination.current - 1,
    keyword: null,
    sortBy: null,
  });
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [IdCompare, setValueCompare] = useState("");
  const [nameCompare, setNameCompare] = useState("");
  const [dataForEdit, setDataForEdit] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(`${END_POINT}/admin/car`, {
        headers: { authorization: `Bearer ${accessToken}` },
        params: params,
      });
      setData(response.data.listCar.reverse());
      setLoading(false);
      setPagination({
        total: response.data.length,
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
  const acceptDelete = async () => {
    setLoading(true);
    setIsDisable(true);
    try {
      await axios.delete(`${END_POINT}/admin/car/${IdCompare}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      fetchData({ ...pagination, page: pagination.current - 1 });
      setIsDisable(false);
      setIsDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickEdit = (record) => {
    setIsEditVisible(true);
    setDataForEdit(record);
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
    fetchData({
      sortBy: sort,
      ...newPagination,
      page: newPagination.current - 1,
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <span className="text-3xl font-bold uppercase">Phương tiện</span>
        <Input.Search
          className="w-1/3 lg:w-[400px]"
          placeholder="Nhập từ khóa"
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={searchByKeyword}
        />
        <button
          className="px-5 py-2 border border-neutral-800 text-center hover:bg-slate-300"
          onClick={() => setIsAddVisible(true)}
        >
          + Thêm mới
        </button>
      </div>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={data.filter(
          (val) =>
            val.car_type.includes(searchTerm) ||
            val.plate.includes(searchTerm) ||
            val.tonnage.toString().includes(searchTerm) ||
            val.volumn.toString().includes(searchTerm)
        )}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      {isAddVisible && (
        <AddNewCar
          onClose={() => setIsAddVisible(false)}
          refetchData={() => fetchData(params)}
        />
      )}
      {isEditVisible && (
        <EditCar
          onClose={() => setIsEditVisible(false)}
          data={dataForEdit}
          refetchData={() => fetchData(params)}
        />
      )}
      <ConfirmModal //Modal delete
        isVisible={isDeleteVisible}
        text={`xóa số xe ${nameCompare}`}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      />
    </div>
  );
}

export default AdminCar;
