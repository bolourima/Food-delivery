import React from "react";
import { SearchSvg } from "./svgimages/SearchSvg";
import { Sags } from "./svgimages/Sags";
import { HumanSvg } from "./svgimages/HumanSvg";
import { Logo } from "./svgimages/Logo";

export const Header = () => {
  return (
    <div className="flex items-center justify-between px-[115px] h-[57px]">
      <div className="flex items-center">
        <Logo />
        <div className="flex h-[41px] items-center w-[388px] justify-between pl-[24px]">
          <a href="/addfood" className="hover:text-[#18BA51] ml-[50px]">ХООЛ НЭМЭХ</a>
        </div>
      </div>
      <div className="flex items-center gap-[24px]">
        <div className="flex w-[260px] h-[40px] items-center gap-2 border-black border rounded-lg pl-4">
          <SearchSvg />
          <input type="text" placeholder="Хайх" />
        </div>
        <a href="/signin">
          <button className="flex gap-2">
            <HumanSvg />
            <p className="hover:text-[#18BA51] ">Нэвтрэх</p>
          </button>
        </a>
      </div>
    </div>
  );
};
