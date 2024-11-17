"use client";
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

export function HistoryCarousel({ data }: { data: HistoryData }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel className="w-full relative">
        <CarouselContent>
          {Object.entries(data).map(([day, items]) => (
            <CarouselItem key={day} className="pl-4">
              <div className="p-6 w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">{day}</h2>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={`${day}-${index}`}
                      className="flex flex-col gap-3 p-6 border rounded-lg shadow-md bg-white"
                    >
                      <h3 className="font-semibold text-xl">{item.name}</h3>
                      <div className="grid grid-cols-3 gap-6 text-base">
                        <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                          <span className="font-medium text-blue-600">Protein</span>
                          <span>{item.protein}g</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                          <span className="font-medium text-green-600">Carbs</span>
                          <span>{item.carbs}g</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-yellow-50 rounded-lg">
                          <span className="font-medium text-yellow-600">Fat</span>
                          <span>{item.fat}g</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -left-4 top-1/2 -translate-y-1/2">
          <CarouselPrevious />
        </div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2">
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}