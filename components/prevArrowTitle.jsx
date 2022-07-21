import { IoIosArrowBack } from "react-icons/io";

const PrevArrowTitle = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute top-32 -left-5 z-10"
    >
      <IoIosArrowBack />
    </button>
  );
};

export default PrevArrowTitle;
