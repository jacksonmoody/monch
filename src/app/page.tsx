import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HistoryTable from "@/components/HistoryTable";
import { MacrosCard } from "@/components/MacrosCard";

export default async function Page() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return redirect("/landing");
  }

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
