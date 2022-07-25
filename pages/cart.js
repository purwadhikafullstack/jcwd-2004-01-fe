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
import { useEffect } from "react";
import API_URL from "../helpers/apiurl";
import { useState } from "react";
import { Rupiah } from "../lib/convertRupiah";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard";
import Footer from "../components/footer";
import { getCartAction } from "../redux/actions/cart_action";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import { isInteger } from "lodash";
// import Router from "next/router";

const Cart = ({ getCartAction }) => {
  const { isLogin, fullname, profile_picture } = useUser();
  const { cart, selected_product } = useCart();
  console.log(cart, selected_product, "hehe");
  const dispatch = useDispatch();
  const router = useRouter();
  const token = Cookies.get("token");

  const [userAddress, setUserAddress] = useState();
  //Get User Address
  const getUserAddress = async () => {
    let res = await axios.get(`${API_URL}/profile/getuseraddresses`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log("ini kedua");
    console.log(res.data);
    setUserAddress([...res.data]);
  };

  let subTotal = 0;
  let totalQuantity = 0;
  for (let i = 0; i < selected_product.length; i++) {
    let quantity = selected_product[i].quantity;
    console.log(typeof selected_product[i].quantity);
    const price = selected_product[i].detail_product.price;
    totalQuantity = totalQuantity + quantity;
    subTotal = subTotal + quantity * price;
    if (!isInteger(subTotal) || !isInteger(totalQuantity) || quantity < 0) {
      subTotal = 0;
      totalQuantity = 0;
    }
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
    if (userAddress.length < 1) {
      router.push("/address");
    } else {
      router.push("/checkout");
    }
  };

  useEffect(() => {
    getUserAddress();
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
        breakpoint: 415,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!isLogin) {
    () => {
      router.push("/login");
    };
  }

  return (
    <>
      <div className="">
        <Head>
          <title>Keranjang | Healthymed</title>
        </Head>
        <div className="shadow-xl w-full pb-2">
          <div className="mx-8">
            <MobileHeader
              firstProp={null}
              secondProp={<SearchBar placeholder={"Hayo mau cari apa"} />}
              thirdProp={
                isLogin ? (
                  <Link href="/cart">
                    <FaShoppingCart />
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button variant={"outlineCustom"} h={"44px"} w={"114px"}>
                      Masuk
                    </Button>
                  </Link>
                )
              }
              fourthProp={
                isLogin ? (
                  <Link href="/userprofile/biodata">
                    <div className="flex items-center gap-2">
                      {profile_picture ? (
                        <img
                          className="rounded-full w-[25px] h-[25px] object-cover"
                          src={`${API_URL}${profile_picture}`}
                        />
                      ) : (
                        <FaUserCircle />
                      )}
                      <div className="text-base w-[80px] truncate">
                        {fullname}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link href="/register">
                    <Button variant={"fillCustom"} h={"44px"} w={"114px"}>
                      Daftar
                    </Button>
                  </Link>
                )
              }
              classExtend={"hidden lg:flex"}
            />
          </div>
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
        <div className="hidden md:inline w-[405px] h-[299px] shadow-xl rounded-xl mr-3 mt-16">
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
                isDisabled={totalQuantity == 0}
              >
                Bayar{totalQuantity === 0 ? null : `(${totalQuantity})`}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Button Beli Cart */}
      <div className="h-[100px] w-[100%] mt-11 bg-slate-100 flex justify-between items-center md:hidden fixed inset-x-0 bottom-0">
        <div className="flex items-center justify-between gap-4 mx-auto">
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
            isDisabled={totalQuantity == 0}
            // isLoading={buttonLoading}
          >
            Bayar{totalQuantity === 0 ? null : `(${totalQuantity})`}
          </Button>
        </div>
      </div>
      <Divider className="hidden md:inline-block md:mt-[72px] md:mb-[60px]" />
      {/* Produk Terkait */}
      <div className="hidden md:inline mx-8 mt-6">
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
                  id={val.id}
                />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="hidden md:inline">
        <Footer />
      </div>
    </>
  );
};

export default connect(null, { getCartAction })(Cart);
