import { IoIosArrowForward } from "react-icons/io";

const NextArrowTitle = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute top-32 -right-5"
    >
      <IoIosArrowForward />
    </button>
  );
};

export default NextArrowTitle;
