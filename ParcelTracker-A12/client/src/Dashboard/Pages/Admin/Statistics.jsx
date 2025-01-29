import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = [], refetch } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const data = await axiosSecure.get("/stats");
      return data.data;
    },
  });

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      title: {
        text: "Bookings by Date",
        align: "center",
        style: {
          fontSize: "15px",
          fontWeight: "semibold",
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: "Dates",
          style: {
            fontSize: "12px",
            fontWeight: "semibold",
          },
        },
      },
      yaxis: {
        title: {
          text: "Number of Bookings",
          style: {
            fontSize: "12px",
            fontWeight: "semibold",
          },
        },
      },
      colors: ["#008FFB"],
      dataLabels: {
        enabled: true,
      },
      grid: {
        show: true,
      },
    },
  });

  useEffect(() => {
    if (stats.length > 0) {
      setChartData({
        series: [
          {
            name: "Bookings",
            data: stats.map((e) => e.count),
          },
        ],
        options: {
          ...chartData.options,
          xaxis: {
            ...chartData.options.xaxis,
            categories: stats.map((e) => e.date),
          },
        },
      });
    }
  }, [stats]);

  return (
    <div className="p-5">
      <div className="text-centers">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Booking Statistics
        </h1>
        <p className="text-gray-600 pb-10 text-center">
          View and analyze all bookings by date effortlessly.
        </p>
      </div>

      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};
export default Statistics;
