import React, { PureComponent } from "react";
import { Helmet } from "react-helmet-async";
import { MdPadding } from "react-icons/md";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function Statistics() {
  const laptop = [
    { product_id: "L001", product_title: "Dell XPS 13", price: 999 },
    {
      product_id: "L002",
      product_title: "Apple MacBook Pro 14-inch",
      price: 1999,
    },
    { product_id: "L003", product_title: "HP Spectre x360", price: 1250 },
    {
      product_id: "L004",
      product_title: "Lenovo ThinkPad X1 Carbon Gen 10",
      price: 1425,
    },
    { product_id: "L005", product_title: "Acer Swift 3", price: 750 },
    {
      product_id: "L006",
      product_title: "Microsoft Surface Laptop 4",
      price: 1100,
    },
    { product_id: "L007", product_title: "ASUS ZenBook 14", price: 900 },
  ];

  const phone = [
    {
      product_id: "P001",
      product_title: "Samsung Galaxy S23 Ultra",
      price: 1199,
    },
    {
      product_id: "P003",
      product_title: "Google Pixel 7 Pro",
      price: 899,
    },
    {
      product_id: "P004",
      product_title: "OnePlus 11",
      price: 799,
    },
  ];

  const accessories = [
    {
      product_id: "A001",
      product_title: "Apple AirPods Pro",
      price: 249,
    },
    {
      product_id: "A002",
      product_title: "Samsung Galaxy Buds 2",
      price: 149,
    },
    {
      product_id: "A003",
      product_title: "Anker PowerCore 20000mAh",
      price: 49,
    },
    {
      product_id: "A004",
      product_title: "Logitech MX Master 3 Mouse",
      price: 99,
    },
  ];

  const smartWatches = [
    {
      product_id: "SW001",
      product_title: "Apple Watch Series 8",
      price: 399,
    },
    {
      product_id: "SW002",
      product_title: "Samsung Galaxy Watch 5",
      price: 279,
    },
    {
      product_id: "SW003",
      product_title: "Fitbit Versa 3",
      price: 229,
    },
    {
      product_id: "SW004",
      product_title: "Garmin Venu 2",
      price: 399,
    },
  ];

  const macbook = [
    {
      product_id: "MB001",
      product_title: "MacBook Air M2",
      price: 999,
    },
    {
      product_id: "MB002",
      product_title: "MacBook Pro 14-inch M2",
      price: 1999,
    },
    {
      product_id: "MB003",
      product_title: "MacBook Pro 16-inch M2",
      price: 2499,
    },
  ];

  const iphone = [
    {
      product_id: "IP001",
      product_title: "iPhone 14",
      price: 799,
    },
    {
      product_id: "IP002",
      product_title: "iPhone 14 Pro",
      price: 999,
    },
    {
      product_id: "IP003",
      product_title: "iPhone 14 Pro Max",
      price: 1099,
    },
    {
      product_id: "IP004",
      product_title: "iPhone SE (3rd generation)",
      price: 429,
    },
  ];

  const chartPhones = phone.map((e) => ({
    name: e.product_title,
    price: e.price,
  }));

  const chartLaptop = laptop.map((e) => ({
    name: e.product_title,
    price: e.price,
  }));

  const chartaccessories = accessories.map((e) => ({
    name: e.product_title,
    price: e.price,
  }));

  const chartsmartWatches = smartWatches.map((e) => ({
    name: e.product_title,
    price: e.price,
  }));

  const chartmacbook = macbook.map((e) => ({
    name: e.product_title,
    price: e.price,
  }));

  const chartiphone = iphone.map((e) => ({
    name: e.product_title,
    price: e.price,
  }));

  return (
    <>
      <Helmet>
        <title>Statistics - Gadget Heaven</title>
      </Helmet>
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">Product Category Statistics</h1>
        <p className="text-sm font-light mt-2">
          Comprehensive Overview of Trends and Pricing Across All Categories
        </p>
      </div>

      {
        <div className="lg:w-[70%] w-[90%] py-20 mx-auto grid grid-cols-1 gap-10">
          <div className="border border-black/20 p-4 rounded-2xl">
            <h1 className="ml-3 mb-5 font-semibold">Laptop</h1>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                width={800}
                height={250}
                data={chartLaptop}
                margin={{
                  top: 20,
                  right: 80,
                  bottom: 45,
                  left: 20,
                }}
              >
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Product Name",
                    position: "insideBottomRight",
                    offset: 0,
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  tick={{ fontSize: 10 }}
                  angle={-15}
                  textAnchor="end"
                  scale="band"
                  dy={10}
                />
                <YAxis
                  label={{
                    value: "Price",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  style={{ fontSize: 10 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  fill="rgba(149, 56, 226, 0.30)"
                  stroke="#8884d8"
                />
                <Bar dataKey="price" barSize={20} fill="#9538E2" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="border border-black/20 p-4 rounded-2xl ">
            <h1 className="ml-3 mb-5 font-semibold">Phones</h1>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                width={800}
                height={250}
                data={chartPhones}
                margin={{
                  top: 20,
                  right: 80,
                  bottom: 45,
                  left: 20,
                }}
              >
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Product Name",
                    position: "insideBottomRight",
                    offset: 0,
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  tick={{ fontSize: 10 }}
                  textAnchor="middle"
                  scale="band"
                  dy={10}
                />
                <YAxis
                  label={{
                    value: "Price",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  style={{ fontSize: 10 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  fill="rgba(149, 56, 226, 0.30)"
                  stroke="#8884d8"
                />
                <Bar dataKey="price" barSize={20} fill="#9538E2" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="border border-black/20 p-4 rounded-2xl ">
            <h1 className="ml-3 mb-5 font-semibold">Accessories</h1>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                width={800}
                height={250}
                data={chartaccessories}
                margin={{
                  top: 20,
                  right: 80,
                  bottom: 45,
                  left: 20,
                }}
              >
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Product Name",
                    position: "insideBottomRight",
                    offset: 0,
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  tick={{ fontSize: 10 }}
                  angle={-15}
                  textAnchor="middle"
                  scale="band"
                  dy={10}
                />
                <YAxis
                  label={{
                    value: "Price",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  style={{ fontSize: 10 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  fill="rgba(149, 56, 226, 0.30)"
                  stroke="#8884d8"
                />
                <Bar dataKey="price" barSize={20} fill="#9538E2" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="border border-black/20 p-4 rounded-2xl ">
            <h1 className="ml-3 mb-5 font-semibold">Smart Watches</h1>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                width={800}
                height={250}
                data={chartsmartWatches}
                margin={{
                  top: 20,
                  right: 80,
                  bottom: 45,
                  left: 20,
                }}
              >
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Product Name",
                    position: "insideBottomRight",
                    offset: 0,
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  tick={{ fontSize: 10 }}
                  angle={-15}
                  textAnchor="middle"
                  scale="band"
                  dy={10}
                />
                <YAxis
                  label={{
                    value: "Price",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  style={{ fontSize: 10 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  fill="rgba(149, 56, 226, 0.30)"
                  stroke="#8884d8"
                />
                <Bar dataKey="price" barSize={20} fill="#9538E2" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="border border-black/20 p-4 rounded-2xl ">
            <h1 className="ml-3 mb-5 font-semibold">Macbook</h1>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                width={800}
                height={250}
                data={chartmacbook}
                margin={{
                  top: 20,
                  right: 80,
                  bottom: 45,
                  left: 20,
                }}
              >
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Product Name",
                    position: "insideBottomRight",
                    offset: 0,
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  tick={{ fontSize: 10 }}
                  angle={-15}
                  textAnchor="middle"
                  scale="band"
                  dy={10}
                />
                <YAxis
                  label={{
                    value: "Price",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  style={{ fontSize: 10 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  fill="rgba(149, 56, 226, 0.30)"
                  stroke="#8884d8"
                />
                <Bar dataKey="price" barSize={20} fill="#9538E2" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="border border-black/20 p-4 rounded-2xl ">
            <h1 className="ml-3 mb-5 font-semibold">iphone</h1>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                width={800}
                height={250}
                data={chartiphone}
                margin={{
                  top: 20,
                  right: 80,
                  bottom: 45,
                  left: 20,
                }}
              >
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Product Name",
                    position: "insideBottomRight",
                    offset: 0,
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  tick={{ fontSize: 10 }}
                  angle={-15}
                  textAnchor="middle"
                  scale="band"
                  dy={10}
                />
                <YAxis
                  label={{
                    value: "Price",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fontSize: "10px",
                    },
                  }}
                  style={{ fontSize: 10 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  fill="rgba(149, 56, 226, 0.30)"
                  stroke="#8884d8"
                />
                <Bar dataKey="price" barSize={20} fill="#9538E2" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      }
    </>
  );
}
