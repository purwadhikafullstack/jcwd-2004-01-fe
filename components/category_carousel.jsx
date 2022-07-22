import React, { Component } from "react";
import Slider from "react-slick";
import MobileCategoryCard from "./mobile_category_card";
import HomeCategoryCard from "./home_category_card";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import NextArrow from "./nextArrow";
import PrevArrow from "./prevArrow";
import Link from "next/link";

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
        <Link href="/products?page=0&search=&symptom=&type=&brand=&category=obat-obatan&orderName=asc&orderPrice=asc">
          <div className="px-5 py-1 hover:bg-blackPrimary hover:bg-opacity-10 rounded-2xl duration-300 hover:cursor-pointer">
            <HomeCategoryCard
              icon={<img src="Obat.svg" />}
              caption={"Obat-obatan"}
            />
          </div>
        </Link>
        <Link href="/products?page=0&search=&symptom=&type=&brand=&category=nutrisi&orderName=asc&orderPrice=asc">
          <div className="px-5 py-1 hover:bg-blackPrimary hover:bg-opacity-10 rounded-2xl duration-300 hover:cursor-pointer">
            <HomeCategoryCard
              icon={<img src="Nutrition.svg" />}
              caption={"Nutrisi"}
            />
          </div>
        </Link>
        <Link href="/products?page=0&search=&symptom=&type=&brand=&category=herbal&orderName=asc&orderPrice=asc">
          <div className="px-5 py-1 hover:bg-blackPrimary hover:bg-opacity-10 rounded-2xl duration-300 hover:cursor-pointer">
            <HomeCategoryCard
              icon={<img src="Herbal.svg" />}
              caption={"Herbal"}
            />
          </div>
        </Link>
        <Link href="/products?page=0&search=&symptom=&type=&brand=&category=vitamin%20%26%20suplemen&orderName=asc&orderPrice=asc">
          <div className="px-5 py-1 hover:bg-blackPrimary hover:bg-opacity-10 rounded-2xl duration-300 hover:cursor-pointer">
            <HomeCategoryCard
              icon={<img src="Vitamin.svg" />}
              caption={"Vitamin & Suplemen"}
            />
          </div>
        </Link>
        <Link href="/products?page=0&search=&symptom=&type=&brand=&category=alat%20kesehatan&orderName=asc&orderPrice=asc">
          <div className="px-5 py-1 hover:bg-blackPrimary hover:bg-opacity-10 rounded-2xl duration-300 hover:cursor-pointer">
            <HomeCategoryCard
              icon={<img src="Alat Kesehatan.svg" />}
              caption={"Alat Kesehatan"}
            />
          </div>
        </Link>
        <Link href="/products?page=0&search=&symptom=&type=&brand=&category=perawatan%20tubuh&orderName=asc&orderPrice=asc">
          <div className="px-5 py-1 hover:bg-blackPrimary hover:bg-opacity-10 rounded-2xl duration-300 hover:cursor-pointer">
            <HomeCategoryCard
              icon={<img src="Perawatan Tubuh.svg" />}
              caption={"Perawatan Tubuh"}
            />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
