import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const TotalOnHoldCard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // ✅ Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // ✅ Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["On Hold"],
        datasets: [
          {
            label: "Total On Hold",
            data: [15], // <-- You can change this number dynamically if needed
            backgroundColor: "rgba(255, 206, 86, 0.6)", // light yellow shade
            borderRadius: 6,
            barThickness: 30,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: false },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 5 },
            grid: { display: false },
          },
        },
      },
    });

    // ✅ Cleanup chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-64 h-40 flex flex-col justify-between">
      <div>
        <h3 className="text-gray-700 text-base font-semibold">Total On Hold</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">15</p>
      </div>

      {/* Bar chart below number */}
      <div className="h-16">
        <canvas ref={chartRef} id="onHoldChart"></canvas>
      </div>
    </div>
  );
};

export default TotalOnHoldCard;
