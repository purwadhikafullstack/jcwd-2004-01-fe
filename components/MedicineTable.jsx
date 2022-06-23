import {
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { HiOutlineDownload } from "react-icons/hi";
// import DetailTableObat from "./DetailTableObat";
import ModalInputDrugs from "./ModalInputProduct";
const MedicineTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="shadow-xl rounded-lg w-[72.6%] h-[72.6vh] ml-80 mt-[19px]">
        <div className="flex border-0 border-slate-900 h-[42px] justify-between mx-4">
          <div className="flex gap-4 mt-4">
            <InputGroup w="328px" h="42px">
              <Input
                placeholder="Cari nama obat"
                focusBorderColor="blackPrimary"
              />
              <InputRightElement>
                <GoSearch />
              </InputRightElement>
            </InputGroup>
            <Select w="156px" h="42px" focusBorderColor="blackPrimary">
              <option value="Filter" color="gray.300">
                Filter
              </option>
              <option value="Obat Bebas">Obat Bebas</option>
              <option value="Obat Racik">Obat Racik</option>
              <option value="Obat Resep">Obat Resep</option>
            </Select>
          </div>
          <Button
            onClick={onOpen}
            variant="fillCustom"
            leftIcon={<HiOutlineDownload />}
            fontSize="12px"
            fontWeight="700"
            w="159px"
            h="42px"
            mt="16px"
          >
            Tambah Obat
          </Button>
        </div>
        <ModalInputDrugs isOpen={isOpen} onClose={onClose} />
        {/* <DetailTableObat /> */}
      </div>
    </>
  );
};

export default MedicineTable;
