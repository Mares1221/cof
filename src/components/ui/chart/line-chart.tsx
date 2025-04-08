"use client";

import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface LineChartProps {
  title?: string;
  subtitle?: string;
  series?: Highcharts.SeriesOptionsType[];
  height?: string;
}

const LineChart = ({
  title = undefined,
  subtitle = undefined,
  series = [
    {
      type: "line",
      name: "Апп татсан",
      data: [
        16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2, 22.0, 17.8,
      ],
    },
    {
      type: "line",
      name: "Апп татаагүй",
      data: [
        -2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5, 2.0, -0.9,
      ],
    },
  ],
  height = "400px",
}: LineChartProps) => {
  const chartRef = useRef<any>(null);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "line",
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      categories: [
        "1 Сар",
        "2 Сар",
        "3 Сар",
        "4 Сар",
        "5 Сар",
        "6 Сар",
        "7 Сар",
        "8 Сар",
        "9 Сар",
        "10 Сар",
        "11 Сар",
        "12 Сар",
      ],
    },
    yAxis: {
      title: undefined,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: series,
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

export default LineChart;
