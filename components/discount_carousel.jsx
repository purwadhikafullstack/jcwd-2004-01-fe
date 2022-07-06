import React, { Component } from "react";
import Slider from "react-slick";
import HomeCategoryCard from "./home_category_card";
import ProductCard from "./ProductCard";
import NextArrowDiscount from "./nextArrowDiscount";
import PrevArrowDiscount from "./prevArrowDiscount";

// export default class PauseOnHover extends Component {
//   render() {}
// }

const DiscountCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrowDiscount />,
    prevArrow: <PrevArrowDiscount />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="ml-8 mr-8">
      <Slider {...settings}>
        <div className="py-8">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-8">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-8">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-8">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-8">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-8">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-8">
          <ProductCard variant={"discount"} />
        </div>
      </Slider>
    </div>
  );
};

export default DiscountCarousel;
