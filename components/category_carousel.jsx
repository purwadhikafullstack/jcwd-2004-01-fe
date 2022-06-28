import React, { Component } from "react";
import Slider from "react-slick";
import MobileCategoryCard from "./mobile_category_card";

// export default class PauseOnHover extends Component {
//   render() {}
// }

const CategoryCarousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <MobileCategoryCard
            icon={<img src="PrescriptionPaper.svg" />}
            caption={"Hello There"}
          />
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <MobileCategoryCard
            icon={<img src="PrescriptionPaper.svg" />}
            caption={"Hello There"}
          />
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <MobileCategoryCard
            icon={<img src="PrescriptionPaper.svg" />}
            caption={"Hello There"}
          />
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
