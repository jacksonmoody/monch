"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MacrosCard } from "@/components/MacrosCard";
import Image from "next/image";
import avocado from "@/app/images/avocado.png";
import { titan } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { pinata } from "@/lib/config";
import FileUpload from "@/components/FileUpload";
import { NextResponse, type NextRequest } from "next/server";
import { HistoryCarousel, type HistoryData } from "../components/historyData";
import  Dashboard  from "../components/Dashboard";

interface FoodItem {
  name: string;
  image: string;
  protein: number;
  carbs: number;
  fat: number;
}

const getFile = async (userId: string, filename: string) => {
  try {
    const groupForUser = await pinata.groups.list().name(userId);
    if (groupForUser.length === 0) {
      return null;
    }
    const listedFilesByGroup = await pinata
      .listFiles()
      .group(groupForUser[0].id);
    const file = listedFilesByGroup.find(
      (f) => f.metadata.name === filename
    )?.ipfs_pin_hash;
    if (!file) {
      return null;
    } else {
      const returnFile = await pinata.gateways.get(file);
      return returnFile.data;
    }
  } catch (e) {
    console.error("API Error:", e);
  }
};

export default async function Page() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return redirect("/landing");
  }

  if (!user.publicMetadata?.isOnboarded) {
    return redirect("/onboarding");
  }

  let historyData = (await getFile(
    userId,
    "history.json"
  )) as unknown as HistoryData;

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
      <main className="flex flex-col items-center">
  {/*
  Dashboard Section - includes the macros cards and the history carousel
  */}
  <div className="w-full max-w-6xl mb-6">
    <Dashboard historyData={historyData} />
  </div>
  <div className="w-full max-w-6xl flex justify-center">
    <FileUpload userId={userId} />
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
