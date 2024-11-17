"use client";
import React, { useState } from "react";
import { MacrosCard } from "@/components/MacrosCard";
import { HistoryCarousel } from "@/components/historyData";

interface FoodItem {
  name: string;
  image: string;
  protein: number;
  carbs: number;
  fat: number;
}

interface HistoryData {
  [key: string]: FoodItem[];
}

interface DashboardProps {
  historyData: HistoryData;
}

export default function Dashboard({ historyData }: DashboardProps) {
  const days = Object.keys(historyData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentDay = days[currentIndex];
  console.log("Current index:", currentIndex, "Current day:", currentDay);

  // Calculate total macros for the selected day
  const totalMacros = historyData[currentDay]?.reduce(
    (totals, item) => {
      totals.protein += item.protein;
      totals.carbs += item.carbs;
      totals.fat += item.fat;
      totals.calories += item.protein * 4 + item.carbs * 4 + item.fat * 9;
      return totals;
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  );

  // Handler for changing the day
  const handleDayChange = (newIndex: number) => {
    console.log("Changing to index:", newIndex);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="grid grid-cols-12 gap-4 max-w-6xl">
      <div className="col-span-3">
        <MacrosCard type="protein" value={totalMacros.protein} unit="g" goals={50} />
      </div>
      <div className="col-span-3">
        <MacrosCard type="carbs" value={totalMacros.carbs} unit="g" goals={150} />
      </div>
      <div className="col-span-3">
        <MacrosCard type="fat" value={totalMacros.fat} unit="g" goals={70} />
      </div>
      <div className="col-span-3">
        <MacrosCard type="calories" value={totalMacros.calories} unit="g" goals={2000} />
      </div>

      <div className="col-span-12 flex w-full justify-center">
        <HistoryCarousel
          data={historyData}
          currentIndex={currentIndex}
          onDayChange={handleDayChange}
        />
      </div>
    </div>
  );
}
