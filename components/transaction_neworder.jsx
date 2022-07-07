import { MdOutlineFileDownload } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { Button, Input, Select, Checkbox } from "@chakra-ui/react";
import TransactionCard from "./transaction_card";

const NewOrderTransaction = () => {
  return (
    <div className="ml-64 mt-16 w-[1093px] h-fit pb-16">
      <div className="mx-[48px] mt-24">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Pesanan Baru</p>
          <div className="self-end">
            <Button
              variant="outlineCustom"
              mr="16px"
              w="120px"
              h="32px"
              fontSize="10px"
              fontWeight="bold"
              leftIcon={<MdOutlineFileDownload />}
            >
              Unduh PDF
            </Button>
            <Button
              variant="outlineCustom"
              w="94px"
              h="32px"
              fontSize="10px"
              fontWeight="bold"
              leftIcon={<IoDocumentText />}
            >
              Excel
            </Button>
          </div>
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

        <TransactionCard prescription={false} />
      </div>
    </div>
  );
};

export default NewOrderTransaction;
