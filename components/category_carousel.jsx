import React, { Component } from "react";
import Slider from "react-slick";
import MobileCategoryCard from "./mobile_category_card";
import HomeCategoryCard from "./home_category_card";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import NextArrow from "./nextArrow";
import PrevArrow from "./prevArrow";

// export default class PauseOnHover extends Component {
//   render() {}
// }

const CategoryCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="ml-8 mr-8">
      <Slider {...settings}>
        <div className="px-5 py-1">
          <HomeCategoryCard
            icon={<img src="Obat.svg" />}
            caption={"Obat-obatan"}
          />
        </div>
        <div className="px-5 py-1">
          <HomeCategoryCard
            icon={<img src="Nutrition.svg" />}
            caption={"Nutrisi"}
          />
        </div>
        <div className="px-5 py-1">
          <HomeCategoryCard
            icon={<img src="Herbal.svg" />}
            caption={"Herbal"}
          />
        </div>
        <div className="px-5 py-1">
          <HomeCategoryCard
            icon={<img src="Vitamin.svg" />}
            caption={"Vitamin & Suplemen"}
          />
        </div>
        <div className="px-5 py-1">
          <HomeCategoryCard
            icon={<img src="Alat Kesehatan.svg" />}
            caption={"Alat Kesehatan"}
          />
        </div>
        <div className="px-5 py-1">
          <HomeCategoryCard
            icon={<img src="Perawatan Tubuh.svg" />}
            caption={"Perawatan Tubuh"}
          />
        </div>
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
