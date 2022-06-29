import { useRouter } from "next/router";
import MobileHeader from "../../components/mobile_header";
import MobileNavbar from "../../components/mobile_navbar";
import SearchBar from "../../components/searchbar";
import {
  IoNotificationsSharp,
  IoChatbubbleEllipsesSharp,
} from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import {
  Button,
  NumberInput,
  NumberInputField,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
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
import { AiOutlineHeart } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";

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
  const [price, setPrice] = useState(0);
  let [unit, setUnit] = useState("");

  const capitalizeName = name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  unit = unit.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

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

  useEffect(() => {
    getProduct();
  }, []);

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="absolute flex justify-center items-center -right-7 top-[65px] rounded-full w-5 h-5 bg-white hover:bg-slate-100 z-50 hover:cursor-pointer shadow-md md:top-[95px]"
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
        className="absolute flex justify-center items-center -left-7 top-[65px] rounded-full w-5 h-5 bg-white hover:bg-slate-100 z-50 hover:cursor-pointer shadow-md md:top-[95px]"
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
      {pageLoading ? (
        <div>Loading...</div>
      ) : (
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
            secondProp={<p className="text-base mr-[150px]">Kategori</p>}
            thirdProp={<FaShoppingCart className="text-xl" />}
            fourthProp={<HiOutlineDotsVertical className="mr-8 text-xl" />}
            classExtend={"flex shadow-xl lg:hidden"}
          />
          <div className="hiddes md:inline-block md:ml-[120px] md:mt-4">
            <Breadcrumb fontSize="12px">
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Beranda</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="#">Kategori</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>Obat</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="flex-none md:flex">
            <div className="w-fit h-fit mx-auto md:inline-block md:w-[405px] md:h-[300px] md:shadow-2xl rounded-lg">
              <div className="w-[150.52px] h-[150.52px] md:w-[225px] md:h-[225px] mt-8 mx-auto">
                <Slider {...settings} className="">
                  {image.map((val, i) => {
                    return (
                      <img
                        key={i}
                        src={`${API_URL}${val}`}
                        alt=""
                        className="object-cover"
                      />
                    );
                  })}
                </Slider>
              </div>
            </div>
            <Button
              variant="outlineCustom"
              w="145px"
              h="46px"
              fontSize="12px"
              leftIcon={<IoChatbubbleEllipsesSharp />}
              rounded="full"
            >
              Chat Admin
            </Button>

            <Divider variant="solid" mt="26px" className="md:hidden" />
            {/* brand, nama, quantity, unit product */}
            <div className="md:flex-col md:bg-red-200 md:w-[616px]">
              <div className="flex-col mx-6 mt-6 bg-green-400 md:w-fit">
                <p className="text-xs font-bold md:text-sm">{brand}</p>
                <p className="text-lg md:text-[22px]">{capitalizeName}</p>
                <span className="">
                  <p className="text-xl font-bold md:text-2xl md:flex md:items-center md:justify-between md:w-[250px]">
                    <span>{rupiah(price)}</span>
                    <span className="font-normal text-xs md:text-sm">
                      /{unit}
                    </span>
                  </p>
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
                    Sisa {maxInput} {unit}
                  </span>
                </div>
                <div className="hidden md:flex justify-between w-[415px] md:mt-[46px]">
                  <Button
                    variant="outlineCustom"
                    fontSize="12px"
                    w="194px"
                    h="47px"
                    fontWeight="700"
                    leftIcon={<FaCartPlus className="text-xl mr-6" />}
                  >
                    Keranjang
                  </Button>
                  <Button variant="fillCustom" w="153px" h="48px">
                    Beli
                  </Button>
                  <Button variant="outlineCustom" w="48px" h="46px" p="-48">
                    <AiOutlineHeart className="text-2xl" />
                  </Button>
                </div>
              </div>
              <Divider
                variant="solid"
                mt="26px"
                className="hidden md:inline-block"
              />

              {/* Deskripsi Product */}
              <div className="flex-col mx-6 mt-5">
                <p className="font-bold">Deskripsi</p>
                <div className="mt-4">
                  <p className="text-sm font-bold">Indikasi / Kegunaan</p>
                  <p className="mt-1 text-xs">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facere, ad? Dolorum quidem, minima, odit suscipit sequi
                    facere distinctio architecto perspiciatis, exercitationem
                    quis maxime eos corporis esse corrupti deserunt harum
                    nesciunt.
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold">Kandungan / Komposisi</p>
                  <p className="mt-1 text-xs">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facere, ad? Dolorum quidem, minima, odit suscipit sequi
                    facere distinctio architecto perspiciatis, exercitationem
                    quis maxime eos corporis esse corrupti deserunt harum
                    nesciunt.
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
              <Divider variant="solid" mt="26px" />
            </div>
          </div>
          {/* Product Terkait */}
          <div className="mx-8 mt-6">
            <p className="font-bold text-sm mb-[26px]">Produk Terkait</p>
            <Slider {...settingsProdukTerkait}>
              <div className="w-[20px] h-[270px]">
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
            </Slider>
          </div>

          {/* Button Beli */}
          <div className="h-[100px] w-[100%] mt-11 bg-slate-100 flex justify-between items-center md:hidden">
            <div className="flex mx-auto">
              <Button variant="outlineCustom" w="48px" h="46px" p="-48">
                <AiOutlineHeart className="text-2xl" />
              </Button>
              <Button
                variant="outlineCustom"
                w="48px"
                h="46px"
                p="-48"
                mx="12px"
              >
                <FaCartPlus className="text-2xl" />
              </Button>
              <Button variant="fillCustom" w="207px" h="46px" fontSize="14px">
                Beli Sekarang
              </Button>
            </div>
          </div>
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
