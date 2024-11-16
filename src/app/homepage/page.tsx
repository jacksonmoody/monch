import React from 'react';
import { MacrosCard } from '../../components/MacrosCard';
import  HistoryTable  from '../../components/HistoryTable';
export default function Home() {
  return (
    <main className="min-h-screen flex justify-center">

      <div className="grid grid-cols-12 gap-4 max-w-6xl">
        <div className="col-span-12">
          <HistoryTable />
        </div>
        <div className="col-span-4">
          <MacrosCard type="protein" value={50} unit="g" />
        </div>
        <div className="col-span-4">
          <MacrosCard type="carbs" value={150} unit="g" />
        </div>
        <div className="col-span-4">
          <MacrosCard type="fat" value={30} unit="g" />
        </div>
      </div>
    </main>
  );
}
