import { BsChatDotsFill, BsClock } from "react-icons/bs";
import { Button, Checkbox } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import Select from "react-select";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import { useState, useEffect, useCallback } from "react";
const dayjs = require("dayjs");
import { toast } from "react-toastify";
import Slider from "react-slick";
import PrevArrowPrescription from "./prevArrowPrescription";
import NextArrowPrescription from "./nextArrowPrescription";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const TransactionCardCard = ({
  transaction_id,
  transaction_code,
  index,
  created_at,
  expired_at,
  prescription,
  username,
  fullname,
  address,
  status,
  getTransactionCard,
  submitPrescription,
  total_price,
  options,
  orderedProduct,
}) => {
  // const [drugs, setDrugs] = useState([]);
  const [inputDrugs, setInputDrugs] = useState(null);
  const [dataDrugs, setDataDrugs] = useState([]);
  const [qty, setQty] = useState(0);
  // const [options, setOptions] = useState([]);
  const [inputName, setInputName] = useState({
    patient: "",
    physician: "",
  });
  const [dosage, setDosage] = useState("");
  // const [orderedProduct, setOrderedProduct] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();
  const {
    isOpen: isOpenAccept,
    onOpen: onOpenAccept,
    onClose: onCloseAccept,
  } = useDisclosure();

  //Get Product List
  // const getProductList = async () => {
  //   let res = await axios.get(`${API_URL}/product/get-prescription-product`);
  //   console.log(res.data);
  //   let drugsMap = res.data;
  //   //Select List
  //   const drugsData = drugsMap.map((val, index) => {
  //     return {
  //       value: {
  //         category: val.categories.map((category) => {
  //           return category.name;
  //         }),
  //         unit: val.unit,
  //         id_obat: val.id,
  //         drug_name: val.name,
  //         total_stock: val.total_stock,
  //       },
  //       label: val.name,
  //     };
  //   });
  //   setDrugs(drugsMap);
  //   setOptions(drugsData);
  //   // console.log(drugsData, "ini options");
  // };

  //Get Ordered Product
  // const getOrderedProduct = async (id) => {
  //   try {
  //     let productData = await axios.get(
  //       `${API_URL}/transaction/transaction-detail/${id}`
  //     );
  //     setOrderedProduct(productData.data);

  //     console.log(productData.data, "ini product data pesanan");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //Submit Prescription Copy
  // const submitPrescription = async (id) => {
  //   try {
  //     await axios.post(`${API_URL}/transaction/submitprescription/${id}`, {
  //       prescription_values: dataDrugs,
  //     });
  //     toast.success("Prescription successfully submitted!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response.data.message || "Network Error", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   } finally {
  //     onClose();
  //     // setTimeout(() => {
  //     //   getTransactionCard();
  //     // }, 500);
  //   }
  // };

  //Trigger Function onOpen
  // const openModalTrigger = () => {
  //   getOrderedProduct(transaction_id);
  //   onOpenDetail();
  // };

  //Submit Prescription
  const submitPrescriptionOnClose = async () => {
    await submitPrescription(transaction_id, dataDrugs);
    onClose();
  };

  //Input Obat Handle Change
  const selectHandleChange = (e) => {
    setInputDrugs(e);
  };

  const quantityHandleChange = (e) => {
    setQty(e);
  };

  //Input name Handle Change
  const inputNameHandleChange = (e) => {
    setInputName({ ...inputName, [e.target.name]: e.target.value });
  };

  //Input Dosage Handle Change
  const dosageHandleChange = (e) => {
    setDosage(e.target.value);
  };

  const test = () => {
    setDataDrugs([
      ...dataDrugs,
      {
        unit: inputDrugs.value.unit,
        quantity: qty,
        id_obat: inputDrugs.value.id_obat,
        category: inputDrugs.value.category,
        drug_name: inputDrugs.value.drug_name,
        total_stock: inputDrugs.value.total_stock,
        patient: inputName.patient,
        physician_in_charge: inputName.physician,
        dosage: dosage,
      },
    ]);
    setInputDrugs(null);
    setQty(0);
  };

  // useEffect(() => {
  //   // getProductList();
  //   getOrderedProduct(transaction_id);
  // }, []);

  //Carousel
  const PrescriptionImageCarousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrowPrescription />,
      prevArrow: <PrevArrowPrescription />,
    };
    return (
      <Slider {...settings}>
        {prescription.map((val, id) => {
          return (
            <Zoom>
              <img
                key={id}
                className="h-[427px] object-contain rounded-lg"
                src={`${API_URL}${val.img}`}
              />
            </Zoom>
          );
        })}
      </Slider>
    );
  };

  //Prescription Summary
  const renderRingkasanResep = () => {
    return dataDrugs.map((val, index) => {
      return (
        <div
          className={`flex ${
            index % 2 == 0 ? "bg-white" : "bg-[#F6FAFB]"
          } text-blackPrimary border-x-2 border-gray-400 ${
            index == dataDrugs.length - 1
              ? "border-b-2 rounded-b-lg border-gray-400"
              : null
          } text-[14px]`}
        >
          <div className="w-[50px] text-center h-[31px] pt-1">{index + 1}</div>
          <div className="w-[100px] text-left h-[31px] pt-1 truncate">
            {val.drug_name}
          </div>
          <div className="w-[180px] h-[35px] pt-1 pb-1">
            <div className="w-[175px] h-[30px] flex">
              {val.category.map((cat, id) => {
                return (
                  <div
                    className="bg-blackPrimary p-1 w-fit ml-1 truncate rounded-lg text-white"
                    key={id}
                  >
                    {cat}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-[125px] h-[31px] pt-1 text-center">
            {val.quantity}
          </div>
          <div className="w-[125px] text-center h-[31px] pt-1">{val.unit}</div>
          <div className="w-[125px] text-center h-fit pt-1">{val.dosage}</div>
          <div className="w-[125px] text-center h-[31px] pt-1">
            <Button
              w="50px"
              h="24px"
              fontSize="10px"
              variant={"outlineCustom"}
              onClick={() => {
                setDataDrugs(dataDrugs.filter((e) => e !== val));
              }}
            >
              Hapus
            </Button>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div
        key={index}
        className="w-[997px] h-[287px] bg-white rounded-xl drop-shadow-lg mt-[32px]"
      >
        <div className="h-[57px] px-[26px] py-[15px] flex justify-between border-b-2 border-gray-400">
          <div className="flex items-center gap-[15px] text-[16px]">
            <div className="">
              <div className="flex items-center gap-[12px]">
                <Checkbox />
                <p className="font-bold">Pesanan Baru</p>
              </div>
            </div>

            <div className="font-bold">
              /&nbsp;&nbsp;{transaction_code}&nbsp;&nbsp;/
            </div>
            <div className="flex text-[16px] items-center gap-2">
              <span>
                <BsClock />
              </span>
              {dayjs(created_at).format("DD MMM YYYY, HH:mm WIB")}
            </div>
          </div>
          <div
            className="flex gap-[12px] text-[16px] items-center"
            hidden={status == "MENUNGGU_PEMBAYARAN" ? true : false}
          >
            <div className="font-bold">Respon sebelum</div>
            <div className="w-[164px] h-[28px] bg-orange-200 p-1.5 rounded-md text-[12px] flex items-center gap-2">
              <span>
                <BsClock />
              </span>
              {dayjs(expired_at).format("DD MMM YYYY, HH:mm WIB")}
            </div>
          </div>
        </div>

        <div className="h-[94px] px-[26px] bg-white">
          <div className="flex gap-[25px]">
            <div className="mt-[19px]">
              <div className="flex gap-[30px]">
                <div className="w-[75px] h-[75px] rounded-lg">
                  {
                    prescription.length > 0 && orderedProduct.length <= 0 ? (
                      prescription.slice(0, 1).map((val, i) => {
                        return (
                          <img
                            key={i}
                            className="w-[75px] h-[75px] rounded-lg"
                            src={`${API_URL}${val.img}`}
                          />
                        );
                      })
                    ) : (
                      // orderedProduct.slice(0, 1).map((val, i) => {
                      //     return (
                      <img
                        className="w-[75px] h-[75px] rounded-lg"
                        src={`${API_URL}${orderedProduct[0].image}`}
                      />
                    )
                    // );
                    // })
                  }
                </div>
                {prescription.length > 0 && orderedProduct.length <= 0 ? (
                  <div className="flex flex-col w-[216px] border-r-2 border-gray-400">
                    <div className="text-[14px] font-bold">Resep Dokter</div>
                    <div className="mt-[4px]">
                      {status == "MENUNGGU_KONFIRMASI" ? (
                        <Button
                          onClick={onOpen}
                          fontSize="12px"
                          variant={"fillCustom"}
                          w="123px"
                          h="23px"
                        >
                          Buat Salinan Resep
                        </Button>
                      ) : (
                        <Button
                          onClick={onOpen}
                          fontSize="12px"
                          variant={"fillCustom"}
                          w="123px"
                          h="23px"
                          disabled
                        >
                          Buat Salinan Resep
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  //   orderedProduct.slice(0, 1).map((val, index) => {
                  <div className="flex flex-col w-[216px] border-r-2 border-gray-400">
                    <div className="text-[14px] font-bold">
                      {orderedProduct[0].name}
                    </div>
                    <div className="text-[12px] mt-[2px]">
                      {orderedProduct[0].quantity} x {orderedProduct[0].price}
                    </div>
                  </div>
                  //   })
                )}
              </div>
            </div>
            <div className="mt-[19px] w-[95px] ml-[20px]">
              <div className="flex flex-col text-[14px]">
                <div className="font-bold">Pembeli</div>
                <div>{fullname ? fullname : username}</div>
              </div>
            </div>
            <div className="mt-[19px] w-[244px] ml-[20px]">
              <div className="flex flex-col text-[14px]">
                <div className="font-bold">Alamat</div>
                <div>{address}</div>
              </div>
            </div>
            <div className="mt-[19px]">
              <div className="flex flex-col text-[14px]">
                <div className="font-bold">Kurir</div>
                <div>Grab Same Day</div>
              </div>
            </div>
          </div>
        </div>

        {prescription.length && orderedProduct.length <= 0 ? (
          <div className="h-[48px] bg-[#F6FAFB] mx-[26px] mt-[16px] flex justify-between items-center py-3 px-4">
            <div className="flex gap-[8px] items-center">
              <div className="text-[16px] font-bold">Resep Dokter</div>
              <div className="text-[12px]"></div>
            </div>
            <div className="text-[16px] font-bold"></div>
          </div>
        ) : (
          <div className="h-[48px] bg-[#F6FAFB] mx-[26px] mt-[16px] flex justify-between items-center py-3 px-4">
            <div className="flex gap-[8px] items-center">
              <div className="text-[16px] font-bold">Total Harga</div>
              <div className="text-[12px]">{orderedProduct.length} Obat</div>
            </div>
            <div className="text-[16px] font-bold">{total_price}</div>
          </div>
        )}

        <div className="flex justify-between mx-[26px] mt-[26px]">
          <div className="flex items-center gap-[32px]">
            <div className="flex items-center gap-[8px]">
              <div>
                <BsChatDotsFill />
              </div>
              <div className="text-[14px] font-bold">Chat Pembeli</div>
            </div>
            <div className="flex items-center gap-[8px]">
              <div>
                <img
                  className="text-blackPrimary"
                  src="/Transaction1.svg"
                  alt=""
                />
              </div>
              <div
                onClick={onOpenDetail}
                className="text-[14px] font-bold hover:cursor-pointer"
              >
                Detail Pesanan
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div>
              {status == "MENUNGGU_KONFIRMASI" ? (
                <Button
                  w="156px"
                  h="32px"
                  fontSize="14px"
                  variant="outlineCustom"
                >
                  Tolak Pesanan
                </Button>
              ) : null}
            </div>
            <div>
              {prescription.length > 0 && status == "MENUNGGU_KONFIRMASI" ? (
                <Button
                  w="156px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  onClick={onOpen}
                >
                  Buat Salinan Resep
                </Button>
              ) : null}
              {prescription.length > 0 && status == "DITERIMA" ? (
                <Button
                  w="180px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  disabled
                >
                  Menunggu Pembayaran
                </Button>
              ) : null}
              {prescription.length > 0 && status == "DITOLAK" ? (
                <Button
                  w="156px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  disabled
                >
                  Pesanan Ditolak
                </Button>
              ) : null}
              {prescription.length > 0 && status == "MENUNGGU_PEMBAYARAN" ? (
                <Button
                  w="180px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  disabled
                >
                  Menunggu Pembayaran
                </Button>
              ) : null}
              {prescription.length > 0 && status == "DIPROSES" ? (
                <Button w="156px" h="32px" fontSize="14px" variant="fillCustom">
                  Kirim Pesanan
                </Button>
              ) : null}
              {prescription.length > 0 && status == "DIKIRIM" ? (
                <Button
                  w="156px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  disabled
                >
                  Proses Pengiriman
                </Button>
              ) : null}
              {prescription.length > 0 && status == "SELESAI" ? (
                <Button
                  w="156px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  disabled
                >
                  Selesai
                </Button>
              ) : null}
              {status == "MENUNGGU_KONFIRMASI" && prescription.length <= 0 ? (
                <Button
                  w="156px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  onClick={onOpenAccept}
                >
                  Terima Pesanan
                </Button>
              ) : null}
              {status == "DITERIMA" && prescription.length <= 0 ? (
                <Button w="156px" h="32px" fontSize="14px" variant="fillCustom">
                  Menunggu Pembayaran
                </Button>
              ) : null}
              {status == "DITOLAK" && prescription.length <= 0 ? (
                <Button
                  w="156px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  disabled
                >
                  Pesanan Ditolak
                </Button>
              ) : null}
              {status == "MENUNGGU_PEMBAYARAN" && prescription.length <= 0 ? (
                <Button
                  w="180px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  disabled
                >
                  Menunggu Pembayaran
                </Button>
              ) : null}
              {status == "DIPROSES" && prescription.length <= 0 ? (
                <Button w="180px" h="32px" fontSize="14px" variant="fillCustom">
                  Kirim Pesanan
                </Button>
              ) : null}
              {status == "DIKIRIM" && prescription.length <= 0 ? (
                <Button
                  w="180px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  disabled
                >
                  Proses Pengiriman
                </Button>
              ) : null}
              {status == "SELESAI" && prescription.length <= 0 ? (
                <Button
                  w="156px"
                  h="32px"
                  fontSize="14px"
                  variant="fillCustom"
                  disabled
                >
                  Selesai
                </Button>
              ) : null}
              {status == "DIBATALKAN" && prescription.length <= 0 ? (
                <Button w="156px" h="32px" fontSize="14px" variant="fillCustom">
                  Dibatalkan
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Salin Resep*/}
      <Modal
        size={"3xl"}
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Salinan Resep</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <div className="flex">
                <div className="h-[427px] w-[312px]">
                  <div className="z-20">{PrescriptionImageCarousel()}</div>
                </div>
                <div className="w-[448px] flex flex-col">
                  <div className="flex mx-[16px] mt-[14px]">
                    <div className="flex flex-col">
                      <FormLabel fontSize="12px" fontWeight="bold">
                        No. Pemesanan
                      </FormLabel>
                      <div className="w-[183px] h-[24px]">
                        {transaction_code}
                      </div>
                    </div>
                    <div className="flex flex-col ml-[18px]">
                      <FormLabel fontSize="12px" fontWeight="bold">
                        Tgl. Pemesanan
                      </FormLabel>
                      <div className="w-[183px] h-[24px]">
                        {dayjs(created_at).format("DD MMM YYYY")}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-[16px] mx-[16px]">
                    <FormLabel fontSize="12px" fontWeight="bold">
                      Nama Pasien
                    </FormLabel>
                    <Input
                      w="384px"
                      h="24px"
                      placeholder="Nama Pasien"
                      name="patient"
                      _placeholder={{ fontSize: "12px" }}
                      onChange={inputNameHandleChange}
                      value={inputName.patient}
                      fontSize="12px"
                    />
                  </div>

                  <div className="flex flex-col mt-[16px] mx-[16px] pb-[16px] border-b-2 ">
                    <FormLabel fontSize="12px" fontWeight="bold">
                      Nama Dokter
                    </FormLabel>
                    <Input
                      w="384px"
                      h="24px"
                      placeholder="Nama Dokter"
                      name="physician"
                      _placeholder={{ fontSize: "12px" }}
                      onChange={inputNameHandleChange}
                      value={inputName.physician}
                      fontSize="12px"
                    />
                  </div>

                  <div className="w-fit text-[12px] font-bold border-b-2 border-blackPrimary mx-[16px] mt-[16px]">
                    Tambah Obat
                  </div>

                  <div className="flex flex-col mt-[16px] mx-[16px] pb-[16px]">
                    <FormLabel fontSize="12px" fontWeight="bold">
                      Nama Obat
                    </FormLabel>
                    <Select
                      isClearable
                      isSearchable
                      placeholder="Select Drugs"
                      value={inputDrugs}
                      className="w-[384px] h-[24px]"
                      options={options}
                      onChange={selectHandleChange}
                    />

                    {/* <Select
                      w="384px"
                      h="24px"
                      placeholder="Masukkan nama obat"
                    ></Select> */}
                  </div>

                  <div className="flex gap-[19px] mx-[16px] mt-[16px]">
                    <div className="flex flex-col gap-[8px]">
                      <div className="text-[12px] font-bold">Kuantitas</div>
                      <NumberInput
                        defaultValue={0}
                        min={0}
                        value={qty}
                        onChange={quantityHandleChange}
                        max={inputDrugs ? inputDrugs.value.total_stock : 0}
                      >
                        <NumberInputField
                          w="80px"
                          h="38px"
                          borderRadius="base"
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                      <div className="text-[12px] font-bold">Dosis</div>
                      <Input
                        value={dosage}
                        h="38px"
                        onChange={dosageHandleChange}
                      />
                    </div>
                    {/* <div className="flex flex-col gap-[8px]">
                      <div className="text-[12px] font-bold">Dosis</div>
                      <Select w="134px" h="24px" placeholder="Dosis"></Select>
                    </div> */}
                  </div>

                  <div className="mt-[18px] flex justify-end mr-[8px] pb-5 border-b-2 border-gray-400">
                    <Button
                      w="106px"
                      h="24px"
                      fontSize="10px"
                      variant={"fillCustom"}
                      onClick={() => {
                        test();
                      }}
                      disabled={!inputDrugs || qty < 1}
                    >
                      Tambahkan Obat
                    </Button>
                  </div>
                </div>
              </div>

              {dataDrugs.length ? (
                <>
                  <div className="mt-3 mb-3 text-[12px]">Ringkasan Resep</div>
                  <div className="flex rounded-t-lg bg-blackPrimary border-x-2 border-blackPrimary text-white text-[14px]">
                    <div className="w-[50px] text-center h-[31px] pt-1">No</div>
                    <div className="w-[100px] text-left h-[31px] pt-1">
                      Nama Obat
                    </div>
                    <div className="w-[180px] text-left h-[31px] pt-1">
                      Kategori
                    </div>
                    <div className="w-[125px] text-center h-[31px] pt-1">
                      Kuantitas
                    </div>
                    <div className="w-[125px] text-center h-[31px] pt-1">
                      Satuan
                    </div>
                    <div className="w-[125px] text-center h-[31px] pt-1">
                      Dosis
                    </div>
                    <div className="w-[125px] text-center h-[31px] pt-1">
                      Hapus
                    </div>
                  </div>
                  {renderRingkasanResep()}
                </>
              ) : null}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="outlineCustom" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="fillCustom"
              onClick={() => {
                submitPrescriptionOnClose;
              }}
            >
              Terima Pesanan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Detail Pesanan */}
      <Modal
        isOpen={isOpenDetail}
        scrollBehavior="inside"
        onClose={onCloseDetail}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detail Pesanan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full pb-5 flex justify-between items-center border-b-2 border-gray-400">
              <div className="flex text-[16px] gap-2">
                <div className=" font-bold border-r-2 border-gray-400 pr-2">
                  {transaction_code}
                </div>
                <div className="flex items-center gap-2">
                  {" "}
                  <span>
                    <BsClock />
                  </span>
                  {dayjs(created_at).format("DD MMM YYYY, HH:mm WIB")}
                </div>
              </div>
              <div
                className="flex items-center gap-3"
                hidden={status == "MENUNGGU_PEMBAYARAN" ? true : false}
              >
                <div className="font-bold">Respon sebelum</div>
                <div className="w-[164px] h-[28px] bg-orange-200 p-1.5 rounded-md text-[12px] flex items-center gap-2">
                  <span>
                    <BsClock />
                  </span>
                  {dayjs(expired_at).format("DD MMM YYYY, HH:mm WIB")}
                </div>
              </div>
            </div>

            <div className="flex gap-10 mt-5">
              <div className="flex flex-col gap-4">
                {prescription.length > 0 && orderedProduct <= 0
                  ? prescription.map((val, i) => {
                      return (
                        <div className="flex items-center gap-4 bg-white drop-shadow-lg rounded-lg p-4">
                          <img
                            key={i}
                            className="w-[75px] h-[75px] rounded-lg"
                            src={`${API_URL}${val.img}`}
                          />
                          <div>
                            Prescription no. <span>{i + 1}</span>
                          </div>
                        </div>
                      );
                    })
                  : orderedProduct.map((val, i) => {
                      return (
                        <div className="flex items-center gap-4 bg-white drop-shadow-lg rounded-lg p-4">
                          <img
                            key={i}
                            className="w-[75px] h-[75px] rounded-lg"
                            src={`${API_URL}${val.image}`}
                          />
                          <div>
                            <div className="text-[14px] font-bold">
                              {val.name}
                            </div>
                            <div className="text-[12px] mt-[2px]">
                              {val.quantity} x {val.price}
                            </div>
                            <div className="text-[12px] mt-[2px]">
                              {val.dosage ? val.dosage : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
              <div className="pb-5 bg-white drop-shadow-lg rounded-lg h-fit pr-5">
                <div className="flex gap-10">
                  <div className="mt-[19px] w-fit ml-[20px]">
                    <div className="flex flex-col text-[14px]">
                      <div className="font-bold">Pembeli</div>
                      <div>{fullname ? fullname : username}</div>
                    </div>
                  </div>
                  <div className="mt-[19px] w-fit ml-[20px]">
                    <div className="flex flex-col text-[14px]">
                      <div className="font-bold">Alamat</div>
                      <div>{address}</div>
                    </div>
                  </div>
                  <div className="mt-[19px]">
                    <div className="flex flex-col text-[14px] ml-[20px]">
                      <div className="font-bold">Kurir</div>
                      <div>Grab Same Day</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseDetail}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenAccept}
        scrollBehavior="inside"
        onClose={onCloseAccept}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex justify-center mt-10">
              <div>
                <div className="text-center text-[20px]">Terima Pesanan</div>
                <div className="text-center text-[14px] font-thin">
                  Stok akan berkurang secara otomatis setelah pesanan diterima
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full pb-5 flex justify-between items-center">
              <div className="flex text-[14px] gap-2">
                <div className="font-bold">
                  {fullname ? fullname : username}&nbsp;&nbsp;/
                </div>
                <div className=" font-bold pr-2">
                  {transaction_code}&nbsp;&nbsp;
                  <span className="font-thin">/</span>
                </div>
                <div className="flex items-center gap-2">
                  {" "}
                  <span>
                    <BsClock />
                  </span>
                  {dayjs(created_at).format("DD MMM YYYY, HH:mm WIB")}
                </div>
              </div>
            </div>

            <div className="flex gap-10 mt-5">
              <div className="flex flex-col gap-4">
                {prescription.map((val, i) => {
                  return (
                    <div className="flex items-center gap-4 bg-white drop-shadow-lg rounded-lg p-4">
                      <img
                        key={i}
                        className="w-[75px] h-[75px] rounded-lg"
                        src={`${API_URL}${val.img}`}
                      />
                      <div>
                        Prescription no. <span>{i + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pb-5 bg-white drop-shadow-lg rounded-lg h-fit pr-5">
                <div className="flex gap-10">
                  <div className="mt-[19px] w-fit ml-[20px]">
                    <div className="flex flex-col text-[14px]">
                      <div className="font-bold">Pembeli</div>
                      <div>{fullname ? fullname : username}</div>
                    </div>
                  </div>
                  <div className="mt-[19px] w-fit ml-[20px]">
                    <div className="flex flex-col text-[14px]">
                      <div className="font-bold">Alamat</div>
                      <div>{address}</div>
                    </div>
                  </div>
                  <div className="mt-[19px]">
                    <div className="flex flex-col text-[14px] ml-[20px]">
                      <div className="font-bold">Kurir</div>
                      <div>Grab Same Day</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Terima Pesanan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TransactionCardCard;
