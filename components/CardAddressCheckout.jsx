import {
  Spinner,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  FormLabel,
  Input,
  Select,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { HiPlusSm } from "react-icons/hi";
import API_URL from "../helpers/apiurl";
import { toast } from "react-toastify";
import { BsCheckLg, BsCashStack } from "react-icons/bs";

const CardAddressCheckout = ({ addressData, getAddress }) => {
  //Get token
  let token = Cookies.get("token");

  //pilih alamat
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Get user addresses
  const [userAddress, setuserAddress] = useState([]);
  const getUserAddress = async () => {
    let res = await axios.get(`${API_URL}/profile/getuseraddresses`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log("ini kedua");
    console.log(res.data);
    setuserAddress([...res.data]);
  };

  //Disable button on submit
  const [disableButtonAddress, setDisableButtonAddress] = useState(false);

  //Add address modal

  //Get province and city options
  const [provinceOption, setProvinceOption] = useState([]);
  const [cityOption, setCityOption] = useState([]);

  const getProvinceData = async () => {
    let res = await axios.get(`${API_URL}/profile/getprovince`);
    setProvinceOption(res.data);
  };

  useEffect(() => {
    getProvinceData();
    getUserAddress();
  }, []);

  const {
    isOpen: isOpenAddress,
    onOpen: onOpenAddress,
    onClose: onCloseAddress,
  } = useDisclosure();
  const closeModal = () => {
    setnewAddressData({
      ...newAddress,
      address: "",
      province_id: "",
      city_id: "",
      recipient_number: "",
      recipient_name: "",
      address_label: "",
    });
    onCloseAddress();
  };

  // add address

  const [newAddress, setnewAddressData] = useState({
    address: "",
    province_id: "",
    city_id: "",
    recipient_number: "",
    recipient_name: "",
    address_label: "",
  });
  const newAddressHandleChange = (e) => {
    setnewAddressData({ ...newAddress, [e.target.name]: e.target.value });
  };
  const provinceHandleChange = async (e) => {
    setnewAddressData({ ...newAddress, [e.target.name]: e.target.value });
    let res = await axios.get(`${API_URL}/profile/getcity/${e.target.value}`);
    setCityOption(res.data);
  };

  const submitNewAddress = async (e) => {
    e.preventDefault();
    try {
      setDisableButtonAddress(true);
      await axios.post(
        `${API_URL}/profile/addaddress`,
        {
          address: newAddress.address,
          province_id: newAddress.province_id,
          city_id: newAddress.city_id,
          recipient_number: newAddress.recipient_number,
          recipient_name: newAddress.recipient_name,
          address_label: newAddress.address_label,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Address successfully added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Network Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setDisableButtonAddress(false);
      setTimeout(() => {
        getUserAddress();
      }, 500);
      setnewAddressData({
        ...newAddress,
        address: "",
        province_id: "",
        city_id: "",
        recipient_number: "",
        recipient_name: "",
        address_label: "",
      });
      onCloseAddress();
      // setTimeout(() => {
      //   getUserAddress();
      // }, 500);
    }
  };

  //Change default address
  const changeDefaultAddress = async (id) => {
    try {
      await axios.patch(`${API_URL}/profile/changedefaultaddress/${id}`, null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("ini satu");
      toast.success("Default address successfully changed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Network Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      //  getUserAddress();
      setTimeout(() => {
        getUserAddress();
        getAddress();
      }, 500);
    }
  };

  const addressCard = () => {
    return userAddress.map((val, index) => {
      return (
        <div
          key={index}
          className={`mt-5 border-2 border-blackPrimary rounded-lg ${
            index == 0 ? "bg-cyan-100" : null
          }`}
        >
          <div className="flex justify-between m-3 items-center">
            <div className="flex flex-col gap-0">
              <div className="font-bold text-lg">
                {val.recipient_name}, {val.recipient_number}
              </div>
              <div className="mt-4">{val.address_label}</div>
              <div>{val.address}</div>
            </div>
            <div>{val.is_default == "YES" ? <BsCheckLg /> : null}</div>
          </div>
          <div className="flex gap-3 mx-3 mt-5 mb-3 border-t-2 border-black text-sm">
            {val.is_default == "NO" ? (
              <button
                onClick={() => {
                  changeDefaultAddress(val.id);
                }}
                className="pt-3 font-bold text-blackPrimary"
              >
                Jadikan Alamat Utama
              </button>
            ) : null}
            {val.is_default == "NO" ? <p className="pt-3">l</p> : null}
            <button className="pt-3 font-bold text-blackPrimary">Hapus</button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="md:mx-6 px-3 mt-3 md:ml-[96px] w-[100vw] md:w-[783px] md:shadow-2xl md:p-9 md:mt-[64px] md:rounded-lg">
      {addressData ? (
        <>
          <p className="text-xl font-bold">Alamat Pengiriman</p>
          <Divider mt="12px" />
          <div className="flex justify-between mt-[16px] text-sm font-bold">
            <p>
              {addressData.recipient_name}, {addressData.recipient_number}
            </p>
            <p onClick={onOpen} className="hover:cursor-pointer">
              Pilih Alamat Lain
            </p>
          </div>
          <div className="text-sm mt-[14px]">
            <p>{addressData.address_label}</p>
            <p className="">
              {addressData.address}, Kota {addressData.city},{" "}
              {addressData.province}
            </p>
          </div>
          <Divider mt="24px" />
          <div
            className="justify-center md:justify-start flex gap-4 items-center mt-[12px] hover:cursor-pointer"
            onClick={onOpenAddress}
          >
            <div className="rounded-full w-6 h-6 shadow-lg">
              <HiPlusSm className="mx-auto text-lg text-center mt-1" />
            </div>
            <p className="font-bold">Tambahkan Alamat</p>
          </div>
        </>
      ) : (
        <Spinner size="xl" mx="auto" speed="0.4s" />
      )}
      <Modal
        scrollBehavior="inside"
        isOpen={isOpenAddress}
        onClose={closeModal}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah alamat</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={submitNewAddress}>
              <FormLabel fontSize="xl" fontWeight="bold">
                Label Alamat
              </FormLabel>
              <Input
                type="text"
                placeholder="Masukkan nama alamat"
                name="address_label"
                onChange={newAddressHandleChange}
                // onBlur={""}
                value={newAddress.address_label}
              />
              <FormLabel fontSize="xl" fontWeight="bold" mt={4} mb={4}>
                Info Penerima
              </FormLabel>
              <FormLabel>Nama Penerima</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan nama penerima"
                name="recipient_name"
                onChange={newAddressHandleChange}
                // onBlur={""}
                value={newAddress.recipient_name}
              />
              <FormLabel mt={3}>Nomor HP</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan nomor telepon"
                name="recipient_number"
                onChange={newAddressHandleChange}
                // onBlur={""}
                value={newAddress.recipient_number}
              />
              <FormLabel mt={3}>Provinsi</FormLabel>
              <Select
                placeholder="Provinsi"
                name="province_id"
                onChange={provinceHandleChange}
              >
                {provinceOption.map((val, index) => {
                  return (
                    <option key={index} value={val.id}>
                      {val.name}
                    </option>
                  );
                })}
              </Select>
              <FormLabel mt={3}>Kota/Kabupaten</FormLabel>
              <Select
                placeholder="Kota"
                name="city_id"
                onChange={newAddressHandleChange}
                isDisabled={newAddress.province_id == ""}
              >
                {cityOption.map((val, index) => {
                  return (
                    <option key={index} value={val.id}>
                      {val.name}
                    </option>
                  );
                })}
              </Select>
              <FormLabel mt={3}>Alamat</FormLabel>
              <Textarea
                type="text"
                placeholder="contoh : Jl. Gatot Subroto no. 12 RT 01/02"
                name="address"
                onChange={newAddressHandleChange}
                // onBlur={""}
                value={newAddress.address}
                resize="none"
              />
              <Flex justify="end">
                <Button
                  isDisabled={disableButtonAddress}
                  type="submit"
                  variant="fillCustom"
                  mr={3}
                  mt={6}
                >
                  Simpan
                </Button>
                <Button
                  type="button"
                  variant="outlineCustom"
                  onClick={closeModal}
                  mt={6}
                >
                  Batalkan
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="700px">
          <ModalHeader>Ganti Alamat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {userAddress.length ? (
              <div className="h-[500px] overflow-y-auto mt-6 pb-10 border-2 border-gray-400 rounded-2xl px-6">
                {addressCard()}
              </div>
            ) : (
              <div className="h-[50px] mt-6 border-2 border-gray-400 rounded-2xl px-6 text-center pt-2 font-bold text-cyan-600 tracking-wider">
                Silahkan tambah alamat pengiriman
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="fillCustom" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CardAddressCheckout;
