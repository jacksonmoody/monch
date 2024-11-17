"use client"
import { useState, useEffect} from 'react';
import React from 'react';
import { MacrosCard } from '../../components/MacrosCard';
import  HistoryTable  from '../../components/HistoryTable';
import { env } from "process";
import { pinata } from "@/utils/config";

export default function Home() {
    const [macros, setMacros] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchMacros = async () => {
            try {

                setLoading(true);
                const response = await fetch("/api/files/",
                {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setMacros(data);
                setLoading(false);
            } catch (e) {
                console.error(e);

            } finally {
                setLoading(false);
            }
        };
        console.log("you fetched");
        fetchMacros();
    }, []);
    console.log("Current macros state:", macros);

    if (loading) {
        return <div>Loading...</div>;
    }


  return (
    <main className="margin min-h-screen flex justify-center">

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
