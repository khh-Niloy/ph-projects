import axios from "axios";
import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PageTitle from "../Components/PageTitle";

const Gallery = () => {
  const [foodData, setfoodData] = useState([]);
  const [open, setopen] = useState(null);

  useEffect(() => {
    axios.get("https://madchef-server-side.vercel.app/allfood").then((data) => {
      setfoodData(data.data);
    });
  }, []);

  const slides = foodData.map((e) => ({ src: e.photo }));

  return (
    <div>
      <PageTitle
        image="https://img.freepik.com/free-photo/hand-cooking-mushrooms-pot_32991-2593.jpg?t=st=1735132689~exp=1735136289~hmac=07f2e8f7d6e6f573d2fc7421d1365390f3f7285dd26b1a764b5bd0a24d45a945&w=1380"
        text="Gallery"
        subtext="Discover a Vibrant Gallery of Culinary Masterpieces from Around the World"
      ></PageTitle>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5 w-[80%] mx-auto pt-10 pb-20">
        {foodData.map((e, index) => (
          <div>
            <div
              onClick={() => setopen(index)}
              className="card h-32 overflow-hidden hover:scale-105 duration-300"
            >
              <figure className="rounded-xl hover:scale-105 duration-300">
                <div
                  className="bg-gradient-to-t from-[#000000] to-[#00000055] opacity-0 hover:opacity-100 duration-300
                    absolute w-full h-full rounded-xl flex flex-col items-center justify-center"
                >
                  <h1 className="text-white text-sm font-semibold mb-2 duration-300">
                    {e.username}
                  </h1>

                  <div className="mx-5">
                    <h1 className="text-white text-[9px] font-semibold duration-300 line-clamp-3">
                      {e.foodname} :{" "}
                      <span className="font-normal">{e.description}</span>
                    </h1>
                  </div>
                </div>
                <img
                  className="rounded-xl object-cover"
                  src={e.photo}
                  alt="Shoes"
                />
              </figure>
            </div>
          </div>
        ))}
      </div>
      {open != null && (
        <Lightbox
          open={open != null}
          close={() => setopen(null)}
          slides={slides}
          index={open}
        />
      )}
    </div>
  );
};

export default Gallery;
