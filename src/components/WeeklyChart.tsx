import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { type HistoryData, type GoalsData } from "@/components/historyData";

export default function WeeklyChart({
  historyData,
  goalsData,
}: {
  historyData: HistoryData;
  goalsData: GoalsData;
}) {
  if (!historyData || !goalsData) {
    return null;
  }

  const days = Object.keys(historyData);

  const data = {
    labels: days,
    datasets: [
      {
        label: "Protein",
        data: days.map((day) => {
          return historyData[day]?.reduce(
            (total, item) => total + item.protein,
            0
          );
        }),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Carbs",
        data: days.map((day) => {
          return historyData[day]?.reduce(
            (total, item) => total + item.carbs,
            0
          );
        }),
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
      {
        label: "Fat",
        data: days.map((day) => {
          return historyData[day]?.reduce((total, item) => total + item.fat, 0);
        }),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Calories",
        data: days.map((day) => {
          return historyData[day]?.reduce(
            (total, item) => total + item.calories,
            0
          );
        }),
        fill: false,
        borderColor: "rgb(255, 205, 86)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
}
