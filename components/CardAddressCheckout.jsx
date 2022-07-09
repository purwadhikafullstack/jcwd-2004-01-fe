import { Divider, Spinner } from "@chakra-ui/react";
import { HiPlusSm } from "react-icons/hi";

const CardAddressCheckout = ({ addressData }) => {
  return (
    <div className="mx-6 md:ml-[96px] md:w-[783px] md:shadow-2xl md:p-9 md:mt-[64px] md:rounded-lg">
      {addressData ? (
        <>
          <p className="text-xl font-bold">Alamat Pengiriman</p>
          <Divider mt="12px" />
          <div className="flex justify-between mt-[16px] text-sm font-bold">
            <p>
              {addressData.recipient_name}, {addressData.recipient_number}
            </p>
            <p>Pilih Alamat Lain</p>
          </div>
          <div className="text-sm mt-[14px]">
            <p>{addressData.address_label}</p>
            <p className="w-[523px]">
              {addressData.address}, Kota {addressData.city},{" "}
              {addressData.province}
            </p>
          </div>
          <Divider mt="24px" />
          <div className="flex gap-4 items-center mt-[12px]">
            <div className="rounded-full w-6 h-6 shadow-lg">
              <HiPlusSm className="mx-auto text-lg text-center mt-1" />
            </div>
            <p className="font-bold">Tambahkan Alamat</p>
          </div>
        </>
      ) : (
        <Spinner size="xl" mx="auto" speed="0.4s" />
      )}
    </div>
  );
};

export default CardAddressCheckout;
