const MobileHomeCard = ({ asset, title, description }) => {
  return (
    <div className="container-mobile-home-card">
      <div className="flex items-center justify-center gap-3 p-4">
        <div className="text-6xl">{asset}</div>
        <div className="flex flex-col">
          <div className="text sm font-bold">{title}</div>
          <div className="text-xs text-justify">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default MobileHomeCard;
