import { message } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  getDistrictsByProvinceCode,
  getProvinces,
  getWardsByDistrictCode,
} from "sub-vn";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

export default function CuocVanChuyen() {
  // ================== FROM STATE =======================
  const [provincesFrom, setProvincesFrom] = useState([]);
  const [districtsFrom, setDistrictsFrom] = useState([]);
  const [wardsFrom, setWardsFrom] = useState([]);

  const [provinceCodeFrom, setProvinceCodeFrom] = useState(null);
  const [districtCodeFrom, setDistrictCodeFrom] = useState(null);
  const [wardCodeFrom, setWardCodeFrom] = useState(null);

  // ================== TO STATE =======================
  const [provincesTo, setProvincesTo] = useState([]);
  const [districtsTo, setDistrictsTo] = useState([]);
  const [wardsTo, setWardsTo] = useState([]);

  const [provinceCodeTo, setProvinceCodeTo] = useState(null);
  const [districtCodeTo, setDistrictCodeTo] = useState(null);
  const [wardCodeTo, setWardCodeTo] = useState(null);
  const { setMetadata } = useContext(MainContext);
  // weight
  const [weight, setWeight] = useState(null);
  const [unit, setUnit] = useState("kg");
  const [price, setPrice] = useState(0);

  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState(null);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const getService = async () => {
      const res = await axios.get(`${END_POINT}/service`);
      const { data } = res.data;
      setServices(data.service);
    };
    getService();
  }, []);

  // =================== FROM EFFECT =======================//
  // get all provinces
  useEffect(() => {
    setProvincesFrom(getProvinces());
  }, []);
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Cước vận chuyển | TKTL",
      };
    });
  }, [setMetadata]);

  // get all districts by province code
  useEffect(() => {
    setDistrictsFrom(getDistrictsByProvinceCode(provinceCodeFrom));
  }, [provinceCodeFrom]);

  // get all wards by district code
  useEffect(() => {
    setWardsFrom(getWardsByDistrictCode(districtCodeFrom));
  }, [districtCodeFrom]);

  // =================== TO EFFECT =======================//
  // get all provinces
  useEffect(() => {
    setProvincesTo(getProvinces());
  }, []);

  // get all districts by province code
  useEffect(() => {
    setDistrictsTo(getDistrictsByProvinceCode(provinceCodeTo));
  }, [provinceCodeTo]);

  // get all wards by district code
  useEffect(() => {
    setWardsTo(getWardsByDistrictCode(districtCodeTo));
  }, [districtCodeTo]);

  const handleSubmit = async () => {
    // check empty field
    if (
      !provinceCodeFrom ||
      !provinceCodeTo ||
      !districtCodeFrom ||
      !districtCodeTo ||
      !wardCodeFrom ||
      !wardCodeTo ||
      !weight
    ) {
      setIsValid(false);
      message.error({
        content: "Vui lòng nhập đầy đủ thông tin",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
      return;
    }

    const provinceFrom = provincesFrom.find(
      (prov) => prov.code === provinceCodeFrom
    );
    const provinceTo = provincesTo.find((prov) => prov.code === provinceCodeTo);
    const districtFrom = districtsFrom.find(
      (prov) => prov.code === districtCodeFrom
    );
    const districtTo = districtsTo.find((prov) => prov.code === districtCodeTo);
    const wardFrom = wardsFrom.find((prov) => prov.code === wardCodeFrom);
    const wardTo = wardsTo.find((prov) => prov.code === wardCodeTo);

    try {
      const info = await axios.post(`${END_POINT}/tracking/postage`, {
        fromProvince: provinceFrom.name,
        fromDistrict: districtFrom.name,
        fromWard: wardFrom.district_name,
        toProvince: provinceTo.name,
        toDistrict: districtTo.name,
        toWard: wardTo.district_name,
        unit: unit,
        quantity: weight,
        serviceName: serviceName,
      });

      setPrice(info.data.data.result);

      if (info.success === false) {
        message.error({
          content: info.message || "Có lỗi xảy ra",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });

        setPrice(null);
      }
    } catch (error) {
      message.error({
        content: error?.response?.data?.message || "Có lỗi xảy ra",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
      setPrice(null);
    }

    setIsValid(true);
  };

  return (
    <div
      className="p-7 shadow shadow-zinc-200 flex-col"
      style={{
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <div className="flex-col">
        <div className="w-full">
          <span className="mb-4 inline-block font-bold text-xl text-[#F0B90B]">
            Gửi từ: <span className="text-red-500"> * </span>
          </span>

          <div className="w-full flex lg:flex-row flex-col">
            <div className="lg:w-[400px] w-full my-2 border mx-2">
              <div className="w-full h-[43px]">
                <select
                  className="w-full h-[43px] p-1"
                  tabIndex={-1}
                  aria-hidden="true"
                  onChange={(e) => setProvinceCodeFrom(e.target.value)}
                >
                  <option data-select2-id="select2-data-81-rsyi" value="">
                    Tỉnh/ Thành phố
                  </option>

                  {provincesFrom?.length > 0 &&
                    provincesFrom.map((province) => (
                      <option
                        className="text-[#161D25]"
                        value={province.code}
                        key={province.code}
                      >
                        {province.name}
                      </option>
                    ))}
                </select>
                <span style={{ width: "345.337px" }}>
                  <span className="selection">
                    <span
                      className="select2-selection select2-selection--single"
                      tabIndex={0}
                      aria-disabled="false"
                    >
                      <span
                        className="select2- ml-1"
                        id="select2-dropdown-from-prov-tariff-container"
                        title="Tỉnh/ Thành phố"
                      >
                        {/* Tỉnh/ Thành phố */}
                      </span>
                      <span
                        className="select2-selection__arrow"
                        role="presentation"
                      >
                        <b role="presentation" />
                      </span>
                    </span>
                  </span>
                  <span className="dropdown-wrapper" aria-hidden="true" />
                </span>
              </div>
              <div className="text-red-500 select_val" />
            </div>

            <div className="lg:w-[400px] w-full my-2 border mx-2">
              <div className="w-full h-[43px]">
                <select
                  className="p-1 w-full h-[43px] "
                  onChange={(e) => setDistrictCodeFrom(e.target.value)}
                >
                  <option value="">Quận/ Huyện</option>

                  {districtsFrom?.length > 0 &&
                    districtsFrom.map((district) => (
                      <option
                        className="text-[#161D25]"
                        value={district.code}
                        key={district.code}
                      >
                        {district.name}
                      </option>
                    ))}
                </select>
                <span style={{ width: "345.337px" }}>
                  <span className="selection">
                    <span>
                      {/* <span className=" ml-1" title="Quận/ Huyện">
												Quận/ Huyện
											</span> */}
                      <span>
                        <b />
                      </span>
                    </span>
                  </span>
                </span>
              </div>
              <div className="text-red-500 select_val" />
            </div>
            <div className="lg:w-[400px] w-full my-2 border mx-2">
              <div className="w-full h-[43px]">
                <select
                  name="from_ward"
                  className="p-1 w-full h-[43px]"
                  onChange={(e) => setWardCodeFrom(e.target.value)}
                >
                  <option value="">Phường/ Xã</option>

                  {wardsFrom?.length > 0 &&
                    wardsFrom.map((ward) => (
                      <option
                        className="text-[#161D25]"
                        value={ward.code}
                        key={ward.code}
                      >
                        {ward.name}
                      </option>
                    ))}
                </select>
                <span style={{ width: "345.337px" }}>
                  <span className="selection">
                    {/* <span className="ml-1" title="Phường/ Xã">
											Phường/ Xã
										</span> */}
                    <span className="select2-selection__arrow">
                      <b />
                    </span>
                  </span>
                </span>
              </div>
              <div className="text-red-500 select_val" />
            </div>
          </div>
        </div>

        <div className="w-full my-8">
          <span className="mb-[16px] inline-block  font-bold text-xl text-[#F0B90B]">
            Gửi đến:
            <span className="text-red-500">*</span>
          </span>

          <div className="w-full flex lg:flex-row flex-col">
            <div className="lg:w-[400px] w-full my-2 border mx-2">
              <div className="w-full h-[43px]">
                <select
                  name="to_province"
                  className="p-1 name_select search-select w-full h-full select2-hidden-accessible"
                  tabIndex={-1}
                  aria-hidden="true"
                  data-select2-id="select2-data-dropdown-to-prov-tariff"
                  onChange={(e) => setProvinceCodeTo(e.target.value)}
                >
                  <option data-select2-id="select2-data-81-rsyi" value="">
                    Tỉnh/ Thành phố
                  </option>

                  {provincesTo?.length > 0 &&
                    provincesTo.map((province) => (
                      <option
                        className="text-[#161D25]"
                        value={province.code}
                        key={province.code}
                      >
                        {province.name}
                      </option>
                    ))}
                </select>
                <span style={{ width: "345.337px" }}>
                  <span className="selection">
                    <span tabIndex={0}>
                      <span className=" ml-1" title="Tỉnh/ Thành phố">
                        {/* Tỉnh/ Thành phố */}
                      </span>
                      <span className="select2-selection__arrow">
                        <b />
                      </span>
                    </span>
                  </span>
                </span>
              </div>
              <div className="text-red-500 select_val" />
            </div>

            <div className="lg:w-[400px] w-full my-2 border mx-2">
              <div className="w-full select2-stupid item-tariff h-[43px]">
                <select
                  name="to_district"
                  className="p-1 name_select search-select w-full h-full select2-hidden-accessible"
                  tabIndex={-1}
                  aria-hidden="true"
                  data-select2-id="select2-data-dropdown-to-district-tariff"
                  onChange={(e) => setDistrictCodeTo(e.target.value)}
                >
                  <option value="">Quận/ Huyện</option>

                  {districtsTo?.length > 0 &&
                    districtsTo.map((district) => (
                      <option
                        className="text-[#161D25]"
                        value={district.code}
                        key={district.code}
                      >
                        {district.name}
                      </option>
                    ))}
                </select>
                <span
                  className="select2 select2-container select2-container--material"
                  dir="ltr"
                  data-select2-id="select2-data-151-mszu"
                  style={{ width: "345.337px" }}
                >
                  <span className="selection">
                    <span
                      className="select2-selection select2-selection--single"
                      role="combobox"
                      aria-haspopup="true"
                      aria-expanded="false"
                      tabIndex={0}
                      aria-disabled="false"
                      aria-labelledby="select2-dropdown-to-district-tariff-container"
                      aria-controls="select2-dropdown-to-district-tariff-container"
                    >
                      {/* <span
											className="select2- ml-1"
											id="select2-dropdown-to-district-tariff-container"
											title="Quận/ Huyện"
										>
											Quận/ Huyện
										</span> */}
                      <span
                        className="select2-selection__arrow"
                        role="presentation"
                      >
                        <b role="presentation" />
                      </span>
                    </span>
                  </span>
                  <span className="dropdown-wrapper" aria-hidden="true" />
                </span>
              </div>
              <div className="text-red-500 select_val" />
            </div>
            <div className="lg:w-[400px] w-full my-2 border mx-2">
              <div className="w-full select2-stupid item-tariff h-[43px]">
                <select
                  name="to_ward"
                  className="p-1 name_select search-select w-full h-full select2-hidden-accessible"
                  tabIndex={-1}
                  aria-hidden="true"
                  data-select2-id="select2-data-dropdown-to-ward-tariff"
                  onChange={(e) => setWardCodeTo(e.target.value)}
                >
                  <option data-select2-id="select2-data-154-1nut" value="">
                    Phường/ Xã
                  </option>

                  {wardsTo?.length > 0 &&
                    wardsTo.map((ward) => (
                      <option
                        className="text-[#161D25]"
                        value={ward.code}
                        key={ward.code}
                      >
                        {ward.name}
                      </option>
                    ))}
                </select>
                <span
                  className="select2 select2-container select2-container--material"
                  dir="ltr"
                  data-select2-id="select2-data-153-rv8v"
                  style={{ width: "345.337px" }}
                >
                  <span className="selection">
                    <span
                      className="select2-selection select2-selection--single"
                      role="combobox"
                      aria-haspopup="true"
                      aria-expanded="false"
                      tabIndex={0}
                      aria-disabled="false"
                      aria-labelledby="select2-dropdown-to-ward-tariff-container"
                      aria-controls="select2-dropdown-to-ward-tariff-container"
                    >
                      {/* <span
											className="select2- ml-1"
											id="select2-dropdown-to-ward-tariff-container"
											title="Phường/ Xã"
										>
											Phường/ Xã
										</span> */}
                      <span
                        className="select2-selection__arrow"
                        role="presentation"
                      >
                        <b role="presentation" />
                      </span>
                    </span>
                  </span>
                  <span className="dropdown-wrapper" aria-hidden="true" />
                </span>
              </div>
              <div className="text-red-500 select_val" />
            </div>
          </div>
        </div>

        <div className="lg:w-[15%] w-full my-2 ml-2">
          <div>
            <span className="block mb-[8px] text-[#F0B90B] font-bold text-xl mt-5 ">
              Khối lượng
              <span className="text-red-500">*</span>
            </span>
            <div className="flex items-center space-x-4">
              <input
                value={weight}
                min={0}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                id="weight"
                name="weight"
                className="name_input border border-[#ced4da] rounded-[2px] pl-2  py-3  focus:outline-none h-[43px] w-full"
              />
              <select
                className="w-full h-full outline-none border-none "
                defaultValue="kg"
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="" disabled>
                  Chọn đơn vị
                </option>
                <option value="kg">Kg</option>
                <option value="m3">M³</option>
                <option value="ton">Tấn</option>
              </select>
            </div>

            <div className="my-2">
              <span className="mb-4 inline-block font-bold text-xl text-[#F0B90B]">
                Dịch vụ: <span className="text-red-500"> * </span>
              </span>
              <div className="w-full h-[43px]">
                <select
                  tabIndex={-1}
                  aria-hidden="true"
                  className="w-full h-[43px] p-1 border"
                  onChange={(e) => setServiceName(e.target.value)}
                >
                  <option data-select2-id="select2-data-81-rsyi" value="">
                    Chọn dịch vụ
                  </option>

                  {services?.length > 0 &&
                    services.map((service) => (
                      <option
                        className="text-[#161D25]"
                        value={service.name}
                        key={service._id}
                      >
                        {service.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-[56px]">
        <button
          className="text-black tracking-wide bg-[#e5a663] rounded-[2px] min-h-[55px] w-full text-lg "
          style={{ fontWeight: 600 }}
          // data-toggle={isValid && 'collapse'}
          data-target="#bill"
          onClick={handleSubmit}
        >
          Tra cứu cước vận chuyển
        </button>
        {/* <div id="bill" className="collapse px-4 lg:px-0"> */}
        {isValid && price ? (
          <div id="bill" className="px-4 lg:px-0">
            <div className="mt-14 bg-[#FFF2F4] min-h-[215px] rounded-[10px] flex flex-col items-center justify-center">
              <span className="uppercase text-[#161D25] SFProDisplayBold">
                tổng tiền cước vận chuyển
              </span>
              <span className="py-3 text-[#FF0000] text-[54px]">
                {price} VNĐ
              </span>
              <span className="text-[#161D25] text-center lg:text-left">
                Giá trên đã bao gồm phụ phí nhiên liệu, phí vùng sâu vùng xa và
                10% thuế VAT
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
