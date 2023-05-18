import { Input, Table } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

const { Search } = Input;

function Inventory() {
  // Use context
  const { setMetadata, accessToken } = useContext(MainContext);

  // Initial state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    total: data.length,
    pageSize: 10,
    current: 1,
  });

  // Set metadata
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Hàng tồn kho | TKTL",
      };
    });
  }, [setMetadata]);

  // Columns of table
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      sorter: (a, b) => {
        if (a.product_name < b.product_name) return -1;
        if (a.product_name > b.product_name) return 1;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      sorter: (a, b) => {
        if (a.quantity < b.quantity) return -1;
        if (a.quantity > b.quantity) return 1;
      },
    },
    {
      title: "Doanh thu",
      dataIndex: "turnover",
      sorter: (a, b) => {
        if (a.turnover < b.turnover) return -1;
        if (a.turnover > b.turnover) return 1;
      },
      render: (text) => (
        <span>{text.toLocaleString().replaceAll(",", ".")} VND</span>
      ),
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      sorter: (a, b) => {
        if (a.value < b.value) return -1;
        if (a.value > b.value) return 1;
      },
    },
  ];

  // Fetch data
  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: response } = await axios.get(`${END_POINT}/warehouse`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      // Filter status is import
      const dataFiltered = response.data.warehouses
        .map((warehouse) => warehouse.inventory_product_shipments)
        .flat()
        .filter((shipment) => shipment.status === "import");

      setData(dataFiltered.reverse());

      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle change pagination and auto fetch data
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search
  const convertValue = (value) => value.toString().toLowerCase();

  // Handle table change with sorter and pagination
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);

    const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;

    fetchData({
      sortBy: sort,
      ...newPagination,
      page: newPagination.current - 1,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-bold mb-1 lg:text-2xl mt-2 text-[#3A3C3F]"
          title="Hàng tồn kho"
        >
          Hàng tồn kho
        </h2>

        <Search
          className="max-w-xl lg:w-[400px] mx-auto"
          placeholder="Tìm kiếm..."
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>

      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={data.filter(
          (value) =>
            convertValue(value.product_name).includes(searchTerm) ||
            convertValue(value.quantity).includes(searchTerm) ||
            convertValue(value.turnover).includes(searchTerm) ||
            convertValue(value.value).includes(searchTerm)
        )}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
}

export default Inventory;
