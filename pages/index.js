import MobileHeader from "../components/mobile_header";
import MobileNavbar from "../components/mobile_navbar";
import SearchBar from "../components/searchbar";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import { FaUserCircle } from "react-icons/fa";
import PrescriptionCard from "../components/mobile_card_upload_prescription";
import HomeTitleCard from "../components/home_title_card";
import HomePrescriptionCard from "../components/home_title_prescription";
import HomeSubtitleCard from "../components/home_subtitle_card";
import HomeCard from "../components/home_card";
import PaymentMethod from "../components/payment_method";
import Footer from "../components/footer";
import CategoryCarousel from "../components/category_carousel";
import HomeDiscount from "../components/home_today's_discount";
import PopularCarousel from "../components/popular_carousel";
import Link from "next/link";

export default function Home() {
  const logo = "/LogoHealthymed.svg";

  const { isLogin, fullname } = useUser();

  return (
    <div className="flex flex-col">
      <div className="bg-white drop-shadow-lg pb-4">
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
                    <FaUserCircle />
                    <div className="text-base">{fullname}</div>
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
          <MobileNavbar />
        </div>
      </div>

      {/* Mobile header */}
      <div className="mx-8">
        <MobileHeader
          firstProp={null}
          secondProp={<SearchBar placeholder={"Hayo mau cari apa"} />}
          thirdProp={<IoNotificationsSharp />}
          fourthProp={<FaShoppingCart href="/cart" />}
          classExtend={"flex lg:hidden"}
        />
        <MobileNavbar />
      </div>

      {/* Home title card */}
      <div className="mx-16">
        <HomeTitleCard />
      </div>

      {/* Home Prescription Card */}
      <div className="mx-16 mt-16">
        <HomePrescriptionCard />
      </div>

      {/* <MobilePrescriptionCard /> */}
      <div className="ml-8 font-bold text-[20px] lg:hidden">
        Punya Resep Dokter?
      </div>
      <div className="ml-8 mt-4 lg:hidden">
        <PrescriptionCard />
      </div>

      {/* Category Carousel */}
      {/* <div className="mx-16">
        <CategoryCarousel />
      </div> */}

      <div className="w-[1244px] mx-16 mt-12">
        <div className="flex justify-between">
          <div className="font-bold text-[24px]">Kategori</div>
          <Link href="/products">
            <button className="text-[14px] font-bold text-[#3C5ABC] underline">
              Lihat semua
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-4 mx-16 w-[1244px]">
        <CategoryCarousel />
      </div>

      <img className="w-[1244px] mx-16 mt-14" src="HomeLine.svg" />

      <div className="w-[1244px] mx-16 mt-10">
        <div className="flex justify-between">
          <div className="font-bold text-[24px]">Kejar Diskon Hari Ini</div>
          <button className="text-[14px] font-bold text-[#3C5ABC] underline">
            Lihat semua
          </button>
        </div>
      </div>

      <div className="mt-4 relative">
        <HomeDiscount />
        {/* <div className="absolute top-0 left-20 z-20">
          <DiscountCarousel />
        </div> */}
      </div>

      <img className="w-[1244px] mx-16 mt-14" src="HomeLine.svg" />

      {/* Home Subtitle Card */}
      <div className="mx-16 mt-14 flex w-[1244px] justify-between">
        <HomeSubtitleCard
          imgSrc="ProgramHamil.svg"
          title="Program Hamil"
          text="Wujudkan rumah tanggamu dengan si buah hati"
          color="bg-[#B3C9F8]"
        />
        <HomeSubtitleCard
          imgSrc="IdulFitri.svg"
          title="Kebutuhan Untuk Idul Fitri"
          text="Lengkapi kebutuhan gizi & asupan saat puasa"
          color="bg-[#F7CD7B]"
        />
      </div>

      <img className="w-[1244px] mx-16 mt-14" src="HomeLine.svg" />

      <div className="w-[1244px] mx-16 mt-10">
        <div className="flex justify-between">
          <div className="font-bold text-[24px]">Popular Product</div>
          <button className="text-[14px] font-bold text-[#3C5ABC] underline">
            Lihat semua
          </button>
        </div>
      </div>

      <div className="w-[1300px] h-[350px] mx-10">
        <PopularCarousel />
      </div>

      <img className="w-[1244px] mx-16 mt-16" src="HomeLine.svg" />

      <div className="ml-16 mt-10 font-bold text-[24px]">
        Jaminan Untuk Anda
      </div>
      <div className="flex justify-between ml-16 mt-8 pb-5 w-[1244px]">
        <HomeCard
          asset={<img className="h-[92px] w-[75px]" src="ObatAsli.svg" />}
          title="100% Obat Asli"
          description="Semua produk yang kami jual dijamin asli & kualitas terbaik untuk anda"
        />
        <HomeCard
          asset={<img className="h-[95px] w-[66px]" src="DijaminHemat.svg" />}
          title="Dijamin Hemat"
          description="Kami menjamin akan mengembalikan uang dari selisih perbedaan harga"
        />
        <HomeCard
          asset={<img className="h-[92px] w-[101px]" src="GratisOngkir.svg" />}
          title="GratisOngkir"
          description="Tak perlu antre. Kami kirim ke alamat anda bebas biaya ongkos kirim"
        />
      </div>

      <div className="mt-20">
        <PaymentMethod />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
