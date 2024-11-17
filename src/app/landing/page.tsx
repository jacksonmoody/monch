import Image from "next/image";
import avocado from "@/app/images/avocado.png";
import { titan } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen">
      <div className={titan.className}>
        <div className="flex md:text-[12rem] text-8xl text-primary relative">
          <Image
            src={avocado}
            alt="Avocado"
            width="500"
            className="absolute md:left-40 md:top-12 left-20 top-6 animate-bounce md:w-44 w-24"
          />
          <h1>M</h1>
          <div className="md:w-40 w-24" />
          <h1 className="tracking-widest">NCH</h1>
        </div>
      </div>
      <div className="text-center">
        <p className="text-3xl font-extrabold text-secondary pt-10">
          Macro Tracking Made Easy
        </p>
        <Button
          asChild
          size="lg"
          className={`text-white mt-10 p-8 text-2xl ${titan.className}`}
        >
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
