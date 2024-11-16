import Image from "next/image";
import logo from "@/app/images/logo.png";

export default function Landing() {
  return (
    <div className="flex w-full items-center bg-white h-screen text-background">
      <div className="m-auto">
        <Image src={logo} alt="Monch" />
        <h1 className="text-4xl font-bold">Welcome to Monch</h1>
        <p className="text-lg">The best place to find your favorite recipes</p>
      </div>
    </div>
  );
}
