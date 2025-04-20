import React from "react";
import bannerImage from "@/public/images/content.png";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const isDarkMode = false;
  return (
    <div className="relative flex items-center justify-center lg:h-[24.5rem] h-[26rem] w-full">
      <Image
        className="object-cover lg:h-[27rem] h-[26rem] w-full"
        src={bannerImage}
        alt=""
        placeholder="blur"
      />

      <div
        className={`absolute ${
          isDarkMode && "text-black"
        } lg:w-[60%] text-center flex items-center flex-col justify-center`}
      >
        <div>
          <h1 className="lg:text-5xl text-4xl font-semibold text-[#ff2727]">
            Madchef
          </h1>
          <p className={`lg:text-5xl text-4xl font-semibold`}>
            Crafting Flavor Magic
          </p>
        </div>
        <p className="text-sm mt-3 w-[80%]">
          Dive into a culinary journey where every dish tells a story, crafted
          with the freshest ingredients and a touch of innovation. Experience
          the art of flavor!
        </p>

        <Link href="/foods">
          <button
            className="bg-[#FF2727] text-white text-xs px-3 py-1.5 mt-3 rounded-full cursor-pointer
            active:scale-95 transition-all hover:scale-[1.05] duration-300"
          >
            See All Foods
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
