"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import avocado from "@/app/images/avocado.png";
import { Button } from "@/components/ui/button";

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
  currentIndex: number;
  onDayChange: (newIndex: number) => void;
}

export function HistoryCarousel({ data, currentIndex, onDayChange }: HistoryCarouselProps) {
  const days = Object.keys(data);
  const currentDay = days[currentIndex];

  console.log("Rendering day:", currentDay, "with index:", currentIndex);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + days.length) % days.length;
    console.log("Previous clicked, new index:", newIndex);
    onDayChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % days.length;
    console.log("Next clicked, new index:", newIndex);
    onDayChange(newIndex);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <Carousel className="w-full relative">
        <CarouselContent>
          <CarouselItem key={currentDay}>
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">{currentDay}</h2>
              <div className="space-y-4">
                {data[currentDay]?.map((item, index) => (
                  <div
                    key={`${currentDay}-${index}`}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex justify-between items-start gap-8">
                      <div className="flex-shrink-0 w-48">
                        <Image
                          src={avocado}
                          alt={item.name}
                          width={800}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-4">{item.name}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-semibold">Protein:</span>
                            <span>{item.protein}g</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 font-semibold">Carbs:</span>
                            <span>{item.carbs}g</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-semibold">Fats:</span>
                            <span>{item.fat}g</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-600 font-semibold">Calories:</span>
                            <span>{(item.protein * 4) + (item.carbs * 4) + (item.fat * 9)} kCal</span>
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
        <Button
  onClick={handlePrevious}
  className="absolute -left-12 top-1/2 -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-md"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-8 h-8 text-gray-800"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
</Button>
<Button
  onClick={handleNext}
  className="absolute -right-12 top-1/2 -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-md"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-8 h-8 text-gray-800"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</Button>

      </Carousel>
    </div>
  );
}
