import { Badge, Descriptions, Button } from "antd";
import { AiOutlineDelete, AiOutlineApartment } from "react-icons/ai";
import { useState, useContext, useEffect } from "react";
import { END_POINT } from "../../../utils/constant";
import { MainContext } from "../../../context/MainContext";
import React from "react";
import axios from "axios";
import AddDistance from "./AddDistance";
import ConfirmModal from "../../ConfirmModal";
import AddParticipant from "./AddParticipant";
import AddPrice from "./AddPrice";
import AddPriceList from "./AddPriceList";
import EditParticipant from "./EditParticipant";
import AdminEditDistance from "./EditDistance";
// import SplitProduct from "./SplitProduct";
function DetailService({ onClose, refetchData, data }) {
  const { accessToken } = useContext(MainContext);

  const [isDisable, setIsDisable] = useState(false);
  const [isAddParti, setIsAddParti] = useState(false);
  const [isEditParticipant, setIsEditParticipant] = useState(false);
  const [isDeleteParVisible, setIsDeleteParVisible] = useState(false);
  const [isAddDistance, setIsAddDistance] = useState(false);
  const [isEditDistance, setIsEditDistance] = useState(false);
  const [isDeleteDistance, setIsDeleteDistance] = useState(false);
  const [isAddPrice, setIsAddPrice] = useState(false);
  const [isAddPriceList, setIsAddPriceList] = useState(false);
  const [loading, setLoading] = useState(false);

  const [parData, setParData] = useState("");
  const [idPar, setIdPar] = useState("");
  const [dataEditParticipant, setDataEditParticipant] = useState({});
  const [dataDistance, setDataDistance] = useState("");
  const [idDistance, setIdDistance] = useState("");
  const [dataEditDistance, setDataEditDistance] = useState("");
  const [dataEdit, setDataEdit] = useState(data);

  console.log("data đầu", data);
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${END_POINT}/service/${data._id}`);
  //     setLoading(false);
  //     const data1 = response.data.data;
  //     setDataEdit(data1);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  //   console.log("edit ne:", dataEdit);
  // }, []);

  //lấy thông tin đối tác
  useEffect(() => {
    const getParData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${END_POINT}/participant/service/${data._id}`
        );
        console.log(res);
        const parData = res.data.data;
        setLoading(false);
        setParData(parData);
      } catch (error) {
        console.error(error.message);
      }
    };
    getParData();
  }, [data, isAddParti, isDeleteParVisible, isEditParticipant]);

  const acceptAddParticipant = async (dataPar) => {
    setLoading(true);
    setIsAddParti(true);

    try {
      const result = await axios({
        url: `${END_POINT}/admin/participant/${data._id}`,
        method: "post",
        data: dataPar,
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(result);
      if (result.status === 200) {
        alert("Thêm đối tác thành công");
        setLoading(false);
        setIsAddParti(false);
        // fetchData();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsAddParti(false);
    }
  };
  const acceptDeletePar = async () => {
    setLoading(true);
    setIsDisable(true);
    try {
      const res = await axios({
        url: `${END_POINT}/admin/participant/${idPar}`,
        method: "Delete",
        headers: { authorization: `Bearer ${accessToken}` },
      });
      if (res.status === 200) {
        alert("Xoa thanh cong");
      }
      setLoading(false);
      setIsDisable(false);
      setIsDeleteParVisible(false);
      // fetchData();
    } catch (error) {
      alert(`đã có lỗi:  ${error} `);
      setLoading(false);
      setIsDeleteParVisible(false);
    }
  };

  //distance
  useEffect(() => {
    const dataDistance = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${END_POINT}/distance/service/${data._id}`
        );
        setLoading(false);
        setDataDistance(result.data.data.distance);
        console.log("distance nè", dataDistance);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    dataDistance();
  }, [data, isAddDistance, isDeleteDistance, isEditDistance]);

  const acceptDeleteDistance = async () => {
    setLoading(true);
    setIsDisable(true);
    try {
      const res = await axios({
        url: `${END_POINT}/admin/distance/${idDistance}`,
        method: "Delete",
        headers: { authorization: `Bearer ${accessToken}` },
      });
      if (res.status === 200) {
        alert("Xoa thanh cong");
        setLoading(false);
        setIsDisable(false);
        setIsDeleteDistance(false);
        // fetchData();
      }
    } catch (error) {
      console.log(error);
      alert(`đã có lỗi:  ${error} `);
      setLoading(false);
      setIsDisable(false);
      setIsDeleteDistance(false);
    }
  };
  const acceptAddDistance = async (dataDis) => {
    console.log(dataDis);
    try {
      const result = await axios({
        url: `${END_POINT}/admin/distance/create/${data._id}`,
        method: "post",
        data: dataDis,
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(result);
      if (result.status === 200) {
        alert("Thêm khoảng cách thành công");
        setLoading(false);
        setIsAddDistance(false);
        // fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptAddPrice = async (dataPrice) => {
    console.log(dataPrice);
    try {
      const result = await axios({
        url: `${END_POINT}/admin/price/create/${data._id}`,
        method: "post",
        data: dataPrice,
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(result);
      if (result.status === 200) {
        alert("Thêm khoảng cách thành công");
        setLoading(false);
        setIsAddPrice(false);
        // fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptAddPriceList = async (dataPL) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/priceList/${data._id}`,
        method: "post",
        data: dataPL,
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(result);
      if (result.status === 200) {
        alert("Thêm khoảng cách thành công");
        setLoading(false);
        setIsAddPriceList(false);
        // fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Descriptions
        title="Thông tin chi tiết đơn hàng"
        layout="vertical"
        bordered
      >
        <Descriptions.Item label="Mã dịch vụ " span={3}>
          {data._id}
        </Descriptions.Item>
        <Descriptions.Item label="Tên dịch vụ" span={3}>
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label="Participant" span={3}>
          <Button
            onClick={() => {
              setIsAddParti(true);
              console.log("dinh");
            }}
          >
            Thêm mới
          </Button>
          {parData &&
            parData.map((par) => (
              <div className="flex items-end" key={par._id}>
                <img
                  src={`${END_POINT}/public/${par.banner}`}
                  className="h-10 w-10 rounded-full"
                  alt=""
                ></img>
                <p>&nbsp;&nbsp;</p>
                <div>{par.name}</div>
                <p>&nbsp;&nbsp;</p>
                <button
                  className="hover:text-red-600"
                  onClick={() => {
                    setIdPar(par._id);
                    setIsDeleteParVisible(true);
                  }}
                >
                  Xoá
                </button>
                <p>&nbsp;&nbsp;</p>
                <button
                  className="hover:text-blue-600"
                  onClick={() => {
                    setDataEditParticipant(par);
                    setIsEditParticipant(true);
                  }}
                >
                  Sửa
                </button>
                <hr />
              </div>
            ))}
        </Descriptions.Item>
        {/* khoảng cách */}
        <Descriptions.Item label="Khoảng cách" span={3}>
          <Button
            onClick={() => {
              setIsAddDistance(true);
            }}
          >
            Thêm mới
          </Button>

          {dataDistance &&
            dataDistance.map((dis) => (
              <div className="flex items-end " key={dis._id}>
                <div>{dis.fromProvince}</div>
                <div>{dis.toProvince}</div>
                <div>{dis.zonecode}</div>
                <div>{dis.distance}</div>
                <p>&nbsp;&nbsp;</p>
                <p>&nbsp;&nbsp;</p>
                <button
                  className="hover:text-red-600"
                  onClick={() => {
                    setIdDistance(dis._id);
                    setIsDeleteDistance(true);
                  }}
                >
                  Xoá
                </button>
                <p>&nbsp;&nbsp;</p>
                <button
                  className="hover:text-blue-600"
                  onClick={() => {
                    setIsEditDistance(true);
                    setDataEditDistance(dis);
                  }}
                >
                  Sửa
                </button>
              </div>
            ))}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Features" span={3}>
          {data.features.map((fea) => (
            <div>{fea}</div>
          ))}
        </Descriptions.Item> */}
        <Descriptions.Item label="Bảng giá" span={3}>
          <div>{data.price}</div>
          <Button
            onClick={() => {
              setIsAddPrice(true);
            }}
          >
            Tạo bảng giá mới
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="Price File" span={3}>
          <Button
            onClick={() => {
              setIsAddPriceList(true);
            }}
          >
            Tạo price List mới
          </Button>
          {data.price_files.map((price) => (
            <div className="flex items-end  ">
              <div>{price.province}</div>
              <img
                src={`${END_POINT}/public/${price.file}`}
                className="h-10 w-10 rounded-full"
                alt=""
              ></img>

              <p>&nbsp;&nbsp;</p>
              <button
                className="hover:text-red-600"
                // onClick={() => {
                //   setIdDistance(dis);
                //   setIsDeleteDistance(true);
                // }}
              >
                Xoá
              </button>
              <p>&nbsp;&nbsp;</p>
              <button className="hover:text-blue-600">Sửa</button>
              <br />
              <p></p>
            </div>
          ))}
        </Descriptions.Item>
      </Descriptions>
      <Button
        size="large"
        className={
          "hover:bg-red-500 hover:border-red-700 hover:text-white border-none float-right"
        }
        onClick={onClose}
      >
        x
      </Button>

      {isAddParti && (
        <AddParticipant
          isVisible={isAddParti}
          loading={loading}
          onClick={acceptAddParticipant}
          onClose={() => setIsAddParti(false)}
        />
      )}
      {isEditParticipant && (
        <EditParticipant
          onClose={() => setIsEditParticipant(false)}
          data={dataEditParticipant}
        />
      )}
      {isDeleteParVisible && (
        <ConfirmModal
          isVisible={isDeleteParVisible}
          text={`xóa par`}
          onClose={() => setIsDeleteParVisible(false)}
          loading={loading}
          disable={isDisable}
          onOk={acceptDeletePar}
        />
      )}

      {isAddDistance && (
        <AddDistance
          isVisible={isAddDistance}
          loading={loading}
          onClick={acceptAddDistance}
          onClose={() => setIsAddDistance(false)}
        />
      )}
      {isEditDistance && (
        <AdminEditDistance
          onClose={() => setIsEditDistance(false)}
          data={dataEditDistance}
        />
      )}
      {isDeleteDistance && (
        <ConfirmModal
          isVisible={isDeleteDistance}
          text={`xóa khoảng cách`}
          onClose={() => setIsDeleteDistance(false)}
          loading={loading}
          disable={isDisable}
          onOk={acceptDeleteDistance}
        />
      )}

      {isAddPrice && (
        <AddPrice
          isVisible={isAddPrice}
          loading={loading}
          onClick={acceptAddPrice}
          onClose={() => setIsAddPrice(false)}
        />
      )}
      {isAddPriceList && (
        <AddPriceList
          isVisible={isAddPriceList}
          loading={loading}
          onClick={acceptAddPriceList}
          onClose={() => setIsAddPriceList(false)}
        />
      )}
    </>
  );
}
export default DetailService;
