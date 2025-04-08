"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useRef } from "react";

const PieChart = () => {
  const chartRef = useRef<any>(null);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: undefined,
    tooltip: {
      valueSuffix: "%",
    },
    subtitle: undefined,
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Төлбөр тооцоо",
        type: "pie",
        // colorByPoint: true,
        data: [
          { name: "Төлбөр төлсөн", y: 55.02 },
          { name: "Төлбөр төлөөгүй", y: 45.5 },
        ],
      },
    ],
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartRef}
          containerProps={{ className: "w-full h-[400px]" }}
        />
      </div>
    </div>
  );
};

export default PieChart;
