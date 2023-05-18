import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import ReplySingleComment from "./ReplySingleComment";

const Comment = ({ comment }) => {
  const [showIconOptions, setShowIconOptions] = useState(false);
  const [showOptionsBox, setShowOptionsBox] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const optionsIcon = useRef(null);
  const optionsBox = useRef(null);

  // Handle actions when user clicks outside of the options
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsBox.current &&
        !optionsBox.current.contains(event.target) &&
        optionsIcon.current &&
        !optionsIcon.current.contains(event.target)
      ) {
        setShowOptionsBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [optionsBox]);

  const handleDeleteComment = () => {
    console.log("handleDeleteComment");
  };

  const handleEditComment = () => {
    console.log("handleEditComment");
  };

  const handleReplyComment = () => {
    setShowReplyInput((prev) => !prev);
  };

  // Get last name of the commenter
  const getLastName = (name) => {
    const nameArr = name.split(" ");
    return nameArr[nameArr.length - 1].charAt(0).toUpperCase();
  };

  return (
    <div>
      <div
        className="w-full p-3 rounded-2xl bg-[#fff] shadow-md mt-4 flex"
        onMouseOver={() => setShowIconOptions(true)}
        onMouseLeave={() => setShowIconOptions(false)}
      >
        <div className="mr-4 flex">
          {comment.avatar ? (
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={comment.avatar}
                alt={comment.avatar}
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#ffd124] flex items-center justify-center">
              <span className="font-bold">{getLastName(comment.username)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="whitespace-pre-wrap break-words w-full">
            <span className="font-bold mb-1">{comment.username}</span>
            <p className="mb-0">{comment.message}</p>
          </div>

          <div className="relative select-none">
            <div className="w-8 flex justify-end">
              {showIconOptions && (
                <div ref={optionsIcon}>
                  <BsThreeDots
                    className="text-lg cursor-pointer"
                    onClick={() => setShowOptionsBox((prev) => !prev)}
                  />
                </div>
              )}
            </div>
            {showOptionsBox && (
              <div
                ref={optionsBox}
                className="rounded-md bg-[#ffd124] py-2  w-[200px] absolute -left-2/4 z-10 shadow-md"
              >
                <span
                  className="font-semibold cursor-pointer block leading-8 hover:opacity-70 px-4 transition-all"
                  onClick={handleEditComment}
                >
                  Sửa bình luận
                </span>
                <span
                  className="font-semibold cursor-pointer block leading-8 hover:opacity-70 px-4 transition-all"
                  onClick={handleDeleteComment}
                >
                  Xóa bình luận
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 px-4 mt-1">
        <span
          className="text-xs font-bold cursor-pointer"
          onClick={handleReplyComment}
        >
          Phản hồi
        </span>
        <span className="text-xs">{comment.createdAt}</span>
      </div>

      <div className="ml-12 mt-2">
        {showReplyInput && <ReplySingleComment username={comment.username} />}
        {/* Render replies */}
        {comment.replies?.length > 0 &&
          comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
      </div>
    </div>
  );
};

export default Comment;
