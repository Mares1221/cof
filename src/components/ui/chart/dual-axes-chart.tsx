"use client";

import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface DualAxesChartProps {
  title?: string;
  height?: string;
}

const DualAxesChart = ({
  title = undefined,
  height = "400px",
}: DualAxesChartProps) => {
  const chartRef = useRef<any>(null);

  const chartOptions: Highcharts.Options = {
    chart: {
      zooming: {
        type: "xy",
      },
    },
    title: {
      text: title,
      align: "left",
    },
    credits: {
      text: undefined,
    },
    xAxis: [
      {
        categories: [
          "1 сар",
          "2 сар",
          "3 сар",
          "4 сар",
          "5 сар",
          "6 сар",
          "7 сар",
          "8 сар",
          "9 сар",
          "10 сар",
          "11 сар",
          "12 сар",
        ],
        crosshair: true,
      },
    ],
    yAxis: [
      {
        labels: {
          format: "{value}",
        },
        title: {
          text: undefined,
        },
      },
      {
        title: undefined,
        labels: {
          format: undefined,
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      align: "left",
      verticalAlign: "top",
      backgroundColor: "rgba(255,255,255,0.25)",
    },
    series: [
      {
        name: "Санал хүсэлт гомдол",
        type: "column",
        yAxis: 1,
        data: [20, 5, 10, 50, 35, 18.9, 90, 40, 50, 6, 1, 30],
        tooltip: {
          valueSuffix: "",
        },
      },
      {
        name: "Шийдвэрлэсэн",
        type: "spline",
        data: [0, 0, 3, 30, 40, 2, 5, 1, 2, 0, 0, 90],
        tooltip: {
          valueSuffix: "",
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartRef}
          containerProps={{ className: `w-full h-[${height}]` }}
        />
      </div>
    </div>
  );
};

export default DualAxesChart;
