import getAllFood from "@/lib/getAllFood";

const Gallery = async () => {
  const foods = await getAllFood();
  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="lg:text-3xl text-2xl font-semibold">
          Explore Our Food Gallery
        </h1>
        <p className="lg:text-sm text-xs text-center mt-2">
          Browse through a collection of mouth-watering dishes shared by our
          chefs and sellers
        </p>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5 w-[85%] mx-auto pt-10 pb-20">
        {foods.data.map((e, index) => (
          <div key={index}>
            <div className="card gl:h-32 sm:h-44 h-52 overflow-hidden hover:scale-105 duration-300 rounded-xl transition-transform">
              <figure className="rounded-xl hover:scale-105 h-full  duration-300">
                <div
                  className="bg-gradient-to-t from-[#000000] to-[#00000055] opacity-0 hover:opacity-100 duration-300
                    absolute w-full h-full rounded-xl flex flex-col items-center justify-center"
                >
                  <h1 className="text-white text-sm font-semibold mb-2 duration-300">
                    {e.foodname}
                  </h1>

                  <div className="mx-5">
                    <h1 className="text-white text-[9px] font-semibold duration-300 line-clamp-3">
                      {e.foodname} :{" "}
                      <span className="font-normal">{e.description}</span>
                    </h1>
                  </div>
                </div>
                <img
                  className="rounded-xl object-cover h-full w-full"
                  src={e.photo}
                  alt="Shoes"
                />
              </figure>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
