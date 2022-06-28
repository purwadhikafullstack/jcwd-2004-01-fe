const HomeCard = ({ asset, title, description }) => {
  return (
    <div className="w-[405px] h-[181px] rounded-2xl bg-opacity-30 bg-[#808080] shadow-lg text-blackPrimary">
      <div className="flex items-center justify-center gap-3 relative">
        <div className="absolute left-10 top-10">{asset}</div>
        <div className="flex flex-col absolute w-[200px] top-10 right-12">
          <div className="text-[20px] font-bold">{title}</div>
          <div className="text-[14px] text-justify">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
