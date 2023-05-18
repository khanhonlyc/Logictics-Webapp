import { AiOutlineUp } from "react-icons/ai";
import { useState, useEffect } from "react";
function ScrollOnTop() {
  const onTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [onTop, setOnTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      // setTop();
      if (window.scrollY > 300) {
        setOnTop(true);
      } else setOnTop(false);
    });
  }, []);
  return (
    <div
      onClick={onTopHandler}
      className={`${
        onTop ? "opacity-100" : "opacity-0"
      } fixed right-[24px] bottom-[2%] z-[100] w-[50px] h-[50px] bg-white border border-[#454F5B] rounded-[2px] flex justify-center items-center cursor-pointer`}
    >
      <AiOutlineUp />
    </div>
  );
}

export default ScrollOnTop;
