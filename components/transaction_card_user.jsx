import { BsChatDotsFill, BsClock } from "react-icons/bs";
const dayjs = require("dayjs");
require("dayjs/locale/id");
import API_URL from "../helpers/apiurl";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const TransactionCardUser = ({
  transaction_id,
  transaction_code,
  total_price,
  index,
  created_at,
  expired_at,
  prescription,
  orderedProduct,
  username,
  fullname,
  address,
  status,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-[820px] h-[249px] bg-white rounded-lg drop-shadow-lg">
      <div className="pt-[28px] mx-[40px] flex justify-between items-center pb-[12px] border-b-2 border-gray-400">
        <div className="text-[12px]">
          {dayjs(created_at)
            .locale("id")
            .format("dddd, DD MMM YYYY, HH:mm WIB")}
        </div>
        <div className="text-[12px] py-[5px] px-[15px] text-center border-2 border-[#CBAF4E] bg-[#FFDE6B]">
          {status}
        </div>
      </div>

      <div className="flex justify-between mx-[40px] mt-[14px] pb-[16px] border-b-2 border-gray-400">
        <div className="flex gap-[17px]">
          <div className="w-[91px] h-[80px]">
            <img
              src={
                prescription[0].img && status == "MENUNGGU_KONFIRMASI"
                  ? `${API_URL}${prescription[0].img}`
                  : `${API_URL}${orderedProduct[0].image}`
              }
              alt=""
            />
            {/* `${API_URL}${orderedProduct[0].image}` */}
          </div>
          <div className="h-[80px]">
            <div className="text-[12px]">
              {prescription[0].prescription_code &&
              status == "MENUNGGU_KONFIRMASI"
                ? "Nomor Resep"
                : "Nomor Transaksi"}
            </div>
            <div className="text-[16px] font-bold">
              {prescription[0].prescription_code &&
              status == "MENUNGGU_KONFIRMASI"
                ? prescription[0].prescription_code
                : transaction_code}
            </div>
            <button className="text-[12px] pt-6">Tampilkan Detail</button>
          </div>
        </div>
        <div>Countdown</div>
      </div>

      <div className="mx-[40px] mt-[21px] flex justify-between">
        <div className="flex items-center gap-[12px] text-[14px] text-[#009B90] font-bold tracking-wider">
          <span>
            <BsChatDotsFill />
          </span>
          Chat Customer Service
        </div>
        {status == "MENUNGGU_PEMBAYARAN" ? (
          <div className="flex items-center gap-2">
            <div className="w-fit text-[12px]">
              Bayar sebelum{" "}
              <span>
                {dayjs(expired_at)
                  .locale("id")
                  .format("dddd, DD MMM YYYY, HH:mm WIB")}
              </span>
            </div>
            <div>
              <Button
                onClick={onOpen}
                w="157px"
                h="30px"
                variant="fillCustom"
                fontSize="12px"
              >
                Bayar Sekarang
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Bukti Pembayaran</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>parararar</div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Bayar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TransactionCardUser;
