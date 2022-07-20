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
import { useDisclosure } from "@chakra-ui/react";
import { BsCheckLg, BsCashStack } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../helpers/apiurl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
const dayjs = require("dayjs");
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaShoppingCart, FaListUl } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "../../components/searchbar";
import Footer from "../../components/footer";
import useUser from "../../hooks/useUser";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";

const Address = () => {
  const { isLogin, fullname } = useUser();
  //Get token
  let token = Cookies.get("token");

  //UserData
  const [userData, setUserData] = useState({
    fullname: "",
    profile_picture: "",
  });
  //Disable button on submit
  const [disableButtonAddress, setDisableButtonAddress] = useState(false);
  //Get User Address state
  const [userAddress, setuserAddress] = useState([]);
  //Province and City Options
  const [provinceOption, setProvinceOption] = useState([]);
  const [cityOption, setCityOption] = useState([]);

  const getUserData = async () => {
    let res = await axios.get(`${API_URL}/profile/getuserprofile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setUserData(res.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  //Add address modal
  const {
    isOpen: isOpenAddress,
    onOpen: onOpenAddress,
    onClose: onCloseAddress,
  } = useDisclosure();
  const closeModal = () => {
    // formik.setValues(formik.initialValues);
    formik.resetForm();
    onCloseAddress();
  };

  //Get user addresses
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

  //Get province and city options
  const getProvinceData = async () => {
    let res = await axios.get(`${API_URL}/profile/getprovince`);
    setProvinceOption(res.data);
  };

  useEffect(() => {
    getProvinceData();
    getUserAddress();
  }, []);

  //FORMIK
  const formik = useFormik({
    initialValues: {
      address: "",
      province_id: "",
      city_id: "",
      recipient_number: "",
      recipient_name: "",
      address_label: "",
    },

    validationSchema: Yup.object({
      address: Yup.string()
        .max(100, "Must contain 100 characters or less")
        .required("Required"),
      province_id: Yup.string().required("Required"),
      city_id: Yup.string().required("Required"),
      recipient_name: Yup.string().required("Required"),
      recipient_number: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Should contain only number"),
      address_label: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        setDisableButtonAddress(true);
        await axios.post(`${API_URL}/profile/addaddress`, values, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
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
        closeModal();
        getUserAddress();
      }
    },
  });

  const provinceHandleChange = async (e) => {
    // setnewAddressData({ ...newAddress, [e.target.name]: e.target.value });
    formik.handleChange(e);
    let res = await axios.get(`${API_URL}/profile/getcity/${e.target.value}`);
    setCityOption(res.data);
    console.log(e.target.value);
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
              <div>
                {val.address}, Kota {val.city[0].name}, {val.province[0].name}
              </div>
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
    <>
      {/* Navbar */}
      <div className="w-[375px] lg:w-[1349px] h-[812px] lg:h[1366px]">
        <Head>
          <title>Alamat Pengiriman | Healthymed</title>
        </Head>
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
              <FaUserCircle />
              <div className="text-base">{fullname}</div>
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
              <Link href="/userprofile/transactions">
                <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer">
                  <FaListUl /> Proses Pemesanan
                </div>
              </Link>

              <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer">
                <BsCashStack /> Metode Pembayaran
              </div>

              <Link href="/userprofile/address">
                <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer font-bold">
                  <IoLocationSharp /> Alamat Pengiriman
                </div>
              </Link>
            </div>
          </div>
          <div className="w-[900px]">
            <div className="flex h-[32px] items-center w-[72.6%] gap-9">
              <Link href="/userprofile/biodata">
                <button className="text-xl font-bold text-gray-400">
                  Biodata
                </button>
              </Link>
              <Link href="/userprofile/address">
                <button className="text-xl font-bold text-blackPrimary">
                  Alamat
                </button>
              </Link>
            </div>

            {/* Add Address */}
            <div>
              <div className="justify-between items-center flex mt-5 ">
                <div className="text-blackPrimary font-bold text-2xl">
                  Daftar Alamat
                </div>
                <button
                  onClick={onOpenAddress}
                  className="py-3 px-4 bg-cyan-500 text-white font-bold rounded-lg"
                >
                  Tambah Alamat
                </button>
              </div>

              {/* Address Card */}
            </div>
            {userAddress.length ? (
              <div className="h-[500px] overflow-y-auto mt-6 pb-10 border-2 border-gray-400 rounded-2xl px-6">
                {addressCard()}
              </div>
            ) : (
              <div className="h-[50px] mt-6 border-2 border-gray-400 rounded-2xl px-6 text-center pt-2 font-bold text-cyan-600 tracking-wider">
                Silahkan tambah alamat pengiriman
              </div>
            )}
          </div>
        </div>

        {/* Add Address modal */}
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
              <form onSubmit={formik.handleSubmit}>
                <FormLabel fontSize="xl" fontWeight="bold">
                  Label Alamat
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan nama alamat"
                  name="address_label"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address_label}
                />
                {formik.touched.address_label && formik.errors.address_label ? (
                  <p className="text-xs text-red-500 pt-1">
                    {formik.errors.address_label}
                  </p>
                ) : null}
                <FormLabel fontSize="xl" fontWeight="bold" mt={4} mb={4}>
                  Info Penerima
                </FormLabel>
                <FormLabel>Nama Penerima</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan nama penerima"
                  name="recipient_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recipient_name}
                />
                {formik.touched.recipient_name &&
                formik.errors.recipient_name ? (
                  <p className="text-xs text-red-500 pt-1">
                    {formik.errors.recipient_name}
                  </p>
                ) : null}
                <FormLabel mt={3}>Nomor HP</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan nomor telepon"
                  name="recipient_number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recipient_number}
                />
                {formik.touched.recipient_number &&
                formik.errors.recipient_number ? (
                  <p className="text-xs text-red-500 pt-1">
                    {formik.errors.recipient_number}
                  </p>
                ) : null}
                <FormLabel mt={3}>Provinsi</FormLabel>
                <Select
                  placeholder="Provinsi"
                  name="province_id"
                  onChange={provinceHandleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.province_id}
                >
                  {provinceOption.map((val, index) => {
                    return (
                      <option key={index} value={val.id}>
                        {val.name}
                      </option>
                    );
                  })}
                </Select>
                {formik.touched.province_id && formik.errors.province_id ? (
                  <p className="text-xs text-red-500 pt-1">
                    {formik.errors.province_id}
                  </p>
                ) : null}
                <FormLabel mt={3}>Kota/Kabupaten</FormLabel>
                <Select
                  placeholder="Kota"
                  name="city_id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isDisabled={formik.province_id == ""}
                  value={formik.values.city_id}
                >
                  {cityOption.map((val, index) => {
                    return (
                      <option key={index} value={val.id}>
                        {val.name}
                      </option>
                    );
                  })}
                </Select>
                {formik.touched.city_id && formik.errors.city_id ? (
                  <p className="text-xs text-red-500 pt-1">
                    {formik.errors.city_id}
                  </p>
                ) : null}
                <FormLabel mt={3}>Alamat</FormLabel>
                <Textarea
                  type="text"
                  placeholder="contoh : Jl. Gatot Subroto no. 12 RT 01/02"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  resize="none"
                />
                {formik.touched.address && formik.errors.address ? (
                  <p className="text-xs text-red-500 pt-1">
                    {formik.errors.address}
                  </p>
                ) : null}
                <Flex justify="end">
                  <Button
                    disabled={disableButtonAddress}
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
      </div>
      {/* Title */}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Address;
