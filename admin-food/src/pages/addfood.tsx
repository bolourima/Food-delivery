import { Header } from "@/components/Header";
import React from "react";
import FormData from "form-data";
import { instance } from "@/utils/Axios";
import { AxiosRequestConfig } from "axios";

export default function AddFood() {
  const imageUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    const image = target.files as FileList;
    if (!image || image.length === 0) {
      return alert("Зураг байхгүй байна");
    }
    const formData = new FormData();
    formData.append("image", image[0]);

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await instance.post("/upload", formData, config);
      
    } catch (error) {
      alert("Зураг оруулахад алдаа үүслээ");
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full h-full pt-[10px] flex justify-center">
        <div className="w-[448px] h-[744px] p-[32px] flex flex-col gap-[48px]">
          <div className="w-[348px] flex justify-center">
            <p className="text-[#0D1118] font-bold text-[28px]">Хоол нэмэх</p>
          </div>
          <div className="flex flex-col gap-4">
            <form>
              <label className="font-normal text-sm">Хоолны нэр</label>
              <input
                className="w-[348px] h-[48px] pl-4 rounded-sm bg-[#F7F7F8]"
                type="text"
                placeholder="Хоолны нэр"
              />
            </form>
            <form>
              <label className="font-normal text-sm">Хоолны орц</label>
              <input
                className="w-[348px] h-[48px] pl-4 rounded-sm bg-[#F7F7F8]"
                type="email"
                placeholder="Ямар мах амтлагч зэрэг"
              />
            </form>
            <form>
              <label className="font-normal text-sm">Хоолны үнэ</label>
              <input
                className="w-[348px] h-[48px] pl-4 rounded-sm bg-[#F7F7F8]"
                type="password"
                placeholder="0"
              />
            </form>
            <form>
              <label>Хоолны зураг</label>
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                placeholder="Zurag"
                className="w-[348px] h-[32px] rounded-sm bg-[#F7F7F8]"
              />
            </form>
            <label>Категор сонгох</label>
            <select className="w-[348px] h-[48px] pl-4 rounded-sm bg-[#F7F7F8]">
              <option value="breakfast">Breakfast</option>
              <option value="maincourse">Main Course</option>
              <option value="dessert">Dessert</option>
              <option value="soup">Soup</option>
            </select>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <button
                type="submit"
                className="w-[348px] h-[48px] rounded-sm border bg-green-400 text-white"
                onClick={(e) => imageUpload(e)}
              >
                <p className="text-sm text-white">Нэмэх</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
