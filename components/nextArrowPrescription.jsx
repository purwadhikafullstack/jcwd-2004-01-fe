import { IoIosArrowForward } from "react-icons/io";

const NextArrowPrescription = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-full bg-white drop-shadow-lg text-lg absolute top-36 right-0"
    >
      <IoIosArrowForward />
    </button>
  );
};

export default NextArrowPrescription;
