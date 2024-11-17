import { currentUser } from "@clerk/nextjs/server";
import { titan } from "@/app/fonts";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import avocado from "@/app/images/avocado.png";
import { pinata } from "@/lib/config";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();
  const userId = user!.id;

  async function submit(formData: FormData) {
    "use server";
    const calories = formData.get("calories") as string;
    const carbs = formData.get("carbs") as string;
    const protein = formData.get("protein") as string;
    const fats = formData.get("fats") as string;
    const goals = { calories, carbs, protein, fats };

    const existingGroup = await pinata.groups.list().name(userId);

    let groupId = "";
    if (existingGroup.length === 0) {
      const newGroup = await pinata.groups.create({
        name: userId,
      });
      groupId = newGroup.id;
    } else {
      groupId = existingGroup[0].id;
    }

    const uploadedFile = await pinata.upload.json(goals).addMetadata({
      name: "goals.json",
    });

    await pinata.groups.addCids({
      groupId: groupId,
      cids: [uploadedFile.IpfsHash],
    });

    const clerk = await clerkClient();

    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        isOnboarded: true,
      },
    });

    redirect("/");
  }
  return (
    <div className="flex max-w-full h-screen justify-center items-center">
      <main className="max-w-lg rounded-xl border-neutral-400 bg-white shadow-md p-5 flex flex-col justify-center items-center w-full">
        <Image src={avocado} alt="Avocado" width="100" className="w-25" />
        <h1 className={`text-center text-3xl ${titan.className}`}>
          Welcome to Monch,{" "}
          {user?.firstName
            ? user.firstName
            : user?.primaryEmailAddress?.emailAddress}
          !
        </h1>
        <p className="font-bold py-5">
          Let&apos;s get started by setting some daily macro goals:
        </p>
        <form className="w-full" action={submit}>
          <label
            htmlFor="calories"
            className="block text-sm font-light text-neutral-900"
          >
            Calories:
          </label>
          <Input
            id="calories"
            name="calories"
            type="number"
            className="my-2 block w-full"
            placeholder="2000"
            required
          />
          <label
            htmlFor="carbs"
            className="block text-sm font-light text-neutral-900"
          >
            Carbohydrates (g):
          </label>
          <Input
            id="carbs"
            name="carbs"
            type="number"
            className="my-2 block w-full"
            placeholder="250"
            required
          />
          <label
            htmlFor="protein"
            className="block text-sm font-light text-neutral-900"
          >
            Protein (g):
          </label>
          <Input
            id="protein"
            name="protein"
            type="number"
            className="mt-1 block w-full"
            placeholder="50"
            required
          />
          <label
            htmlFor="fats"
            className="block text-sm font-light text-neutral-900 mt-2"
          >
            Fats (g):
          </label>
          <Input
            id="fats"
            name="fats"
            type="number"
            className="mt-1 block w-full"
            placeholder="50"
            required
          />
          <Button
            type="submit"
            size="lg"
            className="mt-5 w-full text-white bg-primary"
          >
            Save Goals
          </Button>
        </form>
      </main>
    </div>
  );
}
