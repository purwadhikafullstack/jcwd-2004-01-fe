import Slider from "react-slick";
import HomeTitleCard from "./home_title_card";
import NextArrowTitle from "./nextArrowTitle";
import PrevArrowTitle from "./prevArrowTitle";

const TitleCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrowTitle />,
    prevArrow: <PrevArrowTitle />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <Slider {...settings}>
      <div className="pb-8">
        <HomeTitleCard />
      </div>
      <div className="pb-8">
        <HomeTitleCard />
      </div>
      <div className="pb-8">
        <HomeTitleCard />
      </div>
    </Slider>
  );
};

export default TitleCarousel;
