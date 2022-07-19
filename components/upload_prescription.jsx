import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@chakra-ui/react";
import SearchBar from "./searchbar";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Footer from "./footer";
import { useState, useEffect } from "react";
import prettyBytes from "pretty-bytes";
import { IoAddSharp, IoClose } from "react-icons/io5";
import Link from "next/link";

const PrescriptionUpload = ({ uploadPrescription, userAddress }) => {
  const [selectedImage, setselectedImage] = useState([]);
  const [success, setSuccess] = useState(false);

  // Input Prescription
  const onFileChange = (e) => {
    console.log(e.target.files, "ini target files");
    console.log(e.target.files[0], "ini target files[0]");

    if (e.target.files[0]) {
      setselectedImage([...selectedImage, e.target.files[0]]);
    }
  };

  //Submit Prescription
  const submitPrescription = () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedImage.length; i++) {
        formData.append(`img`, selectedImage[i]);
      }
      uploadPrescription(formData);

      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (success) {
    return (
      <div className="w-[375px] lg:w-[1349px] h-[812px] lg:h[1366px]">
        <div className="bg-white w-full h-[92px] lg:h-[109px] flex items-center drop-shadow-lg">
          <div className="ml-[16px] lg:ml-[76px] text-lg">
            <div className="lg:hidden">
              <IoIosArrowBack />
            </div>
            <img
              className="hidden lg:inline-block"
              src="/LogoHealthymedBW.svg"
              alt=""
            />
          </div>
          <div className="ml-[36px] w-[744px] hidden lg:inline-block">
            <SearchBar
              placeholder={"Cari Obat, Suplemen, Vitamin, Produk Kesehatan"}
            />
          </div>
          <div className="ml-[60px] text-2xl hidden lg:inline-block">
            <FaShoppingCart />
          </div>
          <div className="mr-[16px] ml-[50px] text-2xl hidden lg:inline-block">
            <FaUserCircle />
          </div>
        </div>

        <div className="w-[327px] h-[680px] mx-[24px] my-[20px] lg:hidden">
          <img className="mt-[144px] mx-[106px]" src="/Hourglass.svg" alt="" />
          <p className="text-[18px] font-bold text-center mt-6 pb-3 mx-[64px]">
            Unggah resep berhasil!
          </p>
          <p className="text-[14px] text-center pb-6 mx-[18px]">
            Kami akan review file anda secepatnya
          </p>
          <div className="flex flex-col gap-2 mt-[142px]">
            <div>
              <Button variant={"fillCustom"} w={"327px"} h={"48px"}>
                Status Pemesanan
              </Button>
            </div>
            <div>
              <Button variant={"outlineCustom"} w={"327px"} h={"48px"}>
                Ke Beranda
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:inline-block h-[668px] w-full">
          <div className="mx-[110px] mt-[156px] mb-[120px]">
            <img
              src="/PrescriptionSuccess.svg"
              className="w-[248px] h-[172px] mx-[486px]"
            />
            <p className="text-[20px] font-bold w-[406px] mx-[407px] mt-[36px] text-center">
              Unggah resep berhasil!
            </p>
            <p className="text-[14px] w-[406px] mx-[407px] text-center mt-[2px]">
              Kamu akan mendapat notifikasi apabila resep doktermu dikonfirmasi
              oleh admin
            </p>
            <div className="mt-[48px] mx-[407px]">
              <Link href="/userprofile/transactions">
                <Button variant={"fillCustom"} w={"406px"} h={"46px"}>
                  Lihat Progress Pemesanan
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:inline-block">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="w-[375px] lg:w-[1349px] h-[812px] lg:h[1366px]">
      <div className="bg-white w-full h-[92px] lg:h-[109px] flex items-center drop-shadow-lg">
        <div className="ml-[16px] lg:ml-[76px] text-lg">
          <div className="lg:hidden">
            <IoIosArrowBack />
          </div>
          <img
            className="hidden lg:inline-block"
            src="/LogoHealthymedBW.svg"
            alt=""
          />
        </div>
        <div className="ml-[8px] font-bold text-[16px] text-blackPrimary lg:hidden">
          Unggah File
        </div>
        <div className="ml-[36px] w-[744px] hidden lg:inline-block">
          <SearchBar
            placeholder={"Cari Obat, Suplemen, Vitamin, Produk Kesehatan"}
          />
        </div>
        <div className="ml-[60px] text-2xl hidden lg:inline-block">
          <FaShoppingCart />
        </div>
        <div className="mr-[16px] ml-[50px] text-2xl hidden lg:inline-block">
          <FaUserCircle />
        </div>
      </div>
      <div
        hidden={!selectedImage.length}
        className="w-[327px] h-[680px] mx-[24px] my-[20px] lg:hidden"
      >
        {selectedImage.map((val, index) => {
          return (
            <div
              key={index}
              className="w-[327px] h-[42px] mb-5 bg-white drop-shadow-lg rounded-lg flex items-center"
            >
              <img
                className="ml-[24px] w-[18px] h-[15px] object-cover"
                src={URL.createObjectURL(val)}
              />
              <p className="ml-[18px] w-[165px] truncate text-[12px]">
                {val.name}
              </p>
              <div className="w-[50px] text-right ml-[36px] mr-[24px] text-[12px]">
                {prettyBytes(val.size)}
              </div>
              <button
                type="button"
                onClick={() => {
                  setselectedImage(selectedImage.filter((e) => e !== val));
                }}
                className="absolute -top-2 -right-2 p-1 bg-blackPrimary rounded-full text-white hover:bg-opacity-80 duration-500"
              >
                <IoClose />
              </button>
            </div>
          );
        })}

        <div
          className="flex justify-end mt-[55px]"
          hidden={selectedImage.length == 5}
        >
          <label
            htmlFor="uploadPrescriptionMobile"
            className="hover:bg-opacity-80 hover:cursor-pointer duration-300 w-[50px] h-[50px] rounded-full bg-blackPrimary text-white text-2xl flex justify-center pt-[12.5px]"
          >
            <IoAddSharp />
          </label>
        </div>
        <div className="mt-[40px]">
          <Button
            onClick={() => {
              submitPrescription();
            }}
            variant={"fillCustom"}
            w={"327px"}
            h={"48px"}
            disabled={selectedImage.length ? false : true}
          >
            Unggah Resep
          </Button>
        </div>
      </div>
      <div
        hidden={selectedImage.length}
        className="w-[327px] h-[680px] mx-[24px] my-[20px] border-2 border-dashed border-gray-400 lg:hidden"
      >
        <img className="mt-[219px] mx-[93px]" src="/Cloud.svg" alt="" />

        {userAddress.length ? (
          <p className="text-[12px] font-bold text-center mt-3 pb-6">
            Foto tidak boleh lebih dari 10 MB
          </p>
        ) : (
          <p className="text-[14px] text-red-500 font-bold text-center mt-3 pb-6">
            Silahkan isi alamat terlebih dahulu!{" "}
            <Link href="/address">
              <button className="underline font-bold">Klik disini</button>
            </Link>
          </p>
        )}
        <input
          onChange={onFileChange}
          className="hidden"
          type="file"
          id="uploadPrescriptionMobile"
          disabled={!userAddress.length}
        />
        {userAddress.length ? (
          <label
            htmlFor="uploadPrescriptionMobile"
            className="w-[274px] h-[48px] mx-[26px] bg-blackPrimary text-white rounded-md px-20 py-3 text-center font-bold hover:bg-opacity-80"
          >
            Unggah Resep
          </label>
        ) : (
          <label
            htmlFor="uploadPrescriptionMobile"
            className="hover:cursor-not-allowed w-[274px] h-[48px] mx-[26px] bg-gray-400 text-white rounded-md px-20 py-3 text-center font-bold"
          >
            Unggah Resep
          </label>
        )}
      </div>
      <div className="hidden lg:inline-block h-[886px] w-full">
        <div className="mx-[110px] mt-[54px] mb-[120px]">
          <div className="text-[24px] font-bold text-blackPrimary">
            Kirim Resep
          </div>
          <div className="text-[14px] text-blackPrimary mt-1">
            Tak perlu antre & obat langsung dikirimkan ke lokasi anda!{" "}
            <span className="font-bold">
              Foto tidak boleh lebih dari 10 MB.
            </span>
          </div>
          <div className="h-[522px] bg-white drop-shadow-lg mt-10 rounded-2xl">
            <div className="mx-[66px] pt-[28px] text-[16px] pb-[24px] border-b-2 border-gray-400">
              Unggah Resep Dokter
            </div>
            <div className="h-[328px] border-2 border-dashed border-gray-400 bg-[#F6FAFB] rounded-2xl mx-[69px] mt-[24px]">
              {selectedImage.map((val, index) => {
                return (
                  <div
                    hidden={!selectedImage.length}
                    className="w-[934px] h-[41px] bg-white drop-shadow-lg mx-[24px] mt-[16px] rounded-lg"
                    key={index}
                  >
                    <div className="flex justify-between mx-[20px]">
                      <div className="flex mt-[12px]">
                        <img
                          className="ml-[24px] w-[18px] h-[15px] object-cover"
                          src={URL.createObjectURL(val)}
                        />
                        <p className="ml-[18px] w-[165px] truncate text-[12px]">
                          {val.name}
                        </p>
                        <div className="w-[50px] text-right ml-[36px] text-[12px]">
                          {prettyBytes(val.size)}
                        </div>
                      </div>
                      <div className="mt-[12px] mr-[24px]">
                        <button
                          type="button"
                          onClick={() => {
                            setselectedImage(
                              selectedImage.filter((e) => e !== val)
                            );
                          }}
                          className="rounded-full text-lg text-blackPrimary hover:text-white hover:bg-blackPrimary duration-500"
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {userAddress.length ? (
                <>
                  {" "}
                  <div
                    hidden={selectedImage.length}
                    className="text-center mt-[84px] text-[24px] text-gray-400 font-bold"
                  >
                    Tarik & Letakkan File
                  </div>
                  <div
                    hidden={selectedImage.length}
                    className="mt-[32px] text-center text-[14px] text-gray-400 pb-8"
                  >
                    atau
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="text-center mt-[84px] text-[24px] text-red-400 font-bold pb-8">
                    Silahkan isi alamat terlebih dahulu!{" "}
                    <Link href="/address">
                      <button className="font-bold underline">
                        Klik disini
                      </button>
                    </Link>
                  </div>
                </>
              )}

              {selectedImage.length ? (
                <div
                  className="flex justify-start ml-[24px] mt-[20px]"
                  hidden={selectedImage.length == 5}
                >
                  <label
                    htmlFor="uploadPrescriptionMobile"
                    className="w-[155px] h-[36px] text-[12px] hover:cursor-pointer bg-blackPrimary text-white rounded-md py-3 text-center font-bold hover:bg-opacity-80"
                  >
                    Unggah Resep
                  </label>
                </div>
              ) : (
                <div
                  className="flex justify-center"
                  hidden={selectedImage.length == 5}
                >
                  <label
                    htmlFor="uploadPrescriptionMobile"
                    className="w-[274px] h-[48px] bg-blackPrimary hover:cursor-pointer text-white rounded-md px-20 py-3 text-center font-bold hover:bg-opacity-80"
                  >
                    Unggah Resep
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-5 mt-[26px]">
            <div>
              <Button variant={"outlineCustom"} w={"120px"} h={"42px"}>
                Cancel
              </Button>
            </div>
            {userAddress.length ? (
              <div>
                <Button
                  onClick={() => {
                    submitPrescription();
                  }}
                  variant={"fillCustom"}
                  w={"120px"}
                  h={"42px"}
                  disabled={selectedImage.length ? false : true}
                >
                  Unggah
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => {
                    submitPrescription();
                  }}
                  variant={"fillCustom"}
                  w={"120px"}
                  h={"42px"}
                  disabled
                >
                  Unggah
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:inline-block">
        <Footer />
      </div>
    </div>
  );
};

export default PrescriptionUpload;
