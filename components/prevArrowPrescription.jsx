import { IoIosArrowBack } from "react-icons/io";

const PrevArrowPrescription = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-full bg-white drop-shadow-lg text-lg absolute top-36 left-0 z-30"
    >
      <IoIosArrowBack />
    </button>
  );
};

export default PrevArrowPrescription;
