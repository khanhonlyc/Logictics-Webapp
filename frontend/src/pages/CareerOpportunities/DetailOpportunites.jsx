import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import InputDesktop from "../../components/InputDesktop/InputDesktop";
import RecruitForm from "../../components/RecruitForm/RecruitForm";
import Images from "../../utils/images";

import InputMobile from "../../components/InputMobile/InputMobile";
import {
  faCalendar,
  faCoins,
  faClock,
  faLocationDot,
  faPlane,
  faHeartPulse,
  faMugHot,
  faMoneyBillTrendUp,
  faPersonBreastfeeding,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { END_POINT } from "../../utils/constant";

const DetailOpportunites = () => {
  const [data, setData] = useState([]);
  const params = useParams();

  // const [api, setApi] = useState(`${END_POINT}/career?`);

  const [showSearch, setShowSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [key, setKey] = useState("");
  const [local, setLocal] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");

  const onChangeKey = (e) => {
    setKey(e.target.value);
  };

  const onLocation = (e) => {
    setLocal(e.target.value);
  };

  const onChnageType = (e) => {
    setType(e.target.value);
  };

  const onChangeState = (e) => {
    setState(e.target.value);
  };

  const getDataFromApi = async (api) => {
    try {
      const res = await axios({
        url: api,
        method: "get",
      });
      if (res.status === 200) {
        setDataSearch(res.data.data.career);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSearch = (e) => {
    if (
      key === "" &&
      (local === "" || local === "Tỉnh/Thành phố") &&
      (type === "" || type === "Ngành nghề") &&
      (state === "Chức vụ" || state === "")
    ) {
      setShowSearch(false);
    } else {
      let newApi = `${END_POINT}/career?`;
      if (key !== "") {
        newApi = `${newApi}&keyword=${key}`;
        console.log(key);
      }
      if (local !== "" && local !== "Tỉnh/Thành phố") {
        newApi = `${newApi}&location=${local}`;
      }
      if (type !== "" && type !== "Ngành nghề") {
        newApi = `${newApi}&type=${type}`;
      }
      if (state !== "Chức vụ" && state !== "") {
        newApi = `${newApi}&state=${state}`;
      }

      getDataFromApi(newApi);
      setShowSearch(true);
    }
  };

  const onSearchMB = () => {
    let newApi = `${END_POINT}/career?`;
    if (key !== "") {
      newApi = `${newApi}&keyword=${key}`;
      getDataFromApi(newApi);
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };
  const closeSearch = () => {
    setShowSearch(false);
  };

  console.log(params);
  useEffect(() => {
    console.log(params);
    const getData = async () => {
      const api = await axios.get(`${END_POINT}/career/${params.id}`);
      const { data } = api.data;
      console.log(data);
      setData(data);
    };
    getData();
  }, [params]);
  return (
    <div>
      <>
        <div className="relative">
          <img src={Images.TOP_BANNER} alt="banner" className="pt-[65px]" />
          <InputDesktop
            onSearch={onSearch}
            onChangeKey={onChangeKey}
            onChangeLocation={onLocation}
            onChangeState={onChangeState}
            onChangeType={onChnageType}
          />
          <InputMobile onSearch={onSearchMB} onChangeKey={onChangeKey} />
        </div>
        {showSearch && (
          <div className="mt-0 lg:mt-8 mx-[30px] lg:mx-[50px] text-2xl">
            {dataSearch && (
              <>
                {dataSearch.map((job, index) => (
                  <div
                    key={index}
                    className="border-[1px] rounded-r-xl before:content-['']  p-[16px] mb-[16px] overflow-hidden bg-[#f2f2f2] lg:hover:scale-105 duration-300"
                  >
                    <h4 className="text-[16px] sm:text-[18px] font-bold tracking-wider whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer">
                      {job.name}
                    </h4>
                    <p className="text-[16px] opacity-70 cursor-pointer truncate">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className=" pr-[16px]"
                      />
                      {job.location}
                    </p>
                    <div style={{ cursor: "pointer" }}>
                      <Link
                        onClick={closeSearch}
                        className="text-[14px] text-[#e5a663] tracking-wider flex items-center gap-2 font-bold"
                        to={`/tuyen-dung/${job._id}`}
                      >
                        XEM CHI TIẾT
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        <>
          <div className="m-auto px-[16px] lg:px-[30px]  mt-[30px]">
            <h2 className="text-[24px] lg:text-[32px] font-bold mb-6">
              {data?.name}
            </h2>
            <div className="gap-4 lg:grid lg:grid-cols-2 bg-[#f2f2f2]">
              <div className="p-4">
                <h4 className="text-[#e5a663] font-bold">
                  <FontAwesomeIcon className="mr-2" icon={faCalendar} />
                  Hạn nộp
                </h4>
                <p className="py-2 ml-5">{data?.deadline?.toString()}</p>
                <hr />
              </div>
              <div className="p-4">
                <h4 className="text-[#e5a663] font-bold">
                  <FontAwesomeIcon className="mr-2" icon={faCoins} />
                  Mức lương
                </h4>
                <p className="py-2 ml-5">{data?.bonus}</p>
                <hr />
              </div>
              <div className="p-4">
                <h4 className="text-[#e5a663] font-bold">
                  <FontAwesomeIcon className="mr-2" icon={faClock} />
                  Thời gian làm việc
                </h4>
                <p className="py-2 ml-5">
                  08:00 - 17:30, từ thứ 2 - thứ 6 | 08:00 - 12:00, thứ 7 <br />{" "}
                  Nghỉ trưa 12:00 - 13:30
                </p>
                <hr />
              </div>
              <div className="p-4">
                <h4 className="text-[#e5a663] font-bold">
                  <FontAwesomeIcon className="mr-2" icon={faLocationDot} />
                  Địa điểm làm việc
                </h4>
                <p className="py-2 ml-5">{data?.location}</p>
                <hr />
              </div>
            </div>

            <article className="tracking-wide">
              <h4 className="mt-8 mb-2 text-2xl font-bold">Phúc lợi của bạn</h4>
              <p>
                <FontAwesomeIcon
                  className="mr-2 text-[#e5a663]"
                  icon={faPlane}
                />
                Travel Trip & Teambuilding trip each year
              </p>
              <p>
                <FontAwesomeIcon
                  className="mr-2 text-[#e5a663]"
                  icon={faHeartPulse}
                />
                Annual Health check-up
              </p>
              <p>
                <FontAwesomeIcon
                  className="mr-2 text-[#e5a663]"
                  icon={faMugHot}
                />
                Tea break 3 times/week
              </p>
              <p>
                <FontAwesomeIcon
                  className="mr-2 text-[#e5a663]"
                  icon={faMoneyBillTrendUp}
                />
                Year bonus
              </p>
              <p>
                <FontAwesomeIcon
                  className="mr-2 text-[#e5a663]"
                  icon={faPersonBreastfeeding}
                />
                Rearing child allowance for female employees
              </p>
              <h4 className="mt-8 mb-2 text-2xl font-bold">Mô tả công việc</h4>
              <p> {data.description}</p>
            </article>
          </div>
          <div className="relative mb-[60px] mt-10 ">
            <img
              src={Images.BOTTOM_BANNER}
              alt="IMG"
              className="w-full h-[840px] lg:h-[790px]"
            />
            <RecruitForm id={data?._id} />
          </div>
        </>
      </>
    </div>
  );
};

export default DetailOpportunites;
