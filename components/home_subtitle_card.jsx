const HomeSubtitleCard = ({ imgSrc, title, text, color }) => {
  return (
    <div className={`w-[616px] h-[212px] rounded-2xl ${color} drop-shadow-lg`}>
      <img src={imgSrc} alt="" />
      <div className="absolute top-16 right-10">
        <div className="text-[24px] font-bold text-center">{title}</div>
        <div className="text-[16px] w-[250px] text-center">{text}</div>
      </div>
    </div>
  );
};

export default HomeSubtitleCard;
