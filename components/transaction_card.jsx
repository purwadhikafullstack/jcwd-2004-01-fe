import { BsChatDotsFill } from "react-icons/bs";
import { Button, Checkbox } from "@chakra-ui/react";

const TransactionCard = () => {
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
                <div className="flex flex-col w-[216px] border-r-2 border-gray-400">
                  <div className="text-[14px] font-bold">
                    Sanmol 500 gr 4 Tablet
                  </div>
                  <div className="text-[12px] mt-[2px]">2 x 13.000</div>
                  <div className="text-[12px] font-bold mt-[13px]">
                    dropdown ngasal
                  </div>
                </div>
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
    </>
  );
};

export default TransactionCard;
