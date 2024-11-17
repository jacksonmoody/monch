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
import { HistoryCarousel, type HistoryData } from "../components/historyData";

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

  const historyData = (await getFile(
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
      <main className="flex justify-center">
        <div className="grid grid-cols-12 gap-4 max-w-6xl">
          <div className="col-span-4">
            <MacrosCard type="protein" value={50} unit="g" />
          </div>
          <div className="col-span-4">
            <MacrosCard type="carbs" value={150} unit="g" />
          </div>
          <div className="col-span-4">
            <MacrosCard type="fat" value={30} unit="g" />
          </div>
          <div className="col-span-12 flex w-full justify-center">
            <div className="col-span-12 flex w-full justify-center">
              {historyData && <HistoryCarousel data={historyData} />}
            </div>
          </div>
          <div className="col-span-12 flex w-full justify-center">
            <FileUpload userId={userId} />
          </div>
        </div>
      </main>
      <footer className="w-full">
        <p className="text-center text-gray-400 text-xs pb-4 pt-8">
          Made by Pedro Garcia, Jackson Moody, Josh Zhang, and Josh Zhang
        </p>
      </footer>
    </>
  );
}
