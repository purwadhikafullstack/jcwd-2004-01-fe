import { useRouter } from "next/router";
import MobileHeader from "../../components/mobile_header";
import MobileNavbar from "../../components/mobile_navbar";
import SearchBar from "../../components/searchbar";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import useUser from "../../hooks/useUser";

const DetailProdukUserSide = () => {
  const router = useRouter();
  const { idProduk } = router.query;
  const { isLogin, fullname } = useUser();
  return (
    <>
      <div className="mx-8">
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
        <MobileNavbar />
      </div>

      <div className="mx-8">
        <MobileHeader
          firstProp={null}
          secondProp={<SearchBar placeholder={"Hayo mau cari apa"} />}
          thirdProp={<IoNotificationsSharp />}
          fourthProp={<FaShoppingCart />}
          classExtend={"flex lg:hidden"}
        />
        <MobileNavbar />
      </div>
    </>
  );
};

export default DetailProdukUserSide;
