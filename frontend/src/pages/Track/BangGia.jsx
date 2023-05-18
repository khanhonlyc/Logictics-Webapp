import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

export default function BangGia() {
  const { setMetadata } = useContext(MainContext);
  const [services, setServices] = useState([]);
  const [distances, setDistances] = useState([]);
  const [priceFiles, setPriceFiles] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const [province, setProvince] = useState("");

  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Bảng giá | TKTL",
      };
    });
  }, [setMetadata]);

  useEffect(() => {
    const getService = async () => {
      const res = await axios.get(`${END_POINT}/service`);
      const { data } = res.data;
      setServices(data.service);
    };
    getService();
  }, []);

  useEffect(() => {
    const getDistance = async () => {
      const res = await axios.get(`${END_POINT}/distance/service/${serviceId}`);
      const { data } = res.data;
      setDistances(data.distance);
    };
    getDistance();
  }, [serviceId]);

  const fromProvince = distances.map((d) => {
    return d.fromProvince;
  });

  const toProvince = distances.map((d) => {
    return d.toProvince;
  });

  const location = fromProvince.concat(toProvince);

  const newLocation = location.filter((item, index) => {
    return location.indexOf(item) === index;
  });

  useEffect(() => {
    const getProvince = async () => {
      const res = await axios.get(
        `${END_POINT}/pricelist?province=${province}`
      );
      const { data } = res.data;
      setPriceFiles(data.files);

      console.log(data.files);
    };

    getProvince();
  }, [province]);

  return (
    <div
      className="price_list "
      style={{
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <div className="p-7">
        <div className="my-2">
          <span className="mb-4 inline-block font-bold text-xl text-[#F0B90B]">
            Dịch vụ: <span className="text-red-500"> * </span>
          </span>
          <div className="w-full h-[full]">
            <select
              tabIndex={-1}
              aria-hidden="true"
              className="w-full h-[43px] p-1 border"
              onChange={(e) => setServiceId(e.target.value)}
            >
              <option data-select2-id="select2-data-81-rsyi" value="">
                Chọn dịch vụ
              </option>

              {services?.length > 0 &&
                services.map((service) => (
                  <option
                    className="text-[#161D25]"
                    value={service._id}
                    key={service._id}
                  >
                    {service.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full h-[full] mt-8">
          <div className="my-2">
            <span className="mb-4 inline-block font-bold text-xl text-[#F0B90B]">
              Khu Vực: <span className="text-red-500"> * </span>
            </span>
          </div>
          <select
            tabIndex={-1}
            aria-hidden="true"
            className="w-full h-[43px] p-1 border"
            onChange={(e) => setProvince(e.target.value)}
          >
            <option data-select2-id="select2-data-81-rsyi" value="">
              Chọn khu vực
            </option>

            {newLocation?.length > 0 &&
              newLocation.map((location, index) => (
                <option className="text-[#161D25]" value={location} key={index}>
                  {location}
                </option>
              ))}
          </select>
        </div>

        <div className="text-center mt-[56px]">
          {priceFiles?.map((p, idx) => (
            <a
              href={`${END_POINT}/public/${p?.file}`}
              target="_blank"
              className="text-[20px] px-4 mt-14 bg-[#E5A663] min-h-[50px] rounded-[10px] flex items-center justify-center w-full"
              rel="noreferrer"
              key={idx}
            >
              Tra cứu
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// sửa lại port 8000 theo API
