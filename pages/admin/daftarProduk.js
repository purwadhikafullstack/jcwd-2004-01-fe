import { Button } from "@chakra-ui/react";
import NavbarAdmin from "../../components/NavbarAdmin";
import NavbarAdminTop from "../../components/NavbarAdminTop";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import MedicineTable from "../../components/MedicineTable";
import { debounce } from "lodash";

// import DetailTableObat from "../../components/DetailTableObat";
const daftarProduk = () => {
  return (
    <>
      {/* navbar admin */}
      <div className="absolute">
        <NavbarAdmin />
      </div>
      <NavbarAdminTop />

      {/* Title, excell, and download PDF Button */}
      <div className="flex ml-80 h-[32px] items-center mt-[16px] w-[72.6%] justify-between">
        <p className="text-xl font-bold">Daftar Obat</p>
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

      {/* Daftar Obat Table */}
      <div>
        <MedicineTable />
      </div>
    </>
  );
};

export default daftarProduk;
