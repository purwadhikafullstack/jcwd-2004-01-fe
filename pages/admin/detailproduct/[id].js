import { Button, useDisclosure, Select, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ModalEditProduct from "../../../components/ModalEditProduct";
import ModalEditQuantityProduct from "../../../components/ModalEditQuantityProduct";
import NavbarAdmin from "../../../components/NavbarAdmin";
import NavbarAdminTop from "../../../components/NavbarAdminTop";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { GrFormPrevious } from "react-icons/gr";

const DetailProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isQuantityOpen,
    onOpen: onQuantityOpen,
    onClose: onQuantityClose,
  } = useDisclosure();

  return (
    <>
      <div>
        {/* navbar admin */}
        <div className="flex w-full bg-white h-16 drop-shadow-md sticky items-center">
          <p className="flex items-center text-xl font-bold gap-4 ml-12">
            <GrFormPrevious className="text-lg" /> Obat Detail: Actived
          </p>
        </div>
        {/* card detail prodyct */}
        <div className="w-[90vw] mx-auto h-[600px] mt-[28px] shadow-xl rounded-xl">
          <div className="pl-[32px] flex gap-[24px] pt-[30px]">
            <div className="bg-teal-300">
              <p className="text-sm">Bulan</p>
              <Select placeholder="Bulan" w="141px" h="30px">
                <option value="januari">Januari</option>
                <option value="februari">Februari</option>
                <option value="maret">Maret</option>
                <option value="april">April</option>
                <option value="mei">Mei</option>
                <option value="juni">Juni</option>
                <option value="juli">Juli</option>
                <option value="agustus">Agustus</option>
                <option value="september">September</option>
                <option value="oktober">Oktober</option>
                <option value="november">Novemvber</option>
                <option value="desember">Desember</option>
              </Select>
            </div>
            <div className="bg-teal-300">
              <p className="text-sm">Tahun</p>
              <Input placeholder="Tahun" w="141px" h="30px" />
            </div>
            <div className="bg-teal-300">
              <p className="text-sm">Tahun</p>
              <Input placeholder="Tahun" w="141px" h="30px" />
            </div>
            <div>
              <p className="text-sm">Filter</p>
              <Select placeholder="Filter" w="141px" h="30px">
                <option value="januari">Januari</option>
              </Select>
            </div>
          </div>
        </div>

        {/* ini modal edit gitu deh hehehehehe */}
        <Button variant="outlineCustom" onClick={onOpen}>
          Edit
        </Button>
        <Button variant="outlineCustom" onClick={onQuantityOpen}>
          Edit Kuantitas
        </Button>

        <ModalEditProduct isOpen={isOpen} onClose={onClose} id={id} />
        <ModalEditQuantityProduct
          isOpen={isQuantityOpen}
          onClose={onQuantityClose}
          id={id}
        />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default DetailProduct;
