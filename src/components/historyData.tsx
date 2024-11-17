"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import avocado from "@/app/images/avocado.png";

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

interface HistoryCarouselProps {
  data: HistoryData;
  onDayChange: (day: string) => void;
}

export function HistoryCarousel({ data, onDayChange }: HistoryCarouselProps) {
  // State to track the current selected day
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const days = Object.keys(data);

  // Get the current day based on the index
  const currentDay = days[currentDayIndex];

  // Handler for navigating to the previous day
  const handlePrevious = () => {
    const newIndex = (currentDayIndex - 1 + days.length) % days.length;
    setCurrentDayIndex(newIndex);
    onDayChange(days[newIndex]);
  };

  // Handler for navigating to the next day
  const handleNext = () => {
    const newIndex = (currentDayIndex + 1) % days.length;
    setCurrentDayIndex(newIndex);
    onDayChange(days[newIndex]);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Carousel className="w-full relative">
        <CarouselContent>
          <CarouselItem key={currentDay}>
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">{currentDay}</h2>
              <div className="space-y-4">
                {data[currentDay].map((item, index) => (
                  <div
                    key={`${currentDay}-${index}`}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex justify-between items-start gap-8">
                      <div className="flex-shrink-0 w-48">
                        <Image
                          src={avocado}
                          alt="Avocado"
                          width={800}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-4">{item.name}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-semibold text-lg">Protein:</span>
                            <span className="text-lg">{item.protein}g</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 font-semibold text-lg">Carbs:</span>
                            <span className="text-lg">{item.carbs}g</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-semibold text-lg">Fats:</span>
                            <span className="text-lg">{item.fat}g</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-600 font-semibold text-lg">Calories:</span>
                            <span className="text-lg">
                              {(item.protein * 4) + (item.carbs * 4) + (item.fat * 9)} kCal
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="absolute -left-4 top-1/2 -translate-y-1/2">
          <CarouselPrevious onClick={handlePrevious} />
        </div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2">
          <CarouselNext onClick={handleNext} />
        </div>
      </Carousel>
    </div>
  );
}
