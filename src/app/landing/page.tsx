import Image from "next/image";
import avocado from "@/app/images/avocado.png";
import { titan } from "@/app/fonts";

export default function Landing() {
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen bg-light">
      <div className="relative -top-20">
        <div className={titan.className}>
          <h2 className="text-center text-3xl">Introducing...</h2>
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
          <p className="text-2xl font-extrabold text-secondary pt-10">
            Macro Tracking Made Easy
          </p>
        </div>
      </div>
    </div>
  );
}
