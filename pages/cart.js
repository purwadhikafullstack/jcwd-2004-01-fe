import { Button, Checkbox, CheckboxGroup, Divider } from "@chakra-ui/react";
import MobileHeader from "../components/mobile_header";
import SearchBar from "../components/searchbar";
import useUser from "../hooks/useUser";
import useCart from "../hooks/useCart";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import {
  IoNotificationsSharp,
  IoChatbubbleEllipsesSharp,
  IoShareSocialSharp,
} from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import CardCart from "../components/CardCart";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import API_URL from "../helpers/apiurl";
import { useState } from "react";
import Rupiah from "../lib/convertRupiah";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard";
import Footer from "../components/footer";
import { getCartAction } from "../redux/actions/cart_action";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Cart = ({ getCartAction }) => {
  const { isLogin, fullname } = useUser();
  const { cart, selected_product } = useCart();
  console.log(cart, selected_product, "hehe");
  const dispatch = useDispatch();
  const router = useRouter();

  let subTotal = 0;
  let totalQuantity = 0;
  for (let i = 0; i < selected_product.length; i++) {
    const quantity = selected_product[i].quantity;
    const price = selected_product[i].detail_product.price;
    totalQuantity = totalQuantity + quantity;
    subTotal = subTotal + quantity * price;
  }

  const [productTerkait, setProductTerkait] = useState([]);

  const getProdcutTerkait = async (idSymptom) => {
    try {
      let response = await axios.get(
        `${API_URL}/product/get-product-terkait?symptom_id=${17}`
      );
      let data = response.data;

      setProductTerkait(data);
    } catch (error) {
      console.log(error);
    }
  };

  const beliButtonHandler = () => {
    dispatch({ type: "CHECKOUT" });
    router.push("/checkout");
  };

  useEffect(() => {
    dispatch({ type: "REFRESH_SELECTED_PRODUCT" });
    getCartAction();
    getProdcutTerkait();
  }, []);

  const settingsProdukTerkait = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className="w-100">
        <ul className="list-unstyled flex-row justify-content-center align-items-center mb-4">
          {dots}
        </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 2048,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="">
        <div className="shadow-xl w-full px-[76px] pb-2">
          <MobileHeader
            firstProp={null}
            secondProp={<SearchBar placeholder={"Hayo mau cari apa"} />}
            thirdProp={
              isLogin ? (
                <FaShoppingCart />
              ) : (
                <Button variant={"outlineCustom"} h={"44px"} w={"114px"}>
                  Masuk
                </Button>
              )
            }
            fourthProp={
              isLogin ? (
                <div className="flex items-center gap-2">
                  <FaUserCircle />
                  <div className="text-base">{fullname}</div>
                </div>
              ) : (
                <Button variant={"fillCustom"} h={"44px"} w={"114px"}>
                  Daftar
                </Button>
              )
            }
            classExtend={"hidden lg:flex"}
          />
        </div>
        <MobileHeader
          firstProp={<IoIosArrowBack className="text-base ml-8" />}
          secondProp={
            <p className="text-base mr-[110px] w-[120px]">Keranjang Saya</p>
          }
          thirdProp={<FaShoppingCart className="text-xl" />}
          fourthProp={<HiOutlineDotsVertical className="mr-5 text-xl" />}
          classExtend={"flex shadow-xl lg:hidden"}
        />
      </div>
      <div className="hidden md:inline md:text-2xl md:font-bold ">
        <p className="pl-[96px] mt-[57px] "> Keranjang Saya </p>
      </div>
      <div className="flex">
        {/* Card Cart */}
        <div>
          <CardCart cartData={cart} selected_product={selected_product} />
        </div>
        <div className="w-[405px] h-[299px] shadow-xl rounded-xl mr-3 mt-16">
          <div className="mt-[28px]">
            <p className="text-xl font-bold ml-3">Total</p>
            <div className="flex justify-between w-[320px] mx-auto mt-[32px] text-[#6B6B6B]">
              <p className="text-base">Sub Total</p>
              <p className="font-bold">{Rupiah(subTotal)}</p>
            </div>
            <Divider w="320px" mx="auto" mt="22px" />
            <div className="flex justify-between w-[320px] mx-auto mt-[22px] ">
              <p className="text-base font-bold">Total</p>
              <p className="font-bold">{Rupiah(subTotal)}</p>
            </div>
            <div className="w-[320px] mx-auto mt-[46px]">
              <Button
                variant="fillCustom"
                w="320px"
                h="52px"
                onClick={() => beliButtonHandler()}
              >
                Bayar{totalQuantity === 0 ? null : `(${totalQuantity})`}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Button Beli Cart */}
      <div className="h-[100px] w-[100%] mt-11 bg-slate-100 flex justify-between items-center md:hidden">
        <div className="flex items-center gap-4 mx-auto">
          <div>
            <p className="text-sm">Total</p>
            <p className="text-lg font-bold">{Rupiah(subTotal)}</p>
          </div>
          <Button
            variant="fillCustom"
            w="204px"
            h="46px"
            fontSize="14px"
            onClick={() => beliButtonHandler()}
            // isLoading={buttonLoading}
          >
            Bayar{totalQuantity === 0 ? null : `(${totalQuantity})`}
          </Button>
        </div>
      </div>
      <Divider className="hidden md:inline-block md:mt-[72px] md:mb-[60px]" />
      {/* Produk Terkait */}
      <div className="mx-8 mt-6">
        <p className="font-bold text-sm mb-[26px]">Produk Terkait</p>
        <Slider {...settingsProdukTerkait}>
          {productTerkait.map((val, i) => {
            return (
              <div className="w-[20px] h-[350px]" key={i}>
                <ProductCard
                  variant="popular"
                  imageUrl={`${API_URL}${val.imageProduct}`}
                  imageAlt={val.name}
                  title={val.name}
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice={Rupiah(val.price)}
                  unit={val.unit}
                />
              </div>
            );
          })}
          {/* <div className="w-[20px]">
                <ProductCard
                  variant="popular"
                  imageUrl="/Barbara_ProfilePicture.jpg"
                  imageAlt="PANADOL 10 KAPLET HEHEHEHE"
                  title="PANADOL 10 KAPLET HEHEHEHE"
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice="Rp.35.000"
                  unit="strip"
                />
              </div>
              <div className="w-[20px]">
                <ProductCard
                  variant="popular"
                  imageUrl="/Barbara_ProfilePicture.jpg"
                  imageAlt="PANADOL 10 KAPLET HEHEHEHE"
                  title="PANADOL 10 KAPLET HEHEHEHE"
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice="Rp.35.000"
                  unit="strip"
                />
              </div>
              <div className="w-[20px]">
                <ProductCard
                  variant="popular"
                  imageUrl="/Barbara_ProfilePicture.jpg"
                  imageAlt="PANADOL 10 KAPLET HEHEHEHE"
                  title="PANADOL 10 KAPLET HEHEHEHE"
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice="Rp.35.000"
                  unit="strip"
                />
              </div>
              <div className="w-[20px]">
                <ProductCard
                  variant="popular"
                  imageUrl="/Barbara_ProfilePicture.jpg"
                  imageAlt="PANADOL 10 KAPLET HEHEHEHE"
                  title="PANADOL 10 KAPLET HEHEHEHE"
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice="Rp.35.000"
                  unit="strip"
                />
              </div>
              <div className="w-[20px]">
                <ProductCard
                  variant="popular"
                  imageUrl="/Barbara_ProfilePicture.jpg"
                  imageAlt="PANADOL 10 KAPLET HEHEHEHE"
                  title="PANADOL 10 KAPLET HEHEHEHE"
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice="Rp.35.000"
                  unit="strip"
                />
              </div> */}
        </Slider>
      </div>
      <div className="hidden md:inline">
        <Footer />
      </div>
    </>
  );
};

export default connect(null, { getCartAction })(Cart);
