import React from "react";

const TopSelling = ({ data }) => {
  console.log(data);
  const grid = data.slice(0, 4);
  console.log(grid);
  return (
    <div className="grid sm:grid-cols-4 grid-cols-1 gap-2 sm:gap-0 w-full mx-auto">
      {grid.map((e) => (
        <div className="w-full h-[13rem]">
          <img
            className="w-full hover:scale-[1.1] hover:rounded-xl duration-300 object-cover h-[13rem]"
            src={e.image}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default TopSelling;
