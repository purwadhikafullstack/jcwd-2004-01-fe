const HomeCategoryCard = ({ icon, caption }) => {
  return (
    <div className="w-[195px] h-[119px] rounded-2xl bg-white drop-shadow-lg flex flex-col items-center justify-center space-y-1 text-blackPrimary;">
      <div className="text-4xl">{icon}</div>
      <div className="font-bold text-[16px]">{caption}</div>
    </div>
  );
};

export default HomeCategoryCard;
