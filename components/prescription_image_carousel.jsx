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

const PrescriptionImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="">
      <Slider {...settings}>
        <div>1</div>
      </Slider>
    </div>
  );
};

export default PrescriptionImageCarousel;
