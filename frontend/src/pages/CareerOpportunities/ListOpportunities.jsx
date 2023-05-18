import axios from "axios";
import React, { useEffect, useState } from "react";
import NewJob from "../../components/NewJob/NewJob";
import { END_POINT } from "../../utils/constant";
import bannerRecruit from "../../assets/images/banner-tuyển dụng.png";

const ListOpportunities = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const res = await axios({
          url: `${END_POINT}/career`,
          method: "get",
        });
        if (res.status === 200) {
          setData(res.data.data.career);
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDataFromApi();
  }, []);

  return (
    <div className="mx-10">
      <div className="relative" style={{ top: "35px" }}>
        <img src={bannerRecruit} alt="banner" />
      </div>

      <div className="mt-5 text-2xl lg:mt-44">
        <div
          className="block lg:flex justify-between gap-[100px]"
          style={{ marginTop: "50px" }}
        >
          <NewJob />
        </div>
      </div>
    </div>
  );
};

export default ListOpportunities;
