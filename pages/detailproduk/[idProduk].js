import { useRouter } from "next/router";
import MobileHeader from "../../components/mobile_header";
import MobileNavbar from "../../components/mobile_navbar";
import SearchBar from "../../components/searchbar";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Button, NumberInput, NumberInputField } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import API_URL from "../../helpers/apiurl";
import { useState } from "react";
import Slider from "react-slick";
import { useEffect } from "react";
import axios from "axios";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ProductCard from "../../components/ProductCard";

const DetailProdukUserSide = () => {
  const router = useRouter();
  const { idProduk } = router.query;
  const { isLogin, fullname } = useUser();

  const [pageLoading, setPageLoading] = useState(false);

  const [kuantitas, setKuantitas] = useState(0);
  const [maxInput, setMaxInput] = useState(0);

  const [image, setImage] = useState([]);

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const capitalizeName = name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );

  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("");

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  const getProduct = async () => {
    try {
      setPageLoading(true);
      let response = await axios.get(
        `${API_URL}/product/get-product?id=${idProduk}`
      );

      let { data } = response;
      console.log(data.total, "line39");

      let imageArr = [];
      for (let i = 0; i < data.imageProduct.length; i++) {
        imageArr.push(data.imageProduct[i].image);
      }
      setImage(imageArr);
      setMaxInput(data.total_stock);
      setPrice(data.price);
      setBrand(data.brand);
      setName(data.name);
      setUnit(data.unit);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  console.log(image, "line 50");

  useEffect(() => {
    getProduct();
  }, []);

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="absolute flex justify-center items-center -right-7 top-[65px] rounded-full w-5 h-5 bg-white hover:bg-slate-100 z-50 hover:cursor-pointer shadow-md"
        onClick={onClick}
      >
        <GrFormNext className="text-[100px]" />
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="absolute flex justify-center items-center -left-7 top-[65px] rounded-full w-5 h-5 bg-white hover:bg-slate-100 z-50 hover:cursor-pointer shadow-md"
        onClick={onClick}
      >
        <GrFormPrevious className="text-[100px]" />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="w-100">
        <ul className="list-unstyled flex-row justify-content-center align-items-center mb-4">
          {dots}
        </ul>
      </div>
    ),
  };

  return (
    <>
      {pageLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="">
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
          <MobileHeader
            firstProp={<IoIosArrowBack className="text-base ml-8" />}
            secondProp={<p className="text-base mr-[150px]">Kategori</p>}
            thirdProp={<FaShoppingCart className="text-xl" />}
            fourthProp={<HiOutlineDotsVertical className="mr-8 text-xl" />}
            classExtend={"flex shadow-xl lg:hidden"}
          />
          <div className="w-[150.52px] h-[150.52px] mt-8 mx-auto">
            <Slider {...settings} className="">
              {image.map((val, i) => {
                return (
                  <div>
                    <img
                      key={i}
                      src={`${API_URL}${val}`}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
          {/* brand, nama, quantity, unit product */}
          <div className="flex-col mx-6 mt-10">
            <p className="text-xs font-bold">{brand}</p>
            <p className="text-lg">{capitalizeName}</p>
            <span className="">
              <p className="text-xl font-bold">
                {rupiah(price)}{" "}
                <span className="font-normal text-xs"> /{unit}</span>
              </p>{" "}
            </span>
            <div className="flex items-center mt-3">
              <Button
                isDisabled={kuantitas == 0}
                roundedRight="none"
                h="32px"
                w="32px"
                onClick={() => {
                  let angka = parseInt(kuantitas) - 1;
                  angka = angka + "";
                  setKuantitas(angka);
                }}
              >
                -
              </Button>
              <NumberInput
                min={0}
                max={maxInput}
                onChange={(value) => setKuantitas(value)}
                value={kuantitas}
              >
                <NumberInputField
                  name="kuantitas"
                  rounded="none"
                  w="70px"
                  h="32px"
                />
              </NumberInput>
              <Button
                isDisabled={kuantitas == maxInput}
                roundedLeft="none"
                h="32px"
                w="32px"
                onClick={() => {
                  let angka = parseInt(kuantitas) + 1;
                  angka = angka + "";
                  setKuantitas(angka);
                }}
              >
                +
              </Button>
              <span className="ml-2 text-slate-400 text-xs">
                Sisa {maxInput} {capitalize(unit)}
              </span>
            </div>
          </div>
          {/* Deskripsi Product */}
          <div className="flex-col mx-6 mt-10">
            <p className="font-bold">Deskripsi</p>
            <div className="mt-4">
              <p className="text-sm font-bold">Indikasi / Kegunaan</p>
              <p className="mt-1 text-xs">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Facere, ad? Dolorum quidem, minima, odit suscipit sequi facere
                distinctio architecto perspiciatis, exercitationem quis maxime
                eos corporis esse corrupti deserunt harum nesciunt.
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold">Kandungan / Komposisi</p>
              <p className="mt-1 text-xs">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Facere, ad? Dolorum quidem, minima, odit suscipit sequi facere
                distinctio architecto perspiciatis, exercitationem quis maxime
                eos corporis esse corrupti deserunt harum nesciunt.
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold">Kemasan</p>
              <p className="mt-1 text-xs">Lorem, ipsum dolor sit amet.</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold">Golongan</p>
              <p className="mt-1 text-xs">Lorem, ipsum dolor sit amet.</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold">Butuh Resep</p>
              <p className="mt-1 text-xs">Lorem, ipsum dolor sit amet.</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold">Cara Penyimpanan</p>
              <p className="mt-1 text-xs">Lorem, ipsum dolor sit amet.</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold">Principal</p>
              <p className="mt-1 text-xs">Lorem, ipsum dolor sit amet.</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold">Nomor Ijin Edar (NIE)</p>
              <p className="mt-1 text-xs">Lorem, ipsum dolor sit amet.</p>
            </div>
          </div>

          {/* Product Terkait */}
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
      )}
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default DetailProdukUserSide;
