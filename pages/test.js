import { IoIosArrowBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Footer from "../components/footer";
import { useState } from "react";
import prettyBytes from "pretty-bytes";
import { IoAddSharp, IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import SearchBar from "../components/searchbar";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Textarea,
} from "@chakra-ui/react";

const Test = () => {
  return (
    <div className="w-[375px] lg:w-[1349px] h-[1212px] lg:h[1366px]">
      <div className="bg-white w-full h-[92px] lg:h-[109px] flex items-center drop-shadow-lg">
        <div className="ml-[16px] lg:ml-[76px] text-lg">
          <div className="lg:hidden">
            <IoIosArrowBack />
          </div>
          <img
            className="hidden lg:inline-block"
            src="/LogoHealthymedBW.svg"
            alt=""
          />
        </div>
        <div className="ml-[8px] font-bold text-[16px] text-blackPrimary lg:hidden">
          Alamat Pengiriman
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
          <FaUserCircle />
        </div>
      </div>

      <div className="h-[1369px] lg:hidden">
        <div className="mt-[32px] border-b-2 border-gray-400 pb-[32px]">
          <div className="mx-[24px]">
            <FormLabel fontSize="14px" fontWeight="bold">
              Label Alamat
            </FormLabel>
            <Input
              type="text"
              placeholder="Masukkan nama alamat"
              name="address_label"
              w="328px"
              h="36px"
              // onChange={newAddressHandleChange}
              // value={newAddress.address_label}
            />
          </div>
        </div>
        <div className="mt-[24px] mx-[24px]">
          <FormLabel fontSize="14px" fontWeight="bold" mt={4} mb={4}>
            Info Penerima
          </FormLabel>
          <FormLabel fontSize="12px" mt="20px">
            Nama Penerima
          </FormLabel>
          <Input
            type="text"
            placeholder="Masukkan nama penerima"
            name="recipient_name"
            w="328px"
            h="36px"
            // onChange={newAddressHandleChange}
            // value={newAddress.recipient_name}
          />
          <FormLabel fontSize="12px" mt="20px">
            Nomor HP
          </FormLabel>
          <Input
            type="text"
            placeholder="Masukkan nomor telepon"
            name="recipient_number"
            w="328px"
            h="36px"
            // onChange={newAddressHandleChange}
            // value={newAddress.recipient_number}
          />
          <FormLabel fontSize="14px" fontWeight="bold" mt="56px">
            Alamat Penerima
          </FormLabel>

          <FormLabel fontSize="12px" mt="20px">
            Provinsi
          </FormLabel>
          <Select
            placeholder="Provinsi"
            name="province_id"
            w="328px"
            h="36px"
            // onChange={provinceHandleChange}
          >
            {/* {provinceOption.map((val, index) => {
              return (
                <option key={index} value={val.id}>
                  {val.name}
                </option>
              );
            })} */}
          </Select>
          <FormLabel fontSize="12px" mt="20px">
            Kota/Kabupaten
          </FormLabel>
          <Select
            placeholder="Kota"
            name="city_id"
            w="328px"
            h="36px"
            // onChange={newAddressHandleChange}
            // isDisabled={newAddress.province_id == ""}
          >
            {/* {cityOption.map((val, index) => {
              return (
                <option key={index} value={val.id}>
                  {val.name}
                </option>
              );
            })} */}
          </Select>
          <FormLabel fontSize="12px" mt="20px">
            Alamat
          </FormLabel>
          <Textarea
            type="text"
            placeholder="contoh : Jl. Gatot Subroto no. 12 RT 01/02"
            name="address"
            // onChange={newAddressHandleChange}
            // value={newAddress.address}
            resize="none"
          />
        </div>
        <div className="flex gap-2 mt-[86px] mx-[24px]">
          <div>
            <Button variant={"outlineCustom"} w={"157px"} h={"48px"}>
              Batalkan
            </Button>
          </div>
          <div>
            <Button variant={"fillCustom"} w={"157px"} h={"48px"}>
              Simpan Alamat
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:inline-block h-[668px] w-full mx-[412px]">
        <div className="mx-[24px]">
          <div className="text-[24px] mt-[96px] font-bold">
            Alamat Pengiriman
          </div>
          <FormLabel fontSize="16px" fontWeight="bold" mt="68px">
            Label Alamat
          </FormLabel>
          <Input
            type="text"
            placeholder="Masukkan nama alamat"
            name="address_label"
            w="616px"
            h="44px"
            mt="16px"
            // onChange={newAddressHandleChange}
            // value={newAddress.address_label}
          />
        </div>
        <div className="mt-[24px] mx-[24px]">
          <FormLabel fontSize="16px" fontWeight="bold" mt="52px" mb={4}>
            Info Penerima
          </FormLabel>
          <FormLabel fontSize="14px" mt="36px">
            Nama Penerima
          </FormLabel>
          <Input
            type="text"
            placeholder="Masukkan nama penerima"
            name="recipient_name"
            w="616px"
            h="44px"
            mt="16px"
            // onChange={newAddressHandleChange}
            // value={newAddress.recipient_name}
          />
          <FormLabel fontSize="14px" mt="36px">
            Nomor HP
          </FormLabel>
          <Input
            type="text"
            placeholder="Masukkan nomor telepon"
            name="recipient_number"
            w="616px"
            h="44px"
            mt="16px"
            // onChange={newAddressHandleChange}
            // value={newAddress.recipient_number}
          />
          <FormLabel fontSize="14px" mt="36px">
            Provinsi
          </FormLabel>
          <Select
            placeholder="Provinsi"
            name="province_id"
            w="616px"
            h="44px"
            mt="16px"
            // onChange={provinceHandleChange}
          >
            {/* {provinceOption.map((val, index) => {
              return (
                <option key={index} value={val.id}>
                  {val.name}
                </option>
              );
            })} */}
          </Select>
          <FormLabel fontSize="14px" mt="36px">
            Kota/Kabupaten
          </FormLabel>
          <Select
            placeholder="Kota"
            name="city_id"
            w="616px"
            h="44px"
            mt="16px"
            // onChange={newAddressHandleChange}
            // isDisabled={newAddress.province_id == ""}
          >
            {/* {cityOption.map((val, index) => {
              return (
                <option key={index} value={val.id}>
                  {val.name}
                </option>
              );
            })} */}
          </Select>
          <FormLabel fontSize="14px" mt="36px">
            Alamat
          </FormLabel>
          <Textarea
            type="text"
            placeholder="contoh : Jl. Gatot Subroto no. 12 RT 01/02"
            name="address"
            // onChange={newAddressHandleChange}
            // value={newAddress.address}
            resize="none"
            mt="16px"
            w="616px"
          />
        </div>
        <div className="flex gap-2 mt-[68px] mx-[26px]">
          <div>
            <Button variant={"outlineCustom"} w={"300px"} h={"52px"}>
              Batalkan
            </Button>
          </div>
          <div>
            <Button variant={"fillCustom"} w={"300px"} h={"52px"}>
              Simpan Alamat
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:inline-block mt-[158px]">
        <Footer />
      </div>
    </div>
  );
};

export default Test;
