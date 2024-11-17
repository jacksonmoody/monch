"use client";
import { useState } from "react";
import { MacrosCard } from "@/components/MacrosCard";
import {
  type HistoryData,
  type GoalsData,
  HistoryCarousel,
} from "@/components/historyData";
import { titan } from "@/app/fonts";
import WeeklyChart from "./WeeklyChart";

interface DashboardProps {
  historyData: HistoryData;
  goalsData: GoalsData;
}

export default function Dashboard({ historyData, goalsData }: DashboardProps) {
  if (!historyData || !goalsData) {
    return null;
  }

  const days = Object.keys(historyData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentDay = days[currentIndex];

  // Calculate total macros for the selected day
  const totalMacros = historyData[currentDay]?.reduce(
    (totals, item) => {
      totals.protein += item.protein;
      totals.carbs += item.carbs;
      totals.fat += item.fat;
      totals.calories += item.calories;
      return totals;
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  );

  // Handler for changing the day
  const handleDayChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <h1 className={`text-4xl my-4 text-center ${titan.className}`}>
        Macro Goals
      </h1>
      <div className="flex flex-wrap gap-2 w-full justify-center">
        <MacrosCard
          type="protein"
          value={totalMacros.protein}
          unit="g"
          goals={goalsData.protein}
        />
        <MacrosCard
          type="carbs"
          value={totalMacros.carbs}
          unit="g"
          goals={goalsData.carbs}
        />
        <MacrosCard
          type="fat"
          value={totalMacros.fat}
          unit="g"
          goals={goalsData.fats}
        />
        <MacrosCard
          type="calories"
          value={totalMacros.calories}
          unit="kcal"
          goals={goalsData.calories}
        />
      </div>
      <div className="md:flex md:justify-around md:items-center">
        <HistoryCarousel
          data={historyData}
          currentIndex={currentIndex}
          onDayChange={handleDayChange}
        />
        <div className="md:w-1/3 w-full h-[60vh]">
          <WeeklyChart historyData={historyData} goalsData={goalsData} />
        </div>
      </div>
    </div>
  );
}
