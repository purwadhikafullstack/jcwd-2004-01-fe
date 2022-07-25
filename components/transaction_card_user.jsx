import { BsChatDotsFill, BsClock } from "react-icons/bs";
const dayjs = require("dayjs");
require("dayjs/locale/id");
import API_URL from "../helpers/apiurl";
import axios from "axios";
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
import { useState } from "react";
import { toast } from "react-toastify";
import { Rupiah } from "../lib/convertRupiah";
import { useEffect } from "react";

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
  getCardData,
  delivery_fee,
  bank_id,
  updated_at,
}) => {
  const [selectedImage, setselectedImage] = useState([]);
  const [timer, settimer] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  //Upload Payment Slip
  const onFileChange = (e) => {
    console.log(e.target.files, "ini target files");
    console.log(e.target.files[0], "ini target files[0]");

    if (e.target.files[0]) {
      setselectedImage([...selectedImage, e.target.files[0]]);
    }
  };

  //Upload Prescription
  const uploadPaymentSlip = async (transaction_id) => {
    try {
      let formData = new FormData();
      formData.append("payment_slip", selectedImage[0]);
      await axios.post(
        `${API_URL}/transaction/upload-slip-payment/${transaction_id}`,
        formData
      );
      toast.success("Payment slip uploaded!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#48BB78" },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Network Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#e85362" },
      });
    } finally {
      onClosePaymentSlip();
      getCardData();
    }
  };

  //Accept delivered order
  const acceptOrder = async (id) => {
    try {
      await axios.post(`${API_URL}/transaction/acceptorderuser/${id}`);
      toast.success("Order has been successfully received!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#48BB78" },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Network Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#e85362" },
      });
    } finally {
      getCardData();
    }
  };

  useEffect(() => {
    let time = setInterval(() => {
      settimer(new Date());
    }, 1000);

    return () => clearInterval(time);
  }, []);

  const convertTime = (time, kind) => {
    let tes = new Date(expired_at).getTime();
    let xl = new Date(time).getTime();
    let detik = Math.round((tes - xl) / 1000);
    if (detik < 0) {
      return 0;
    }
    let jam = Math.floor(detik / 3600);
    detik = detik % 3600;
    if (kind === "jam") {
      return jam;
    }
    let minute = Math.floor(detik / 60);
    detik = detik % 60;
    if (kind === "menit") {
      return minute;
    }

    return detik;
  };

  const onClosePaymentSlip = () => {
    setselectedImage([]);
    onClose();
  };

  return (
    <div className="w-[820px] h-[249px] bg-white rounded-lg drop-shadow-lg">
      <div className="pt-[28px] mx-[40px] flex justify-between items-center pb-[12px] border-b-2 border-gray-400">
        <div className="text-[12px]">
          {dayjs(created_at)
            .locale("id")
            .format("dddd, DD MMM YYYY, HH:mm WIB")}
        </div>
        <div className="text-[12px] py-[5px] px-[15px] text-center border-2 border-[#CBAF4E] bg-[#FFDE6B]">
          {status == "MENUNGGU_KONFIRMASI" ? "Menunggu Konfirmasi" : null}
          {status == "MENUNGGU_PEMBAYARAN" ? "Menunggu Pembayaran" : null}
          {status == "DIPROSES" ? "Diproses" : null}
          {status == "MENUNGGU_KONFIRMASI_PEMBAYARAN"
            ? "Menunggu Konfirmasi Pembayaran"
            : null}
          {status == "DITOLAK" ? "Ditolak" : null}
          {status == "SELESAI" ? "Selesai" : null}
          {status == "DIKIRIM" ? "Dikirim" : null}
        </div>
      </div>

      <div className="flex justify-between mx-[40px] mt-[14px] pb-[16px] border-b-2 border-gray-400">
        <div className="flex gap-[17px]">
          <div className="w-[91px] h-[80px]">
            <img
              className="w-[91px] h-[80px] object-cover"
              src={
                prescription.length > 0 &&
                (status == "MENUNGGU_KONFIRMASI" || status == "DITOLAK")
                  ? `${API_URL}${prescription[0].img}`
                  : `${API_URL}${orderedProduct[0].image}`
              }
              alt=""
            />
            {/* `${API_URL}${orderedProduct[0].image}` */}
          </div>
          <div className="h-[80px]">
            <div className="text-[12px]">
              {prescription.length > 0 &&
              (status == "MENUNGGU_KONFIRMASI" || status == "DITOLAK")
                ? "Nomor Resep"
                : "Nomor Transaksi"}
            </div>
            <div className="text-[16px] font-bold">
              {prescription.length > 0 &&
              (status == "MENUNGGU_KONFIRMASI" || status == "DITOLAK")
                ? prescription[0].prescription_code
                : transaction_code}
            </div>
            <button onClick={onOpenDetail} className="text-[12px] pt-6">
              Tampilkan Detail
            </button>
          </div>
        </div>
        <div>
          {status == "DITOLAK" ||
          status == "SELESAI" ||
          status == "DIPROSES" ||
          status == "MENUNGGU_KONFIRMASI" ||
          status == "DIKIRIM" ||
          status == "MENUNGGU_KONFIRMASI_PEMBAYARAN" ? null : (
            <span className="countdown font-mono text-2xl text-[#FF6B6B] mt-[16px]">
              <span
                className="text-white bg-[#FF6B6B] px-1 rounded-md"
                style={{ "--value": convertTime(timer, "jam") }}
              ></span>
              :
              <span
                className="text-white bg-[#FF6B6B] px-1 rounded-md"
                style={{ "--value": convertTime(timer, "menit") }}
              ></span>
              :
              <span
                className="text-white bg-[#FF6B6B] px-1 rounded-md"
                style={{ "--value": convertTime(timer, "detik") }}
              ></span>
            </span>
          )}
          {status == "DIKIRIM" ? (
            <div className="mt-[25px] text-[14px]">
              Perkiraan pesanan sampai&nbsp;
              {dayjs(updated_at)
                .locale("id")
                .add(2, "day")
                .format("dddd, DD MMM YYYY")}
            </div>
          ) : null}
          {status == "SELESAI" ? (
            <div className="mt-[25px] text-[14px]">Yay, pesanan selesai!</div>
          ) : null}
        </div>
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

        {status == "MENUNGGU_KONFIRMASI" ? (
          <Button
            w="fit"
            h="30px"
            variant="fillCustom"
            fontSize="12px"
            disabled
          >
            Menunggu Konfirmasi
          </Button>
        ) : null}

        {status == "MENUNGGU_KONFIRMASI_PEMBAYARAN" ? (
          <Button
            w="fit"
            h="30px"
            variant="fillCustom"
            fontSize="12px"
            disabled
          >
            Menunggu Konfirmasi Pembayaran
          </Button>
        ) : null}

        {status == "DIKIRIM" ? (
          <Button
            onClick={() => {
              acceptOrder(transaction_id);
            }}
            w="fit"
            h="30px"
            variant="fillCustom"
            fontSize="12px"
          >
            Terima Pesanan
          </Button>
        ) : null}

        {status == "SELESAI" ? (
          <Button
            disabled
            w="fit"
            h="30px"
            variant="fillCustom"
            fontSize="12px"
          >
            Selesai
          </Button>
        ) : null}

        {status == "DITOLAK" ? (
          <Button
            w="fit"
            h="30px"
            variant="fillCustom"
            fontSize="12px"
            disabled
          >
            Ditolak
          </Button>
        ) : null}
      </div>

      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClosePaymentSlip}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Bukti Pembayaran</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="text-center text-[14px]">
              Untuk membantu verifikasi dengan sistem bank, mohon upload bukti
              transfer agar kami dapat menerbitkan invoice anda
            </div>

            <input
              onChange={onFileChange}
              className="hidden"
              type="file"
              id="uploadPaymentSlip"
            />
            <div hidden={selectedImage.length < 1}>
              <div className="flex justify-center">
                {selectedImage.map((val, i) => {
                  return (
                    <div key={i}>
                      <img
                        src={URL.createObjectURL(val)}
                        className="h-[300px]"
                      />
                      {selectedImage.length > 0 ? (
                        <div className="flex justify-center mt-[20px]">
                          {" "}
                          <label
                            className="hover:bg-opacity-10 hover:cursor-pointer hover:bg-blackPrimary duration-300 rounded-md bg-white font-bold text-blackPrimary text-lg w-fit px-5 py-2 border-2 border-blackPrimary"
                            onClick={() => {
                              setselectedImage(
                                selectedImage.filter((e) => e !== val)
                              );
                            }}
                          >
                            Hapus
                          </label>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center mt-[20px]">
              {selectedImage.length < 1 ? (
                <label
                  htmlFor="uploadPaymentSlip"
                  className="hover:bg-opacity-80 hover:cursor-pointer duration-300 rounded-md bg-blackPrimary font-bold tracking-wider text-white text-lg w-fit px-5 py-2"
                >
                  Pilih Bukti Pembayaran
                </label>
              ) : null}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="outlineCustom" mr={3} onClick={onClosePaymentSlip}>
              Close
            </Button>
            <Button
              onClick={() => {
                uploadPaymentSlip(transaction_id);
              }}
              disabled={selectedImage.length == 0}
              variant="fillCustom"
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenDetail}
        onClose={onCloseDetail}
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detail Pesanan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full pb-5 flex justify-between items-center border-b-2 border-gray-400">
              <div className="flex text-[16px] gap-2">
                <div className=" font-bold border-r-2 border-gray-400 pr-2 w-[180px] truncate">
                  {transaction_code}
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    <BsClock />
                  </span>
                  {dayjs(created_at).format("DD MMM YYYY, HH:mm WIB")}
                </div>
              </div>
              <div
                className="flex items-center gap-3"
                hidden={status == "MENUNGGU_PEMBAYARAN" ? false : true}
              >
                <div className="font-bold">Bayar Sebelum</div>
                <div className="w-[164px] h-[28px] bg-orange-200 p-1.5 rounded-md text-[12px] flex items-center gap-2">
                  <span>
                    <BsClock />
                  </span>
                  {dayjs(expired_at).format("DD MMM YYYY, HH:mm WIB")}
                </div>
              </div>
            </div>

            <div className="mt-[10px] font-bold">Daftar Pesanan</div>

            <div className="flex flex-col gap-4 mt-[10px]">
              {prescription.length > 0 && orderedProduct <= 0
                ? prescription.map((val, i) => {
                    return (
                      <div
                        className="flex items-center gap-4 bg-white drop-shadow-lg rounded-lg p-4"
                        key={i}
                      >
                        <img
                          key={i}
                          className="w-[75px] h-[75px] rounded-lg"
                          src={`${API_URL}${val.img}`}
                        />
                        <div>
                          Resep no. <span>{i + 1}</span>
                        </div>
                      </div>
                    );
                  })
                : orderedProduct.map((val, i) => {
                    return (
                      <div
                        className="flex items-center gap-4 bg-white drop-shadow-lg rounded-lg p-4"
                        key={i}
                      >
                        <img
                          key={i}
                          className="w-[75px] h-[75px] rounded-lg"
                          src={`${API_URL}${val.image}`}
                        />
                        <div>
                          <div className="text-[14px] font-bold">
                            {val.name}
                          </div>
                          <div className="text-[12px] mt-[7px]">
                            {val.quantity} x {val.price}
                          </div>
                          <div className="text-[12px] mt-[10px]">
                            {val.dosage ? val.dosage : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>

            {prescription.length > 0 && orderedProduct <= 0 ? (
              <>
                {" "}
                <div className="mt-[10px] font-bold">Info Pengiriman</div>
                <div className="mt-[8px] flex flex-col gap-2">
                  <div className="flex justify-between border-b-2 border-gray-100">
                    <div className="text-[14px]">Kurir</div>
                    <div className="text-[14px]">JNE</div>
                  </div>
                  <div className="flex justify-between border-b-2 border-gray-100">
                    <div className="text-[14px]">Alamat</div>
                    <div className="text-[14px]">{address}</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mt-[10px] font-bold">Info Pengiriman</div>
                <div className="mt-[8px] flex flex-col gap-2">
                  <div className="flex justify-between border-b-2 border-gray-100">
                    <div className="text-[14px]">Kurir</div>
                    <div className="text-[14px]">JNE</div>
                  </div>
                  <div className="flex justify-between border-b-2 border-gray-100">
                    <div className="text-[14px]">Alamat</div>
                    <div className="text-[14px]">{address}</div>
                  </div>
                </div>
                <div className="mt-[10px] font-bold">Rincian Pembayaran</div>
                <div className="mt-[8px] flex flex-col gap-2">
                  <div className="flex justify-between border-b-2 border-gray-100">
                    <div className="text-[14px]">Metode Pembayaran</div>
                    <div className="text-[14px]">
                      {bank_id == 1 ? "BCA" : null}
                      {bank_id == 2 ? "Mandiri" : null}
                      {bank_id == 3 ? "Permata" : null}&nbsp;Virtual Account
                    </div>
                  </div>
                  <div className="flex justify-between border-b-2 border-gray-100">
                    <div className="text-[14px]">Total Harga</div>
                    <div className="text-[14px]">{Rupiah(total_price)}</div>
                  </div>
                  <div className="flex justify-between border-b-2 border-gray-100">
                    <div className="text-[14px]">Total Ongkos Kirim</div>
                    <div className="text-[14px]">{Rupiah(delivery_fee)}</div>
                  </div>
                  <div className="flex justify-between font-bold border-b-2 border-gray-100">
                    <div className="text-[14px]">Total Bayar</div>
                    <div className="text-[14px]">
                      {Rupiah(parseInt(total_price) + parseInt(delivery_fee))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* <div className="flex gap-10 mt-5">
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
            </div> */}
          </ModalBody>

          <ModalFooter>
            <Button variant="outlineCustom" onClick={onCloseDetail}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TransactionCardUser;
