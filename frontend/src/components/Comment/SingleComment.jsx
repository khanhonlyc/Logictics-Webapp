import React, { useRef, useState } from "react";

const SingleComment = ({ orderId, currentCustomer }) => {
  const [comment, setComment] = useState("");
  const inputRef = useRef(null);

  console.log(currentCustomer);

  const handleSubmit = (e) => {
    if (e.which === 13) {
      e.preventDefault();

      if (comment.trim() !== "") {
        console.log(comment);

        // Clear data
        inputRef.current.textContent = "";
        setComment("");
      }
    }
  };

  return (
    <div className="relative w-full p-3 mb-10 rounded-2xl bg-[#fff] shadow-md">
      <div
        contentEditable="true"
        className="select-text whitespace-pre-wrap break-words outline-none relative w-full z-10"
        role="textbox"
        onInput={(e) => setComment(e.target.textContent)}
        onKeyDown={handleSubmit}
        ref={inputRef}
      ></div>

      {comment === "" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pl-3 w-full text-[#b0b3b8] whitespace-nowrap overflow-x-hidden">
          Viết bình luận...
        </div>
      )}
    </div>
  );
};

export default SingleComment;
