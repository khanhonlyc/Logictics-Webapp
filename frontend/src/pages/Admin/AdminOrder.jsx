import React, { useState, useRef, useEffect, useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { Form, Button, Input, Table, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  AiFillEdit,
  AiOutlineDelete,
  AiOutlineMore,
  AiTwotoneCar,
} from "react-icons/ai";
import AddNewOrder from "../../components/Admin/Order/AddNewOrder";
import ConfirmModal from "../../components/ConfirmModal";
import EditOrder from "../../components/Admin/Order/EditOrder";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
import SplitProduct from "../../components/Admin/Order/SplitProduct";
import { TOKEN } from "./adminToken";
import DetailOrder from "../../components/Admin/Order/DetailOrder";
import CreateRoute from "../../components/Admin/Order/CreateRoute";

export default function AdminOrder() {
  const { accessToken } = useContext(MainContext);
  // console.log(accessToken)
  const api = `${END_POINT}/admin/order`;
  // const apiListOrder = "http://localhost:8000/api/order/tracking/"
  const [id, setId] = useState();
  const [dataEdit, setDataEdit] = useState();

  const [openDel, setOpenDel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 3,
  });
  const [params, setParams] = useState({
    ...pagination,
    page: pagination.current - 1,
    keyword: null,
    sortBy: null,
  });

  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDetaiVisible, setIsDetailVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isSplitVisible, setIsSplitVisible] = useState(false);
  const [isCreateRouteVisible, setIsCreateRouteVisible] = useState(false);
  const [IdCompare, setValueCompare] = useState("");
  const [nameCompare, setNameCompare] = useState("");
  const [dataForEdit, setDataForEdit] = useState({});
  const [dataForDetail, setDataForDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(1);
  const [dataForSplit, setDataForSplit] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);


  const [data, setData] = useState([
    {
      orderId: "string",
      service: "string",
      total_price: "string",
      status: "string",
      origin: "string",
      destination: "string",
      receiver: "string",
      customer: "",
    },
  ]);

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(`${END_POINT}/admin/order`, {
        headers: { authorization: `Bearer ${accessToken}` },
        params: params,
      });
      console.log(response);
      setData(response.data.orders);
      console.log('data', data);
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
  const acceptDelete = async () => {
    setLoading(true);
    setIsDisable(true);
    try {
      await axios.delete(`${END_POINT}/admin/order/${IdCompare}`, {
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
  const searchByKeyword = (value, dataIndex) => {
    setParams({
      ...params,
      page: 0,
      status: value,
    });
  };

  const getColumnSearchProps = (dataIndex, subField) => {
    return ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        // status,
        confirm,
        clearFilters,
      }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              destination="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              destination="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1890ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) => {
        if (subField) {
          return record[dataIndex][subField].toString().toLowerCase().includes(value.toLowerCase())
        }
        return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    });
  }
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  useEffect(() => {
    fetchData(params);
  }, [params]);

  const columns = [
    {
      title: "Tên người nhận",
      dataIndex: ["receiver", "name"],
      key: "receiver",
      width: "14.2%",
      sorter: (a, b) => a.receiver.name.length - b.receiver.name.length,
      sortDirections: ["descend"],
      ...getColumnSearchProps("receiver", "name"),
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "total_price",
      width: "14.2%",
    },
    {
      title: "Xuất phát",
      dataIndex: ["origin", "address", "province"],
      key: "destination",
      width: "14.2%",
    },
    {
      title: "Dịch vụ",
      dataIndex: ["service", "name"],
      key: "service",
      width: "14.2%",
      ...getColumnSearchProps("service", "name"),
    },
    {
      title: "Điểm đến",
      dataIndex: ["destination", "address", "province"],
      key: "origin",
      width: "14.2%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "12%",
      ...getColumnSearchProps("status"),
    },
    {
      title: "",
      dataIndex: "action",
      width: "14.2%",
      render: (e, record) => (
        <div className=" gap-y-1 gap-x-4 justify-around">
          <button
            className="flex items-baseline gap-x-2 hover:text-green-600"
            onClick={() => {
              setIsDetailVisible(true);
              handleClickDetail(record);
            }}
          >
            <AiOutlineMore className="translate-y-[1px]" />
            Chi tiết
          </button>
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
              setValueCompare(record.orderId);
              setNameCompare(record.name);
            }}
          >
            <AiOutlineDelete className="translate-y-[1px]" />
            Xóa
          </button>
          <button
            className="flex items-baseline gap-x-1 hover:text-yellow-600"
            onClick={() => {
              setIsCreateRouteVisible(true);
              handleClickDetail(record);
            }}
          >
            <AiTwotoneCar className="translate-y-[1px]" />
            Tạo đường đi
          </button>
        </div>
      ),
    },
  ];

  const handleClickEdit = (record) => {
    setIsEditVisible(true);
    const [dataEdit] = data.filter((ele) => ele.orderId === record.orderId);
    setDataForEdit(dataEdit);
  };
  const handleClickDetail = (record) => {
    const [dataEdit] = data.filter((ele) => ele.orderId === record.orderId);
    setDataForDetail(dataEdit);
  };
  const handleTableChange = (newPagination, filters, sorter) => {
    console.log('params', newPagination, filters, sorter,);
    // const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
    // setParams({
    //   ...params,
    //   sortBy: sort,
    //   ...newPagination,
    //   page: newPagination.current - 1,
    // });
  };
  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="p-2 w-32 hover:opacity-80  border-black border-2 "
          onClick={() => setIsAddVisible(true)}
        >
          +Thêm
        </button>
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
        <AddNewOrder
          isVisible={isAddVisible}
          onClose={() => setIsAddVisible(false)}
          loading={loading}
          disable={isDisable}
          refetchData={() => fetchData(params)}
        />
      )}

      {isEditVisible && (
        <EditOrder
          isVisible={isEditVisible}
          loading={loading}
          disable={isDisable}
          data={dataForEdit}
          refetchData={() => fetchData(params)}
          onClose={() => setIsEditVisible(false)}
        />
      )}

      {isCreateRouteVisible && (
        <CreateRoute
          isVisible={isCreateRouteVisible}
          loading={loading}
          disable={isDisable}
          data={dataForDetail}
          onClose={() => setIsCreateRouteVisible(false)}
        />
      )}
      {isDetaiVisible && (
        <DetailOrder
          isVisible={isDetaiVisible}
          data={dataForDetail}
          disable={isDisable}
          onClose={() => setIsDetailVisible(false)}
        />
      )}
      {isDeleteVisible && (
        <ConfirmModal
          isVisible={isDeleteVisible}
          text={`xóa order`}
          onClose={() => setIsDeleteVisible(false)}
          loading={loading}
          disable={isDisable}
          onOk={acceptDelete}
        />
      )}
    </div>
  );
}
