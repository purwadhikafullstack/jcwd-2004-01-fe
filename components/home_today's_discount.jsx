import DiscountCarousel from "./discount_carousel";

const HomeDiscount = () => {
  return (
    <div className="w-full mx-auto">
      <div className="w-[1244px] h-[395px] rounded-2xl">
        <div className="w-[301px] h-[395px] bg-pink-500 rounded-2xl relative -z-0">
          <img className="absolute bottom-0" src="/DiskonHariIni.svg" alt="" />
        </div>
        <div className="h-[395px] w-[1070px] absolute top-0 right-0 z-10">
          <DiscountCarousel />
        </div>
        <img className="absolute -top-20" src="Ellipse.svg" alt="" />
      </div>
    </div>
  );
};

export default HomeDiscount;
