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

const DiscountCarousel = () => {
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
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrowDiscount />,
    prevArrow: <PrevArrowDiscount />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="py-8">
      <Slider {...settings}>
        {products.map((val, index) => {
          return (
            <Link href={`/produk/${val.id}`}>
              <div className="hover:cursor-pointer">
                <ProductCardMap
                  key={index}
                  variant="discount"
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
        {/* <div className="py-8">
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
        </div> */}
      </Slider>
    </div>
  );
};

export default DiscountCarousel;
