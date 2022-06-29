import { IoIosArrowForward } from "react-icons/io";

const NextArrowDiscount = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute top-40 -right-4"
    >
      <IoIosArrowForward />
    </button>
  );
};

export default NextArrowDiscount;
