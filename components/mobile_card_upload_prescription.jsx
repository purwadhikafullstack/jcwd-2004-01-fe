import { IoIosArrowForward } from "react-icons/io";

const PrescriptionCard = () => {
  return (
    <div className="w-[327px] h-[87px] rounded-lg bg-white drop-shadow-lg">
      <div className="w-[99px] h-[87px]">
        <div className="bg-[#FFE3B7] w-[50px] h-[87px] absolute rounded-lg"></div>
        <img
          className="h-[87px] w-[99px] object-cover rounded-l-lg"
          src="PrescriptionBackground.svg"
          alt=""
        />
        <img
          className="absolute top-3 left-5"
          src="PrescriptionPaper.svg"
          alt=""
        />
      </div>
      <div className="text-[12px] font-bold w-[180px] absolute top-6 right-9">
        Unggah resep doktermu disini! foto tidak melebihi 10 MB
      </div>
      <button className="absolute top-9 right-3">
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default PrescriptionCard;
