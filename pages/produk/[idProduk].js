import { useRouter } from "next/router";
import MobileHeader from "../../components/mobile_header";
import MobileNavbar from "../../components/mobile_navbar";
import SearchBar from "../../components/searchbar";
import {
  IoNotificationsSharp,
  IoChatbubbleEllipsesSharp,
  IoShareSocialSharp,
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
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Link as CLink,
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
import Footer from "../../components/footer";
import Cookies from "js-cookie";
import { Rupiah } from "../../lib/convertRupiah";
import Link from "next/link";
import Head from "next/head";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import PageLoading from "../../components/pageLoading";

const DetailProdukUserSide = ({ product, productTerkaitData, host }) => {
  const router = useRouter();
  let token = Cookies.get("token");
  const { idProduk } = router.query;

  // chakra
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // user hook
  const { isLogin, fullname, is_verified, profile_picture } = useUser();

  const [pageLoading, setPageLoading] = useState(true);

  const [kuantitas, setKuantitas] = useState(1);
  const [maxInput, setMaxInput] = useState(0);

  const [buttonLoading, setButtonLoading] = useState(false);

  const [productTerkait, setProductTerkait] = useState([]);
  const [data, setData] = useState({
    brand: "",
    categories: [{}],
    composition: "",
    id: 0,
    brand: "",
    imageProduct: [{}],
    indication: "",
    med_classification: "",
    name: "",
    need_receipt: "",
    no_bpom: "",
    no_obat: "",
    nomor_ijin_edar: "",
    original_price: "",
    packaging: "",
    price: "",
    principal: "",
    storage_method: "",
    symptom: [{ id: 0 }],
    total_stock: "",
    type_name: "",
    unit: "",
    usage: "",
    warning: "",
  });

  const capitalizeName = data.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  let unit = data.unit.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );

  useEffect(() => {
    setData(product);
    setMaxInput(product.total_stock);
    setProductTerkait(productTerkaitData);
    setPageLoading(false);
  }, [product]);

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

  const buyHandler = async () => {
    try {
      if (!token) {
        router.push("/login");
        throw "You Need to Login!";
      } else {
        setButtonLoading(true);
        let response = await axios.post(
          `${API_URL}/product/input-cart`,
          { product_id: data.id, quantity: kuantitas },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        toast({
          title: "success!",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setButtonLoading(false);
    }
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
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Head>
        <title> {capitalizeName} | Healthymed</title>
        {/* facebook & Whatssapp*/}
        <meta property="og:site_name" content="Healthymed" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.indication} />
        <meta
          property="og:url"
          content={`${API_URL}${product.imageProduct[0].image}`}
        />
        <meta
          property="og:image"
          itemprop="image"
          content={`${API_URL}${product.imageProduct[0].image}`}
        />
        <meta property="og:type" content="website" />
        {/* twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.indication} />
        <meta
          name="twitter:image"
          content={`${API_URL}${product.imageProduct[0].image}`}
        />
        <meta
          name="twitter:url"
          content={`${API_URL}${product.imageProduct[0].image}`}
        />
      </Head>
      {pageLoading ? (
        <PageLoading />
      ) : (
        <div className="">
          <div className="shadow-xl w-full pb-2 ">
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
            secondProp={<p className="text-base mr-[150px]">Kategori</p>}
            thirdProp={<FaShoppingCart className="text-xl" />}
            fourthProp={<HiOutlineDotsVertical className="mr-8 text-xl" />}
            classExtend={"flex shadow-xl lg:hidden"}
          />
          <div className="hidden md:inline-block md:ml-[120px] md:my-11">
            <Breadcrumb fontSize="12px">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/products">produk</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{data.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="flex-none md:flex md:mr-16">
            <div className="w-fit h-fit mx-auto md:inline-block md:w-[405px] md:h-[300px] md:shadow-2xl rounded-lg">
              <div className="w-[150.52px] h-[150.52px] md:w-[225px] md:h-[225px] mt-8 mx-auto">
                <Slider {...settings} className="">
                  {data.imageProduct.map((val, i) => {
                    return (
                      <>
                        {pageLoading ? (
                          <Spinner key={i} />
                        ) : (
                          <img
                            key={i}
                            src={`${API_URL}${val.image}`}
                            alt=""
                            className="object-cover"
                          />
                        )}
                      </>
                    );
                  })}
                </Slider>
              </div>
              <div className="hidden md:flex gap-2 mt-16">
                <Button
                  variant="solid"
                  w="145px"
                  h="46px"
                  fontSize="12px"
                  bg="#EFEFEF"
                  leftIcon={<IoChatbubbleEllipsesSharp className="text-xl" />}
                  rounded="full"
                >
                  Chat Admin
                </Button>
                <Button
                  variant="solid"
                  w="145px"
                  h="46px"
                  fontSize="12px"
                  bg="#EFEFEF"
                  leftIcon={<IoShareSocialSharp className="text-xl" />}
                  rounded="full"
                  onClick={onOpen}
                >
                  Bagikan
                </Button>
              </div>
            </div>

            <Divider variant="solid" mt="26px" className="md:hidden" />
            {/* brand, nama, quantity, unit product */}
            <div className="md:flex-col  md:w-[616px]">
              <div className="flex-col mx-6 mt-6  md:w-fit">
                <p className="text-xs font-bold md:text-sm">{data.brand}</p>
                <p className="text-lg md:text-[22px]">{capitalizeName}</p>
                <span className="">
                  <p className="text-xl font-bold md:text-2xl md:flex md:items-center md:justify-between md:w-[250px]">
                    <span>{Rupiah(data.price)}</span>
                    <span className="font-normal text-xs md:text-sm">
                      /{unit}
                    </span>
                  </p>
                </span>
                <div className="flex items-center mt-3">
                  <Button
                    isDisabled={kuantitas <= 1}
                    roundedRight="none"
                    h="32px"
                    w="32px"
                    onClick={() => {
                      let angka = parseInt(kuantitas) - 1;
                      setKuantitas(parseInt(angka));
                    }}
                  >
                    -
                  </Button>
                  <NumberInput
                    min={1}
                    max={maxInput}
                    onChange={(value) => setKuantitas(parseInt(value))}
                    value={kuantitas || 1}
                  >
                    <NumberInputField
                      name="kuantitas"
                      rounded="none"
                      w="70px"
                      h="32px"
                    />
                  </NumberInput>
                  <Button
                    isDisabled={kuantitas >= maxInput}
                    roundedLeft="none"
                    h="32px"
                    w="32px"
                    onClick={() => {
                      let angka = parseInt(kuantitas) + 1;
                      setKuantitas(parseInt(angka));
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
                    isDisabled={kuantitas <= 0 || kuantitas > maxInput}
                    onClick={() => buyHandler()}
                    isLoading={buttonLoading}
                  >
                    Keranjang
                  </Button>
                  <Button
                    variant="fillCustom"
                    w="153px"
                    h="48px"
                    isDisabled={kuantitas <= 0 || kuantitas > maxInput}
                    isLoading={buttonLoading}
                    onClick={() => {
                      buyHandler();
                      router.push("/cart");
                    }}
                  >
                    Beli
                  </Button>
                  <Button variant="outlineCustom" w="48px" h="46px" p="-48">
                    <AiOutlineHeart className="text-2xl" />
                  </Button>
                </div>
              </div>
              <Divider
                variant="solid"
                mt="100px"
                className="hidden md:inline-block"
              />

              {/* Deskripsi Product */}
              <div className="flex-col mx-6 mt-5">
                <p className="font-bold">Deskripsi</p>
                <div className="mt-4">
                  <p className="text-sm font-bold">Indikasi / Kegunaan</p>
                  <p className="mt-1 text-xs">{data.indication}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold">Kandungan / Komposisi</p>
                  <p className="mt-1 text-xs">{data.composition}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold">Kemasan</p>
                  <p className="mt-1 text-xs">{data.packaging}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold">Golongan</p>
                  <p className="mt-1 text-xs">{data.med_classification}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold">Butuh Resep</p>
                  <p className="mt-1 text-xs">{data.need_receipt}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold">Cara Penyimpanan</p>
                  <p className="mt-1 text-xs">{data.storage_method}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold">Principal</p>
                  <p className="mt-1 text-xs">{data.principal}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold">Nomor Ijin Edar (NIE)</p>
                  <p className="mt-1 text-xs">{data.nomor_ijin_edar}</p>
                </div>
              </div>
              <Divider variant="solid" mt="26px" className="md:hidden" />
            </div>
          </div>
          <Divider className="hidden md:inline-block md:mt-[72px] md:mb-[60px]" />
          {/* Product Terkait */}
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
                      id={val.id}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>

          {/* Button Beli */}
          <div className="h-[100px] w-[100%] mt-11 bg-slate-100 flex justify-between items-center md:hidden">
            <div className="flex mx-auto">
              <Button variant="outlineCustom" w="48px" h="46px" p="-48">
                <AiOutlineHeart className="text-2xl" />
              </Button>
              {!isLogin || !is_verified ? (
                <>
                  <Link href="/login">
                    <Button
                      variant="outlineCustom"
                      w="48px"
                      h="46px"
                      p="-48"
                      mx="12px"
                      onClick={() => buyHandler()}
                      isLoading={buttonLoading}
                    >
                      <FaCartPlus className="text-2xl" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="fillCustom"
                      w="207px"
                      h="46px"
                      fontSize="14px"
                      onClick={() => {}}
                      isLoading={buttonLoading}
                    >
                      Beli Sekarang
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    variant="outlineCustom"
                    w="48px"
                    h="46px"
                    p="-48"
                    mx="12px"
                    onClick={() => buyHandler()}
                    isLoading={buttonLoading}
                  >
                    <FaCartPlus className="text-2xl" />
                  </Button>
                  <Button
                    variant="fillCustom"
                    w="207px"
                    h="46px"
                    fontSize="14px"
                    onClick={() => {
                      buyHandler();
                      router.push("/cart");
                    }}
                    isLoading={buttonLoading}
                  >
                    Beli Sekarang
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="">
            <Footer />
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Center>Bagikan di...</Center>
              </ModalHeader>
              <ModalBody>
                <Divider />
                <Center>
                  <WhatsappShareButton url={`${host}/produk/${idProduk}`}>
                    <CLink>Whatssapp</CLink>
                  </WhatsappShareButton>
                </Center>
                <Divider />
                <Center>
                  <FacebookShareButton url={`${host}/produk/${idProduk}`}>
                    <CLink>Facebook</CLink>
                  </FacebookShareButton>
                </Center>
                <Divider />
                <Center>
                  <TwitterShareButton url={`${host}/produk/${idProduk}`}>
                    <CLink>twitter</CLink>
                  </TwitterShareButton>
                </Center>
                <Divider />
                <Divider />
                <Center>
                  <CLink
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${host}/produk/${idProduk}`
                      );
                      toast({
                        title: "Success",
                        description: "Coppy to clipboard!",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  >
                    Copy link to clipboard
                  </CLink>
                </Center>

                <Center>
                  <CLink
                    color="blue.300"
                    fontWeight="semibold"
                    margin={2}
                    onClick={onClose}
                  >
                    No
                  </CLink>
                </Center>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const { query, req, res } = context;

  try {
    const idProduk = query.idProduk;
    // const brand = query.brand;

    const productReq = await axios.get(
      `${API_URL}/product/get-product?id=${idProduk}`
    );

    let idSymptom = productReq.data.symptom[0].id;

    const produkTerkaitReq = await axios.get(
      `${API_URL}/product/get-product-terkait?symptom_id=${idSymptom}`
    );

    let host = "https://" + req.headers.host;

    // const productTerkaitReq = await axios.get(``);

    return {
      props: {
        product: productReq.data,
        productTerkaitData: produkTerkaitReq.data,
        host,
      }, // will be passed to the page component as props
    };
  } catch {
    res.status = 404;
    return {
      props: {},
    };
  }
}

export default DetailProdukUserSide;
