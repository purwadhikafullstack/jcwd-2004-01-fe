import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@chakra-ui/react";
import SearchBar from "./searchbar";
import { FaShoppingCart, FaListUl } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import prettyBytes from "pretty-bytes";
import { IoAddSharp, IoClose } from "react-icons/io5";
import Link from "next/link";
import API_URL from "../helpers/apiurl";
import { BsCheckLg, BsCashStack } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
} from "@chakra-ui/react";
import TransactionCardUser from "./transaction_card_user";
import PaginationProductAdmin from "./PaginationProductAdmin";
import Footer from "./footer";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";

const UserTransaction = ({
  userData,
  cardData,
  page,
  totalData,
  limit,
  setLimit,
  updateLimit,
  setPage,
  clickMenunggu,
  clickSemua,
  clickDiproses,
  clickSemuaJenis,
  clickDikirim,
  clickDibatalkan,
  clickPrescription,
  clickNonPrescription,
  clickSelesai,
  getCardData,
  handleInput,
  orderByDate,
  fullname,
}) => {
  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();

  //Logout
  const router = useRouter();
  const dispatch = useDispatch();
  const logout = () => {
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
    router.push("/");
    onCloseLogout();
  };
  return (
    <div className="w-[375px] lg:w-[1349px] h-[812px] lg:h[1366px]">
      <div className="bg-white w-full h-[92px] lg:h-[109px] flex items-center drop-shadow-lg">
        <Link href="/">
          <div className="ml-[16px] lg:ml-[76px] text-lg hover:cursor-pointer">
            <div className="lg:hidden">
              <IoIosArrowBack />
            </div>
            <img
              className="hidden lg:inline-block"
              src="/LogoHealthymedBW.svg"
              alt=""
            />
          </div>
        </Link>
        <div className="ml-[8px] font-bold text-[16px] text-blackPrimary items-center lg:hidden">
          Daftar Pemesanan
        </div>
        <div className="ml-[36px] w-[744px] hidden lg:inline-block">
          <SearchBar
            placeholder={"Cari Obat, Suplemen, Vitamin, Produk Kesehatan"}
          />
        </div>
        <div className="ml-[60px] text-2xl hidden lg:inline-block">
          <FaShoppingCart />
        </div>
        <div className="mr-[16px] ml-[50px] text-2xl hidden lg:inline-block">
          <div className="flex items-center gap-2">
            {userData.profile_picture ? (
              <img
                className="rounded-full w-[25px] h-[25px] object-cover"
                src={`${API_URL}${userData.profile_picture}`}
              />
            ) : (
              <FaUserCircle />
            )}
            <div className="text-base w-[80px] truncate">
              {userData.fullname}
            </div>
          </div>
        </div>
      </div>

      <div className="flex mx-[96px] mt-[56px] gap-[46px]">
        <div className="w-[300px] h-[484px] rounded-2xl bg-white drop-shadow-lg">
          <div className="w-full h-[80px] border-b-2 border-gray-400">
            <div className="w-[220px] mx-[40px] pt-[28px] flex gap-[40px] items-center">
              <img
                className="rounded-full w-[20px] h-[20px] object-cover"
                src={
                  userData.profile_picture
                    ? `${API_URL}${userData.profile_picture}`
                    : `${API_URL}/photos/defaultprofilepicture.png`
                }
              />
              <div>{userData.fullname}</div>
            </div>
          </div>
          <div className="w-full h-full">
            <Link href="/userprofile/biodata">
              <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer">
                <FaUserCircle /> Profil
              </div>
            </Link>

            <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer font-bold">
              <FaListUl /> Proses Pemesanan
            </div>

            {/* <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer">
              <BsCashStack /> Metode Pembayaran
            </div> */}

            <Link href="/userprofile/address">
              <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer">
                <IoLocationSharp /> Alamat Pengiriman
              </div>
            </Link>

            <div
              onClick={onOpenLogout}
              className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer"
            >
              <BiLogOut /> Keluar
            </div>
          </div>
        </div>
        <div className="w-[900px] bg-white drop-shadow-lg rounded-2xl">
          <div className="flex h-[32px] items-center w-[72.6%] gap-9">
            <div className="text-xl font-bold text-blackPrimary mt-[28px] ml-[40px] text-[20px]">
              Daftar Pemesanan
            </div>
          </div>
          <div className="mt-[30px] mx-[40px]">
            <Tabs isFitted variant="soft-rounded">
              <TabList justifyContent="space-between">
                <Tab
                  onClick={clickSemua}
                  _focus={{ boxShadow: "none" }}
                  fontSize="14px"
                >
                  Semua
                </Tab>
                <Tab
                  onClick={clickMenunggu}
                  _focus={{ boxShadow: "none" }}
                  fontSize="14px"
                >
                  Menunggu
                </Tab>
                <Tab
                  onClick={clickDiproses}
                  _focus={{ boxShadow: "none" }}
                  fontSize="14px"
                >
                  Diproses
                </Tab>
                <Tab
                  onClick={clickDikirim}
                  _focus={{ boxShadow: "none" }}
                  fontSize="14px"
                >
                  Dikirim
                </Tab>
                <Tab
                  onClick={clickSelesai}
                  _focus={{ boxShadow: "none" }}
                  fontSize="14px"
                >
                  Selesai
                </Tab>
                <Tab
                  onClick={clickDibatalkan}
                  _focus={{ boxShadow: "none" }}
                  fontSize="14px"
                >
                  Dibatalkan
                </Tab>
              </TabList>
            </Tabs>
          </div>

          <div className="mx-[40px] mt-[28px] flex justify-between">
            <div className="flex items-center gap-5">
              <div className="font-bold text-[14px]">Jenis Obat</div>
              <div>
                <Tabs variant="soft-rounded" colorScheme="blue">
                  <TabList>
                    <Tab
                      onClick={clickSemuaJenis}
                      _focus={{ boxShadow: "none" }}
                      fontSize="14px"
                    >
                      Semua Obat
                    </Tab>
                    <Tab
                      onClick={clickPrescription}
                      _focus={{ boxShadow: "none" }}
                      fontSize="14px"
                    >
                      Obat Resep
                    </Tab>
                    <Tab
                      onClick={clickNonPrescription}
                      _focus={{ boxShadow: "none" }}
                      fontSize="14px"
                    >
                      Obat Bebas
                    </Tab>
                  </TabList>
                </Tabs>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-[14px]">Urutkan</div>
              <div>
                <Select
                  // value={orderByDate}
                  // onChange={(e) => handleInput(e)}
                  placeholder="Terbaru"
                  w="137px"
                  h="36px"
                >
                  <option value="asc">Terlama</option>
                  <option value="desc">Terbaru</option>
                </Select>
              </div>
            </div>
          </div>

          <div className="mx-[20px] mt-[20px]">
            <PaginationProductAdmin
              page={page}
              totalData={totalData}
              limit={limit}
              setLimit={setLimit}
              updateLimit={updateLimit}
              pageChangeHandler={setPage}
              isAdmin={true}
            />
          </div>

          <div className="mx-[40px] mt-[40px]">
            {cardData.length > 0 ? (
              cardData.map((val, index) => {
                return (
                  <div
                    // className={index < cardData.length - 1 ? "pb-[36px]" : null}
                    className="pb-[36px]"
                    key={index}
                  >
                    <TransactionCardUser
                      getCardData={getCardData}
                      transaction_id={val.id}
                      transaction_code={val.transaction_code}
                      total_price={val.total_price}
                      index={index}
                      created_at={val.created_at}
                      expired_at={val.expired_at}
                      prescription={val.prescription}
                      orderedProduct={val.orderedProduct}
                      username={val.username}
                      fullname={val.fullname}
                      address={val.address}
                      status={val.status}
                      delivery_fee={val.delivery_fee}
                      bank_id={val.bank_id}
                      updated_at={val.updated_at}
                    />
                  </div>
                );
              })
            ) : (
              <div className="pb-[36px]">
                <div className="flex justify-center text-[20px] font-bold ">
                  Yuk tambah pesananmu!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal Logout */}
      <Modal isOpen={isOpenLogout} onClose={onCloseLogout}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Keluar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>Apakah anda yakin untuk keluar?</div>
          </ModalBody>

          <ModalFooter>
            <Button variant="fillCustom" mr={3} onClick={onCloseLogout}>
              Batal
            </Button>
            <Button
              onClick={() => {
                logout();
              }}
              variant="outlineCustom"
            >
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="mt-[20px]">
        <Footer />
      </div>
    </div>
  );
};

export default UserTransaction;
