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

const TransactionCard = ({
  getTransactionCard,
  cardData,
  submitPrescription,
  rejectPrescription,
  rejectTransaction,
  acceptTransaction,
  sendOrder,
  options,
}) => {
  return cardData.map((val, index) => {
    return (
      <TransactionCardCard
        getTransactionCard={getTransactionCard}
        submitPrescription={submitPrescription}
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
        options={options}
        payment_slip={val.payment_slip}
        rejectPrescription={rejectPrescription}
        rejectTransaction={rejectTransaction}
        acceptTransaction={acceptTransaction}
        sendOrder={sendOrder}
      />
    );
  });
};

export default TransactionCard;
