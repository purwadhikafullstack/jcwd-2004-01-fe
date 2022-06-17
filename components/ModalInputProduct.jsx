import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

import { GrNext } from "react-icons/gr";

const ModalInputDrugs = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="792px">
          <ModalHeader>Tambah Obat</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />

          <ModalBody display="flex" flexDirection="column">
            <div className="flex items-center">
              <div className="flex">
                <div className="flex w-[18px] h-[18px] rounded-full bg-blackPrimary justify-center text-white text-xs font-bold">
                  1
                </div>
                <div className="ml-1 text-blackPrimary font-normal text-sm">
                  Detail Obat
                </div>
              </div>
              <GrNext className="w-[10px] ml-2" />
              <div className="flex">
                <div className="ml-2 flex w-[18px] h-[18px] rounded-full bg-grayDisable justify-center text-white text-xs font-bold">
                  2
                </div>
                <div className="ml-1 text-grayDisable font-normal text-sm">
                  Detail Kuantitas & Harga
                </div>
              </div>
              <GrNext className="w-[10px] ml-2" />
              <div className="flex">
                <div className="ml-2 flex w-[18px] h-[18px] rounded-full bg-grayDisable justify-center text-white text-xs font-bold">
                  3
                </div>
                <div className="ml-1 text-grayDisable font-normal text-sm">
                  Upload Gambar
                </div>
              </div>
              <GrNext className="w-[10px] ml-2" />
              <div className="flex">
                <div className="ml-2 flex w-[18px] h-[18px] rounded-full bg-grayDisable justify-center text-white text-xs font-bold">
                  4
                </div>
                <div className="ml-1 text-grayDisable font-normal text-sm">
                  apaya gitu
                </div>
              </div>
            </div>
            <div className="flex">
              <div></div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="fillCustom">Lanjutkan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalInputDrugs;
