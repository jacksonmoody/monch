"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HistoryTable from "@/components/HistoryTable";
import { MacrosCard } from "@/components/MacrosCard";
import Image from "next/image";
import avocado from "@/app/images/avocado.png";
import { titan } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { pinata } from "@/lib/config";
import FileUpload from "@/components/FileUpload";
import { NextResponse, type NextRequest } from "next/server";
import { HistoryCarousel } from "../components/historyData";


const getHistory = async (userId : string) => {

  try {
    console.log("Getting history");
    console.log(userId);
    const response = await pinata.gateways.get("QmWtZSM1bGbpc1MWpN2ZSZFR4Cr9CemSmbqymyRDRb1Nby");
    const { data } = response;
    return NextResponse.json(data);
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export default async function Page() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return redirect("/landing");
  }

  const myHistory = await getHistory(userId);
  const historyData = await myHistory.json();

  return (
    <>
      <header className="bg-dark px-4 py-2 flex w-full items-center justify-between mb-5">
        <div
          className={`flex text-7xl text-light relative -top-1 ${titan.className}`}
        >
          <Image
            src={avocado}
            alt="Avocado"
            width="500"
            className="absolute left-16 top-2 w-16"
          />
          <h1>M</h1>
          <div className="w-16" />
          <h1 className="tracking-widest">NCH</h1>
        </div>
        <Button
          asChild
          size="lg"
          className={`text-white text-2xl uppercase ${titan.className}`}
        >
          <SignOutButton />
        </Button>
      </header>

      <main className="flex justify-center">
        <div>
        <p className="">Todays Goals:</p>
        </div>
        <div className="grid grid-cols-12 gap-4 max-w-6xl">

          <div className="col-span-3">

            <MacrosCard type="protein" value={50} unit="g" />
          </div>
          <div className="col-span-3">
            <MacrosCard type="carbs" value={150} unit="g" />
          </div>
          <div className="col-span-3">
            <MacrosCard type="fat" value={30} unit="g" />
          </div>
          <div className="col-span-3">
            <MacrosCard type="calories" value={30} unit="g" />
          </div>

          {/* dont remove*/}
          <div className="col-span-12 flex w-full justify-center">

          <div className="col-span-12 flex w-full justify-center">
            {myHistory && <HistoryCarousel data={historyData} />}
          </div>

          </div>
          <div className="col-span-12 flex w-full justify-center">
            <FileUpload userId={userId} />
          </div>
        </div>
      </main>
      <footer className="absolute bottom-0 w-full">
        <p className="text-center text-gray-400 text-xs py-4">
          Made by Pedro Garcia, Jackson Moody, Josh Zhang, and Josh Zhang
        </p>
      </footer>
    </>
  );
}
