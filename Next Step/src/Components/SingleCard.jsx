import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData, useLocation, useParams } from "react-router-dom";

const SingleCard = () => {
  const data = useLoaderData();
  const id = useParams();
  const singleCardData = data.find((e) => e.id === id.id);
  const [allComments, setallComments] = useState([]);
  const location = useLocation();

  function handleCommentInput(e) {
    e.preventDefault();

    const comment = e.target.comment.value;
    setallComments((prev) => [...prev, comment]);
    e.target.reset();
  }

  return (
    <>
      <Helmet>
        <title>
          {singleCardData.serviceName
            ? `${singleCardData.serviceName} | NextStep`
            : "Service Detailes | NextStep"}
        </title>
      </Helmet>

      <div className="lg:w-[95%] w-[95%] mx-auto pb-20">
        <div className="flex lg:flex-row flex-col items-start border border-black/10 rounded-2xl px-7 shadow-xl p-5  w-[80%] mx-auto mt-12 gap-5">
          <div className="lg:w-[40%]">
            <div className="w-full overflow-hidden rounded-lg">
              <img
                className="w-full object-cover scale-[1.7] overflow-hidden rounded-xl"
                src={singleCardData?.image}
                alt=""
              />
            </div>
          </div>
          <div className="lg:w-[60%]">
            <h1 className="text-xl font-semibold">
              {singleCardData?.serviceName}
            </h1>
            <h1 className="text-sm my-2">{singleCardData?.description}</h1>
            <hr className="pb-2" />
            <div className="flex flex-col gap-0.5">
              <h1 className="text-sm">
                {singleCardData?.category}-Based Program
              </h1>
              <h1 className="text-sm">{singleCardData?.pricing}</h1>
              <div className="flex lg:flex-row flex-col lg:items-center lg:gap-4 gap-0.5">
                <h1 className="text-sm">
                  Instructor: {singleCardData?.counselor}
                </h1>
                <h1 className="text-sm">Rating: {singleCardData?.rating}/5</h1>
                <h1 className="lg:text-xs text-sm">
                  Time: {singleCardData?.duration}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <h1 className="mt-20 font-bold text-2xl text-center">
          Please give your <span className="text-[#007CF5]">feedback</span>
        </h1>
        <form
          className="flex items-center justify-center flex-col"
          onSubmit={handleCommentInput}
        >
          <textarea
            name="comment"
            type="text"
            className="border border-black/10 rounded-xl w-[90%] 
            lg:w-[60%] resize-none p-4 focus:outline-[#007CF5]/20 mt-5"
            cols={60}
            rows={3}
          />
          <button
            type="submit"
            className="ml-3 px-5 py-1.5 bg-[#007CF5] text-white mt-3 shadow-xl rounded-full text-sm"
          >
            comment
          </button>
        </form>

        <div className="mt-10 w-[80%] mx-auto">
          <ul>
            {allComments.map((e) => (
              <li className="list-decimal">{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
