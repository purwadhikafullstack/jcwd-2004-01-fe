import React, { Component } from "react";
import Slider from "react-slick";
import HomeCategoryCard from "./home_category_card";
import ProductCard from "./ProductCard";
import NextArrowDiscount from "./nextArrowDiscount";
import PrevArrowDiscount from "./prevArrowDiscount";
import API_URL from "../helpers/apiurl";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCardMap from "./ProductCardMap";
import Capitalize from "../lib/capitalize";
import { Rupiah } from "../lib/convertRupiah";
import Link from "next/link";

// export default class PauseOnHover extends Component {
//   render() {}
// }

const PopularCarousel = () => {
  const [products, setProducts] = useState([]);

  //Get Products Discount
  const getProductDiscount = async () => {
    let response = await axios.get(`${API_URL}/product/get-products-discount`);
    setProducts(response.data.productDiscount);
  };

  useEffect(() => {
    getProductDiscount();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
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
        {/* <div className="py-6">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-6">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-6">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-6">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-6">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-6">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-6">
          <ProductCard variant={"discount"} />
        </div>
        <div className="py-6">
          <ProductCard variant={"discount"} />
        </div> */}
        {products.map((val, index) => {
          return (
            <Link href={`/produk/${val.id}`} key={index}>
              <div className="hover:cursor-pointer pb-4">
                <ProductCardMap
                  key={index}
                  variant="popular"
                  title={Capitalize(val.name)}
                  formattedPrice={Rupiah(parseInt(val.price))}
                  unit={Capitalize(val.unit)}
                  imgsrc={
                    val.images.length
                      ? `${API_URL}${val.images[0]}`
                      : `${API_URL}/photos/defaultprofilepicture.png`
                  }
                  imgalt={val.name}
                />
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default PopularCarousel;
