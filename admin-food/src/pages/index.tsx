import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import AddFood from "./addfood";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Header />

    </div>
  );
}
