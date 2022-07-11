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
import TransactionCardCard from "./transaction_card_card";

const TransactionCard = ({ getTransactionCard, cardData }) => {
  // const [drugs, setDrugs] = useState([]);
  // const [inputDrugs, setInputDrugs] = useState(null);
  // const [dataDrugs, setDataDrugs] = useState([]);
  // const [qty, setQty] = useState(0);
  // const [options, setOptions] = useState([]);

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const {
  //   isOpen: isOpenDetail,
  //   onOpen: onOpenDetail,
  //   onClose: onCloseDetail,
  // } = useDisclosure();

  // //Get Product List
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
  //       },
  //       label: val.name,
  //     };
  //   });
  //   setDrugs(drugsMap);
  //   setOptions(drugsData);
  //   console.log(drugsData, "ini options");
  // };

  // //Input Obat
  // const selectHandleChange = (e) => {
  //   setInputDrugs(e);
  // };

  // const quantityHandleChange = (e) => {
  //   setQty(e);
  // };

  // const test = () => {
  //   setDataDrugs([
  //     ...dataDrugs,
  //     {
  //       unit: inputDrugs.value.unit,
  //       quantity: qty,
  //       id_obat: inputDrugs.value.id_obat,
  //       category: inputDrugs.value.category,
  //       drug_name: inputDrugs.value.drug_name,
  //     },
  //   ]);
  //   setInputDrugs(null);
  //   setQty(0);
  // };

  // useEffect(() => {
  //   getProductList();
  // }, []);

  // useEffect(() => {
  //   console.log(inputDrugs, "ini inputDrugs");
  //   console.log(dataDrugs, "ini DataDrugs");
  // });

  // const renderRingkasanResep = () => {
  //   return dataDrugs.map((val, index) => {
  //     return (
  //       <div
  //         className={`flex ${
  //           index % 2 == 0 ? "bg-white" : "bg-[#F6FAFB]"
  //         } text-blackPrimary border-x-2 border-gray-400 ${
  //           index == dataDrugs.length - 1
  //             ? "border-b-2 rounded-b-lg border-gray-400"
  //             : null
  //         } text-[14px]`}
  //       >
  //         <div className="w-[50px] text-center h-[31px] pt-1">{index + 1}</div>
  //         <div className="w-[100px] text-left h-[31px] pt-1 truncate">
  //           {val.drug_name}
  //         </div>
  //         <div className="w-[180px] h-[35px] pt-1 pb-1">
  //           <div className="w-[175px] h-[30px] flex">
  //             {val.category.map((cat, id) => {
  //               return (
  //                 <div
  //                   className="bg-blackPrimary p-1 w-fit ml-1 truncate rounded-lg text-white"
  //                   key={id}
  //                 >
  //                   {cat}
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         </div>

  //         <div className="w-[125px] h-[31px] pt-1 text-center">
  //           {val.quantity}
  //         </div>
  //         <div className="w-[125px] text-center h-[31px] pt-1">{val.unit}</div>
  //         <div className="w-[125px] text-center h-[31px] pt-1">
  //           <Button
  //             w="50px"
  //             h="24px"
  //             fontSize="10px"
  //             variant={"outlineCustom"}
  //             onClick={() => {
  //               setDataDrugs(dataDrugs.filter((e) => e !== val));
  //             }}
  //           >
  //             Hapus
  //           </Button>
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  return cardData.map((val, index) => {
    return (
      <TransactionCardCard
        getTransactionCard={getTransactionCard}
        transaction_id={val.id}
        transaction_code={val.transaction_code}
        index={index}
        created_at={val.created_at}
        expired_at={val.expired_at}
        prescription={val.prescription}
        username={val.name[0].username}
        fullname={val.name[0].fullname}
        address={val.address}
        status={val.status}
      />
    );
  });
};

export default TransactionCard;
