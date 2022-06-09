import MobileHeader from "../components/mobile_header"
import MobileNavbar from "../components/mobile_navbar"
import SearchBar from "../components/searchbar"
import MobileCategoryCard from "../components/mobile_category_card";
import MobileHomeCard from "../components/mobile_home_card";
import PrescriptionCard from "../components/mobile_card_upload_prescription";
import InputForm from "../components/input_form";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { GiMedicines } from "react-icons/gi";
import { Button } from "@chakra-ui/react";

export default function Home() {

  const logo = "/LogoHealthymed.svg"

  return (
    <>
      <MobileHeader
      firstProp={null}
      secondProp={<SearchBar placeholder={"Hayo mau cari apa"}/>}
      thirdProp={<Button variant={"outlineCustom"} h={"44px"} w={"114px"}>Masuk</Button>}
      fourthProp={<Button variant={"fillCustom"} h={"44px"} w={"114px"}>Daftar</Button>}
      classExtend={"hidden lg:flex"}/>
      <MobileNavbar/>

      <MobileHeader
      firstProp={null}
      secondProp={<SearchBar placeholder={"Hayo mau cari apa"}/>}
      thirdProp={<IoNotificationsSharp/>}
      fourthProp={<FaShoppingCart/>}
      classExtend={"flex lg:hidden"}/>
      <MobileNavbar/>

      {/* <MobileCategoryCard 
      icon={<GiMedicines/>}
      caption={"Ulala"}/> */}
      {/* <MobileHomeCard 
      asset={<GiMedicines/>}
      title={`Hayo apa`}
      description={`suka-suka loe suka-suka loe suka-suka loe suka-suka loe`}/> */}
      

    </>

  )
}
