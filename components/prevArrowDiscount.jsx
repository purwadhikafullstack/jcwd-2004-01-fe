import { IoIosArrowBack } from "react-icons/io";

const PrevArrowDiscount = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute top-40 -left-4 z-10 hidden"
    >
      <IoIosArrowBack />
    </button>
  );
};

export default PrevArrowDiscount;
