"use client";

import React, { useEffect, useState } from "react";

const ImageShow = () => {
  const images = [
    [
      "https://img.freepik.com/free-photo/mixed-pizza-with-various-ingridients_140725-3790.jpg?t=st=1745184583~exp=1745188183~hmac=f5f980c47d7d85822fe4007b4e65148a4e8b7a64fd28de771645a6450e39a5b4&w=1380",
      "https://img.freepik.com/free-photo/pre-prepared-food-showcasing-ready-eat-delicious-meals-go_23-2151431659.jpg?t=st=1745184625~exp=1745188225~hmac=4d8bdb68b5553408eba8298f993c005132782b31d68dae9105a14405c6a4a5d0&w=1380",
    ],
    [
      "https://img.freepik.com/free-photo/top-view-chicken-pizza-with-yellow-cherry-tomatoes-bell-pepper-board_141793-3972.jpg?t=st=1745175349~exp=1745178949~hmac=a4d2ea0fc24e08595676a229bcf2f4bf38a1132290fda3ca3dc876e689f264cf&w=1380",
      "https://img.freepik.com/free-photo/side-view-cheesecake-with-cherry-jelly-top-white-plate_141793-2955.jpg?t=st=1745184689~exp=1745188289~hmac=29a53c27520bca2f7b90403cc7a41e6599b85b92053e272b5f32b64b252bcc45&w=1380",
    ],
    [
      "https://img.freepik.com/free-photo/delicious-goulash-ready-dinner_23-2149370898.jpg?t=st=1745184742~exp=1745188342~hmac=5df8837541e3dfc52b8af726ddba4dd0c374b08dbb72448226630346cc760202&w=1380",
      "https://img.freepik.com/free-photo/curry-with-chicken-onions-indian-food-asian-cuisine_2829-4415.jpg?t=st=1745184802~exp=1745188402~hmac=c1cb2752d7ec1364978eedb9a8b9066003995ba276298323282551d47716e00f&w=1060",
    ],
    [
      "https://img.freepik.com/free-photo/top-view-delicious-fish-meal_23-2148734691.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/green-curry-with-eggs-black-cups-with-lemon-lemongrass-chili-tomatoes_1150-25741.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
    ],
    [
      "https://img.freepik.com/free-photo/chicken-fajita-chicken-fillet-fried-with-bell-pepper-lavash-with-bread-slices-white-plate_23-2149141361.jpg",
      "https://img.freepik.com/free-photo/grilled-shrimp-salad_181624-959.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
    ],
    [
      "https://img.freepik.com/free-photo/side-view-rice-garnish-with-fried-onion-carrot-greens-chili-pepper-table_141793-5069.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/delicious-cooked-salmon-fish_23-2148708707.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
    ],
    [
      "https://img.freepik.com/free-photo/top-view-delicious-mahi-mahi-fish-with-lemon_23-2150457363.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/baked-salmon-fish-fillet-with-tomatoes-mushrooms-spices-diet-menu_2829-14440.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
    ],
    [
      "https://img.freepik.com/free-photo/side-view-chicken-kebab-with-red-onion-greens-dried-barberry-pita_141793-4838.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/top-view-fast-food-plate-chicken-with-lemon-herbs-plate-bowls-french-fries-black-pepper-sauces-dark-table_140725-117510.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
    ],
    [
      "https://img.freepik.com/free-photo/vegetables-near-fried-chicken_23-2147765472.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/cocktail-ice-mint-leaf-culinary-drink-mojito-lime-alcohol-freshness-generated-by-artificial-intelligence_188544-110589.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
    ],
    [
      "https://img.freepik.com/free-photo/red-iced-cocktail-table_140725-9712.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
      "https://img.freepik.com/free-photo/glass-summer-cocktail-with-lemon_140725-167.jpg?uid=R24227453&ga=GA1.1.1730875550.1729278475&semt=ais_hybrid&w=740",
    ],
    [
      "https://img.freepik.com/free-photo/margarita-pizza-with-tomato-olive-basil-top-view_141793-2381.jpg?t=st=1734794330~exp=1734797930~hmac=a89434674ccb82e68af71c7e840ba0fdc5cc1f8a28deee8524bfd81eefb904c0&w=900",
    ],
  ];

  const intervals = [5000, 10000, 15000, 25000, 8000];

  const [indexes, setIndexes] = useState([0, 0, 0, 0, 0]);
  const [fadeStates, setFadeStates] = useState([true, true, true, true, true]);

  useEffect(() => {
    const timers = images.map((_, i) => {
      return setInterval(() => {
        setFadeStates((prev) => {
          const copy = [...prev];
          copy[i] = false;
          return copy;
        });

        setTimeout(() => {
          setIndexes((prev) => {
            const newIndexes = [...prev];
            newIndexes[i] = (newIndexes[i] + 1) % images[i].length;
            return newIndexes;
          });

          setFadeStates((prev) => {
            const copy = [...prev];
            copy[i] = true;
            return copy;
          });
        }, 500);
      }, intervals[i]);
    });

    return () => timers.forEach(clearInterval);
  }, []);

  const transitionClass = (fade) =>
    `${
      fade ? "opacity-100" : "opacity-0"
    } transition-all duration-300 ease-in-out`;
  return (
    <div>
      <div className="col-span-5 rounded-l-2xl overflow-hidden">
        <div className="grid grid-cols-6 grid-rows-6 gap-2">
          <div
            className={`col-span-3 row-span-4 w-full h-full rounded-xl shadow-md ${transitionClass(
              fadeStates[0]
            )}`}
          >
            <img
              src={images[0][indexes[0]]}
              alt="img1"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>

          <div
            className={`col-span-3 row-span-2 w-full h-full rounded-xl shadow-md ${transitionClass(
              fadeStates[1]
            )}`}
          >
            <img
              src={images[1][indexes[1]]}
              alt="img2"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>

          <div
            className={`col-span-3 row-span-2 w-full h-full rounded-xl shadow-sm ${transitionClass(
              fadeStates[2]
            )}`}
          >
            <img
              src={images[2][indexes[2]]}
              alt="img3"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>

          <div
            className={`col-span-2 row-span-2 w-full h-full rounded-xl shadow-sm ${transitionClass(
              fadeStates[3]
            )}`}
          >
            <img
              src={images[3][indexes[3]]}
              alt="img4"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>

          <div
            className={`col-span-4 row-span-2 bg-cover bg-center w-full rounded-xl shadow-sm ${transitionClass(
              fadeStates[4]
            )}`}
            style={{ backgroundImage: `url(${images[4][indexes[4]]})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ImageShow;
