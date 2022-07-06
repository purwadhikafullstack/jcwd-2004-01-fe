import { BsChatDotsFill } from "react-icons/bs";
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
import { useState, useEffect } from "react";

const TransactionCard = ({ prescription }) => {
  const [drugs, setDrugs] = useState([]);
  const [inputDrugs, setInputDrugs] = useState(null);
  const [dataDrugs, setDataDrugs] = useState([]);
  const [qty, setQty] = useState(0);
  const [options, setOptions] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  //Get Product List
  const getProductList = async () => {
    let res = await axios.get(`${API_URL}/product/get-prescription-product`);
    console.log(res.data);
    let drugsMap = res.data;
    //Select List
    const drugsData = drugsMap.map((val, index) => {
      return {
        value: {
          category: val.categories.map((category) => {
            return category.name;
          }),
          unit: val.unit,
          id_obat: val.id,
          drug_name: val.name,
        },
        label: val.name,
      };
    });
    setDrugs(drugsMap);
    setOptions(drugsData);
    console.log(drugsData, "ini options");
  };

  //Input Obat
  const selectHandleChange = (e) => {
    // console.log(e.value, "dot value");
    setInputDrugs(e);
  };

  const quantityHandleChange = (e) => {
    setQty(e);
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
      },
    ]);
    setInputDrugs(null);
    setQty(0);
  };

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    console.log(inputDrugs, "ini inputDrugs");
    console.log(dataDrugs, "ini DataDrugs");
  });

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
    <>
      <div className="w-[997px] h-[287px] bg-white rounded-xl drop-shadow-lg mt-[32px]">
        <div className="h-[57px] px-[26px] py-[15px] flex justify-between border-b-2 border-gray-400">
          <div className="flex gap-[15px] text-[16px]">
            <div className="">
              <div className="flex items-center gap-[12px]">
                <Checkbox />
                <p className="font-bold">Pesanan Baru</p>
              </div>
            </div>

            <div className="font-bold">/ HTMEDXWXQWE</div>
            <div>/ DATETIME</div>
          </div>
          <div className="flex gap-[12px] text-[16px] items-center">
            <div className="font-bold">Respon sebelum</div>
            <div className="w-[164px] h-[28px] bg-orange-200 p-1.5 rounded-md text-[12px]">
              NGIDE TOT
            </div>
          </div>
        </div>

        <div className="h-[94px] px-[26px] bg-white">
          <div className="flex gap-[25px]">
            <div className="mt-[19px]">
              <div className="flex gap-[30px]">
                <div className="w-[75px] h-[75px] rounded-lg border-2">
                  Image
                </div>
                {!prescription ? (
                  <div className="flex flex-col w-[216px] border-r-2 border-gray-400">
                    <div className="text-[14px] font-bold">Resep Dokter</div>
                    <div className="mt-[8px]">
                      <Button
                        onClick={onOpen}
                        fontSize="12px"
                        variant={"fillCustom"}
                        w="123px"
                        h="23px"
                      >
                        Buat Salinan Resep
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-[216px] border-r-2 border-gray-400">
                    <div className="text-[14px] font-bold">
                      Sanmol 500 gr 4 Tablet
                    </div>
                    <div className="text-[12px] mt-[2px]">2 x 13.000</div>
                    <div className="text-[12px] font-bold mt-[13px]">
                      Dropdown ngasal
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-[19px] w-[95px] ml-[20px]">
              <div className="flex flex-col text-[14px]">
                <div className="font-bold">Pembeli</div>
                <div>Alex Turner</div>
              </div>
            </div>
            <div className="mt-[19px] w-[244px] ml-[20px]">
              <div className="flex flex-col text-[14px]">
                <div className="font-bold">Alamat</div>
                <div>Jl. Tebet Barat Dalam 6, Tebet, Jakarta Selatan</div>
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

        <div className="h-[48px] bg-[#F6FAFB] mx-[26px] mt-[16px] flex justify-between items-center py-3 px-4">
          <div className="flex gap-[8px] items-center">
            <div className="text-[16px] font-bold">Total Harga</div>
            <div className="text-[12px]">(4 Obat)</div>
          </div>
          <div className="text-[16px] font-bold">Rp. 37.000</div>
        </div>

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
              <div className="text-[14px] font-bold">Detail Pesanan</div>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div>
              <Button
                w="156px"
                h="32px"
                fontSize="14px"
                variant="outlineCustom"
              >
                Tolak Pesanan
              </Button>
            </div>
            <div>
              <Button w="156px" h="32px" fontSize="14px" variant="fillCustom">
                Terima Pesanan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
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
                <div className="h-[427px] w-[312px] bg-yellow-500">KONs</div>
                <div className="w-[448px] bg-green-500 flex flex-col">
                  <div className="flex mx-[16px] mt-[14px]">
                    <div className="flex flex-col">
                      <FormLabel fontSize="12px" fontWeight="bold">
                        No. Pemesanan
                      </FormLabel>
                      <div className="w-[183px] h-[24px] bg-pink-500">
                        no pemesanan
                      </div>
                    </div>
                    <div className="flex flex-col ml-[18px]">
                      <FormLabel fontSize="12px" fontWeight="bold">
                        Tgl. Pemesanan
                      </FormLabel>
                      <div className="w-[183px] h-[24px] bg-pink-500">
                        tgl pemesanan
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-[16px] mx-[16px]">
                    <FormLabel fontSize="12px" fontWeight="bold">
                      Nama Pasien
                    </FormLabel>
                    <div className="w-[384px] h-[24px] bg-pink-500">
                      nama pasien
                    </div>
                  </div>

                  <div className="flex flex-col mt-[16px] mx-[16px] pb-[16px] border-b-2 border-gray-400">
                    <FormLabel fontSize="12px" fontWeight="bold">
                      Nama Dokter
                    </FormLabel>
                    <div className="w-[384px] h-[24px] bg-pink-500">
                      nama dokter
                    </div>
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
                    {/* <div className="flex flex-col gap-[8px]">
                      <div className="text-[12px] font-bold">Satuan</div>
                      <Select
                        defaultValue={0}
                        isClearable
                        isSearchable
                        name="color"
                        className="w-[287px] h-[24px]"
                      />
                    </div> */}
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
                  <div className="mt-3 bg-pink-500 text-[12px]">
                    Ringkasan Resep
                  </div>
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
                      Hapus
                    </div>
                  </div>
                  {renderRingkasanResep()}
                </>
              ) : null}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransactionCard;
