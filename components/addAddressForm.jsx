import { IoIosArrowBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SearchBar from "../components/searchbar";
import { FormLabel, Input, Button, Select, Textarea } from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddAddress = () => {
  const [disableButtonAddress, setDisableButtonAddress] = useState(false);
  const [provinceOption, setProvinceOption] = useState([]);
  const [cityOption, setCityOption] = useState([]);

  //Get token
  let token = Cookies.get("token");

  //Get province and city options
  const getProvinceData = async () => {
    let res = await axios.get(`${API_URL}/profile/getprovince`);
    setProvinceOption(res.data);
  };

  useEffect(() => {
    getProvinceData();
  }, []);

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
        <form onSubmit={formik.handleSubmit}>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address_label}
              />
              {formik.touched.address_label && formik.errors.address_label ? (
                <p className="text-xs text-red-500 pt-1">
                  {formik.errors.address_label}
                </p>
              ) : null}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.recipient_name}
            />
            {formik.touched.recipient_name && formik.errors.recipient_name ? (
              <p className="text-xs text-red-500 pt-1">
                {formik.errors.recipient_name}
              </p>
            ) : null}
            <FormLabel fontSize="12px" mt="20px">
              Nomor HP
            </FormLabel>
            <Input
              type="text"
              placeholder="Masukkan nomor telepon"
              name="recipient_number"
              w="328px"
              h="36px"
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
            <FormLabel fontSize="12px" mt="20px">
              Kota/Kabupaten
            </FormLabel>
            <Select
              placeholder="Kota"
              name="city_id"
              w="328px"
              h="36px"
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
            <FormLabel fontSize="12px" mt="20px">
              Alamat
            </FormLabel>
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
          </div>
          <div className="flex gap-2 mt-[86px] mx-[24px]">
            <div>
              <Button
                type="button"
                variant={"outlineCustom"}
                w={"157px"}
                h={"48px"}
              >
                Batalkan
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                variant={"fillCustom"}
                w={"157px"}
                h={"48px"}
                disabled={disableButtonAddress}
              >
                Simpan Alamat
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden lg:inline-block h-[668px] w-full mx-[412px]">
        <form onSubmit={formik.handleSubmit}>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address_label}
            />
            {formik.touched.address_label && formik.errors.address_label ? (
              <p className="text-xs text-red-500 pt-1">
                {formik.errors.address_label}
              </p>
            ) : null}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.recipient_name}
            />
            {formik.touched.recipient_name && formik.errors.recipient_name ? (
              <p className="text-xs text-red-500 pt-1">
                {formik.errors.recipient_name}
              </p>
            ) : null}
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
            <FormLabel fontSize="14px" mt="36px">
              Provinsi
            </FormLabel>
            <Select
              placeholder="Provinsi"
              name="province_id"
              w="616px"
              h="44px"
              mt="16px"
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
            <FormLabel fontSize="14px" mt="36px">
              Kota/Kabupaten
            </FormLabel>
            <Select
              placeholder="Kota"
              name="city_id"
              w="616px"
              h="44px"
              mt="16px"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isDisabled={formik.values.province_id == ""}
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
            <FormLabel fontSize="14px" mt="36px">
              Alamat
            </FormLabel>
            <Textarea
              type="text"
              placeholder="contoh : Jl. Gatot Subroto no. 12 RT 01/02"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              resize="none"
              mt="16px"
              w="616px"
            />
            {formik.touched.address && formik.errors.address ? (
              <p className="text-xs text-red-500 pt-1">
                {formik.errors.address}
              </p>
            ) : null}
          </div>
          <div className="flex gap-2 mt-[68px] mx-[26px]">
            <div>
              <Button
                type="button"
                variant={"outlineCustom"}
                w={"300px"}
                h={"52px"}
              >
                Batalkan
              </Button>
            </div>
            <div>
              <Button
                disabled={disableButtonAddress}
                variant={"fillCustom"}
                w={"300px"}
                h={"52px"}
                type="submit"
              >
                Simpan Alamat
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden lg:inline-block mt-[158px]">
        <Footer />
      </div>
    </div>
  );
};

export default AddAddress;
