import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { GrNext } from "react-icons/gr";
import API_URL from "../helpers/apiurl";
import { useFormik, useField } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import CreateTableSelect from "react-select/creatable";
import { useEffect } from "react";
import DatePicker from "react-datepicker/dist/react-datepicker";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Image from "next/image";

const ModalEditQuantityProduct = ({ isOpen, onClose, id, getLogData }) => {
  const toast = useToast();
  const [page, setPage] = useState(0);
  let token = Cookies.get("token");
  const mounted = useRef(false);

  const [loading, setLoading] = useState(true);

  const [optionsCategory, setOptionsCategory] = useState([]);
  const [optionsSymptom, setOptionsSymptom] = useState([]);
  const [optionsType, setOptionsType] = useState([]);

  const [buttonLoadingSubmit, setButtonLoadingSubmit] = useState(false);

  const [kuantitas, setKuantitas] = useState(0);

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  const [selectedImage, setselectedImage] = useState([]);

  // postingan

  const formik = useFormik({
    initialValues: {
      quantity: 0,
      expired_at: new Date(), //stock table
    },

    validationSchema: Yup.object({
      quantity: Yup.number().required("Required"),
      expired_at: Yup.date("Input Date!").required("Required").nullable(),
    }),
  });

  const submitHandler = async () => {
    try {
      setButtonLoadingSubmit(true);
      let res = await axios.post(
        `${API_URL}/product/update-stock`,
        {
          expired_at: formik.values.expired_at.toISOString().substring(0, 10),
          quantity: kuantitas,
          product_id: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setPage(3);
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: error.response.data.message || "network error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      getLogData();
      setButtonLoadingSubmit(false);
    }
  };

  const getQuantity = async () => {
    try {
      let res = await axios.post(`${API_URL}/product/get-quantity-product`, {
        expired_at: formik.values.expired_at.toISOString().substring(0, 10),
        product_id: id,
      });

      console.log(formik.values.expired_at);

      setKuantitas(res.data.result.quantity);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (mounted.current) {
      getQuantity();
    }
    mounted.current = true;
    () => {};
  }, [formik.values.expired_at]);

  console.log(page, "ini page berapa");

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent maxWidth="792px">
            <ModalHeader>
              {page == 4 ? null : `Edit Kuantitas ${id}`}
            </ModalHeader>
            <ModalCloseButton
              _focus={{ boxShadow: "none" }}
              onClick={() => {
                setPage(0);
              }}
            />

            <ModalBody display="flex" flexDirection="column">
              {/* Bread Crumbs */}
              <div
                className={`flex items-center pb-[28px] ${
                  page == 3 ? "hidden" : null
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`flex w-[18px] h-[18px] rounded-full ${
                      page == 0 ? "bg-blackPrimary" : "bg-grayDisable"
                    } bg-blackPrimary justify-center text-white text-xs font-bold`}
                  >
                    1
                  </div>
                  <div
                    className={`ml-1 ${
                      page == 0 ? "text-blackPrimary" : "text-grayDisable"
                    } font-normal text-sm`}
                  >
                    Update Stock
                  </div>
                </div>
              </div>
              <div className="flex">
                <div></div>
              </div>

              {/* Input */}

              {/* page Detail Obat */}
              <div className={`flex-row ${page !== 0 ? "hidden" : null}`}>
                <div className="flex items-center my-2">
                  <p className=" flex w-[154px]">Kuantitas</p>

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
                    onChange={(value) => setKuantitas(value)}
                    value={kuantitas}
                  >
                    <NumberInputField
                      name="kuantitas"
                      rounded="none"
                      w="100px"
                      h="32px"
                    />
                  </NumberInput>
                  <Button
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
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Expired</p>
                  <DatePicker
                    name="expired_at"
                    className="ml-7 pl-2 w-[226px] h-[32px] border-[1px] border-grayDisable rounded-md focus:outline-blue-500 transition ease-in-out delay-150 duration-300"
                    onChange={(value) =>
                      formik.setFieldValue("expired_at", value)
                    }
                    selected={formik.values.expired_at}
                    onBlur={() => formik.setFieldTouched("expired_at", true)}
                    value={formik.values.expired_at}
                    dateFormat="dd-MM-yyyy"
                  />
                  {formik.touched.expired_at && formik.errors.expired_at ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.expired_at}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Page Success */}
              <div
                className={`flex-col items-center mx-auto ${
                  page !== 3 ? "hidden" : null
                }`}
              >
                <Image
                  className=""
                  src="/successInputProduct.svg"
                  width="300px"
                  height="300px"
                />

                <p className="font-bold text-lg text-center">
                  Obat Berhasil Diedit!
                </p>
                <p className="text-md text-center">
                  Jumlah stok diperbaharui secara otomatis
                </p>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="fillCustom"
                w="156px"
                h="42px"
                onClick={submitHandler}
                isLoading={buttonLoadingSubmit}
                hidden={page == 3}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ModalEditQuantityProduct;
