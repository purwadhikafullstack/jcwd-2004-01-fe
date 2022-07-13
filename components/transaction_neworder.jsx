import { MdOutlineFileDownload } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { Button, Input, Select, Checkbox } from "@chakra-ui/react";
import TransactionCard from "./transaction_card";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import { useEffect, useState } from "react";

const NewOrderTransaction = () => {
  const [cardData, setCardData] = useState([]);
  let more = [];

  //Get Transaction Card
  const getTransactionCard = async () => {
    let res = await axios.get(
      `${API_URL}/transaction/get-transaction-prescription-list`
    );
    setCardData(res.data);
  };

  useEffect(() => {
    getTransactionCard();
  }, []);

  return (
    <div className="ml-64 mt-16 w-[1093px] h-fit pb-16">
      <div className="mx-[48px] mt-24">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Pesanan Baru</p>
        </div>

        <div className="flex mt-[68px] gap-[16px]">
          <Input placeholder="Cari transaksi" w="328px" h="42px" />
          <Select placeholder="Filter" w="156px" h="42px" />
          <Select placeholder="Urutkan" w="156px" h="42px" />
        </div>

        <div className="flex items-center mt-[38px]">
          <div className="flex items-center gap-[12px]">
            <Checkbox />
            <p className="text-[14px]">Pilih Semua</p>
          </div>
        </div>

        <TransactionCard
          getTransactionCard={getTransactionCard}
          prescription={false}
          cardData={cardData}
        />
      </div>
    </div>
  );
};

export default NewOrderTransaction;
