import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HistoryTable from "@/components/HistoryTable";
import { MacrosCard } from "@/components/MacrosCard";
import Image from "next/image";
import avocado from "@/app/images/avocado.png";
import { titan } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import FileUpload from "@/components/FileUpload";

export default async function Page() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return redirect("/landing");
  }

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
          <div className="col-span-12">
            <HistoryTable />
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
