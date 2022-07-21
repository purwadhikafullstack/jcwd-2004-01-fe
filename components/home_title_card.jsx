import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const HomeTitleCard = () => {
  return (
    <div className="mt-10 w-[1244px] h-[226px] rounded-2xl bg-[#A7BFF4] drop-shadow-lg">
      <img
        className="absolute right-3 rounded-2xl"
        src="HomeTitleCardBackground1.svg"
        alt=""
      />
      <div className="h-[226px] w-[100px] absolute right-0 rounded-2xl bg-[#589EC1]"></div>
      <img className="absolute right-12" src="HomeTitleCardImage.svg" alt="" />
      <div className="text-[20px] font-bold pt-11 pl-20">
        Selamat Datang di Healthymed
      </div>
      <div className="text-[36px] font-bold pl-20 pt-2">
        APOTEK ONLINE TERPERCAYA
      </div>
      <div className="text-[18px] font-bold pl-20 pt-4">
        100% Asli Produk BPOM Uang Dijamin Kembali!
      </div>
      {/* <button className="p-3 rounded-full bg-white text-2xl absolute top-20 -left-6">
        <IoIosArrowBack />
      </button>
      <button className="p-3 rounded-full bg-white text-2xl absolute top-20 -right-6">
        <IoIosArrowForward />
      </button> */}
    </div>
  );
};

export default HomeTitleCard;
