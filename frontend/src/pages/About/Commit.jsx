import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

function Commit() {
  const { setMetadata, aboutUs, fetchAboutUs } = useContext(MainContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Cam kết | TKTL",
      };
    });

    const fetchApi = async () => {
      try {
        const res = await axios.get(`${END_POINT}/commitment`);
        res.status === 200 && setData(res.data.data.commits);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchApi();
    fetchAboutUs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMetadata]);

  console.log(data);

  return (
    <div className="mx-auto">
      {aboutUs.banners && (
        <img
          src={`${END_POINT}/public/${aboutUs.banners[0]}`}
          alt="banner"
          className="w-full h-[200px] md:h-[300px] lg:h-[550px] object-cover"
        />
      )}
      <div className="flex flex-col lg:flex-row mx-4 lg:mx-0 gap-x-4 my-10">
        <div className="flex-1 container mx-auto">
          <div>
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/dd-about-us.png"
              className="w-[76px] h-[63px] hidden lg:block"
              alt="logo"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 gap-x-4 mt-8 mb-4 rounded-2xl">
            {data?.map((commit) => (
              <div
                key={commit._id}
                className="p-3 bg-[#F0B90B] even:bg-opacity-40 lg:min-h-[350px] rounded-xl"
              >
                <img
                  src={`${END_POINT}/public/${commit.logo}`}
                  className="mb-7"
                  alt="logo"
                />
                <div className="uppercase text-lg font-black my-3 text-teal-600 ">
                  {commit.heading}
                </div>
                <div className="whitespace-pre-line">{commit.detail}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/dd-about-us.png"
              className="w-[76px] h-[63px] hidden lg:block rotate-180"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commit;
