import { IoIosArrowBack } from "react-icons/io";

const PrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute top-11 left-0 z-10"
    >
      <IoIosArrowBack />
    </button>
  );
};

export default PrevArrow;
