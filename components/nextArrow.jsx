import { IoIosArrowForward } from "react-icons/io";

const NextArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute top-11 right-0"
    >
      <IoIosArrowForward />
    </button>
  );
};

export default NextArrow;
