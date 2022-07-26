import { Button } from "@chakra-ui/react";
import NavbarAdmin from "../../components/NavbarAdmin";
import NavbarAdminTop from "../../components/NavbarAdminTop";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import MedicineTable from "../../components/MedicineTable";
import { debounce } from "lodash";
import PageLoading from "../../components/pageLoading";
import { useState } from "react";
import { useEffect } from "react";

// import DetailTableObat from "../../components/DetailTableObat";
const daftarProduk = () => {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(false);
  }, []);

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <>
      {/* navbar admin */}
      <div className="fixed top-0 left-0 bottom-0 z-20">
        <NavbarAdmin />
      </div>
      <div className="fixed top-0 right-0 left-0 z-10">
        <NavbarAdminTop />
      </div>

      {/* Title, excell, and download PDF Button */}
      <div className="flex ml-80 h-[32px] items-center mt-20 w-[72.6%] justify-between">
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
